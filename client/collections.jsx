'use strict';
var React = require('react');
var DOM = require('react-dom');
var request = require('browser-request');

var {Nav, NavLink} = require('./components/nav.jsx');
var {CollectionRow} = require('./components/collection.jsx');
var {homeLinks} = require('./components/utils.jsx');
var {TitleContainer} = require('./components/titleContainer.jsx');


class Collections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div className="collections-page">
            <Nav user={this.props.user} links={homeLinks}/>

            <TitleContainer title="Recommended For You">
                {this.props.recommended.map((c) => {
                    return <CollectionRow key={c.id} collection={c}/>;
                })}
            </TitleContainer>

            <TitleContainer title="Latest">
                {this.props.latest.map((c) => {
                    return <CollectionRow key={c.id} collection={c}/>;
                })}
            </TitleContainer>
        </div>;
    }
}


DOM.render(
        <Collections {...PROPS}/>,
        document.getElementById('react-root'));
