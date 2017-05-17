'use strict';
var React = require('react');
var DOM = require('react-dom');
var request = require('browser-request');
var ReactDOM = require('react-dom');
var Cookies = require('js-cookie');

var {Nav, NavLink} = require('./components/nav.jsx');
var {CollectionRow} = require('./components/collection.jsx');
var {homeLinks, collectionsLink} = require('./components/utils.jsx');
var {ArtCard} = require('./components/artCard.jsx');
var {TitleContainer} = require('./components/titleContainer.jsx');


class ContentEditable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getProps = this.getProps.bind(this);
        this.emitChange = this.emitChange.bind(this);
    }
    render() {
        return <div {...this.getProps()}></div>
    }

    getProps() {
        let C = this;
        console.log('Props?', C.props.text);
        return {
            className: this.props.className,
            onInput: this.emitChange,
            onBlur: this.emitChange,
            contentEditable: this.props.editable,
            dangerouslySetInnerHTML: {__html: C.props.text},
        };
    }

    getDOMNode() {
        return ReactDOM.findDOMNode(this);
    }

    getText() {
        let node = this.getDOMNode();
        console.log('getting text');
        if (!node) {
            return '';
        }
        return node.innerText;
    }


    shouldComponentUpdate(nextProps) {
        let hou = (nextProps.text !== this.getText() ||
                   nextProps.editable !== this.props.editable);
        return hou;
    }

    componentDidUpdate() {
        if ( this.props.text !== this.getText() ) {
            this.getDOMNode().innerText = this.props.text;
        }
    }

    emitChange() {
        var text = this.getText();
        console.log('change ->', text);
        if (this.props.onChange && text !== this.lastText) {
            this.props.onChange({
                value: text
            });
        }
        this.lastText = text;
    }
}

class EditableDescription extends ContentEditable {
    render() {
        return <div {...this.getProps()}></div>;
    }
}

class EditableTitle extends ContentEditable {
    render() {
        return <h1 {...this.getProps()}></h1>;
    }
}

class CollectionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            description: this.props.collection.description,
            title: this.props.collection.title,
            requestInProgress: false,
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(name) {
        let P = this;
        return function(event) {
            let value = event.value;
            let old = P.state[name];
            let changed = old !== value;
            if (!changed) {
                return;
            }

            let update = {};
            update[name] = value
            P.setState(update);
        };
    }

    result() {
        let P = this;
        return function() {
            if (P.state.requestInProgress) {
                return;
            }
            let next = !P.state.editing;
            if (next === false) {
                P.save();
            }
            P.setState({editing: next});
        }
    }

    save() {
        let P = this;
        if (P.state.requestInProgress) {
            return;
        }
        P.state.requestInProgress = true;
        let body = {
            'title': P.state.title,
            'description': P.state.description,
        };
        request({
            method: 'POST',
            uri: collectionsLink(P.props.collection.id),
            body: body,
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            json: true,
        }, function(error, response, body) {
            P.state.requestInProgress = false;
            if (error) {
                console.error(error, response, body);
                return;
            }
            var newState = {
                title: body.collection.title,
                description: body.collection.description,
            };
            console.log('newState:', newState);
            P.setState(newState);
        });



    }


    render() {
        var P = this;
        var C = this.props.collection;
        let className = 'edit-wrapper';
        if (this.state.editing) {
            className += ' editing';
        }

        return <div className="collection-page">
            <Nav user={this.props.user} links={homeLinks}/>
            <div className="body gray">
                <div className={className}>
                    <div className="edit-button"
                         onClick={this.result()}>
                        {this.state.editing ? 'Save' : 'Edit'}
                    </div>
                    <EditableTitle
                        editable={this.state.editing}
                        className="collection-title"
                        onChange={this.onChange('title')}
                        text={P.state.title}/>
                    <EditableDescription
                        editable={this.state.editing}
                        className="collection-description"
                        onChange={this.onChange('description')}
                        text={P.state.description}/>
                </div>
                <div className="collection-artworks">
                    {C.artworks.map((a) => {
                        return <ArtCard key={a.id} artwork={a}/>;
                    })}
                </div>
                <TitleContainer title="Related Art">
                    {this.props.related.map((a) => {
                        return <ArtCard key={a.id} artwork={a}/>;
                    })}
                </TitleContainer>
            </div>
        </div>;
    }
}


DOM.render(
        <CollectionPage {...PROPS}/>,
        document.getElementById('react-root'));
