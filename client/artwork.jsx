'use strict';
var React = require('react');
var DOM = require('react-dom');
var request = require('browser-request');

var {Nav, NavLink} = require('./components/nav.jsx');
var {CollectionRow} = require('./components/collection.jsx');
var {homeLinks, goTo} = require('./components/utils.jsx');
var {TitleContainer} = require('./components/titleContainer.jsx');
var {ArtCard} = require('./components/artCard.jsx');
var Cookies = require('js-cookie');
var moment = require('moment');




class BigArt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderControl() {
        if (this.props.in_collection) {
            return <div key="remove" className="button art-ctrl-remove" onClick={this.props.toggle}>
                Remove from <b>{this.props.collection.title}</b>
            </div>;
        }
        return <div key="add" className="button art-ctrl-add" onClick={this.props.toggle}>
            + My Collection
        </div>;
    }

    render() {
        let artwork = this.props.artwork;
        let artist = artwork.artists && artwork.artists[0];
        let info = [
            ['Title', artwork.title],
            ['Artist', artist && artist.name],
            ['Classification', artwork.classification],
            ['Department', artwork.department],
            ['Culture', artwork.culture],
            ['Medium', artwork.medium],
            ['Date', moment(artwork.created).format('MMMM Do YYYY')],
        ];

        let labelClass = "big-art-label";
        if (!artwork.label) {
            labelClass += ' empty';
        }

        let tableClass = "big-art-info-table";
        if (!artwork.label) {
            tableClass += ' no-label'
        }
        return <div>
            <div className="big-art-top body gray">
                {this.renderImage()}
                <div className="big-art-tools">
                    {this.renderControl()}
                </div>
            </div>
            <div className="big-art-bottom body white">
                <div className="big-art-info">
                    <div className={tableClass}>
                        {info.filter(([name, value]) => !!value).map(([name, value]) => {
                            return <div className="big-art-info-row" key={name}>
                                <div className="big-art-info-cell name">{name}</div>
                                <div className="big-art-info-cell value">{value}</div>
                            </div>;
                        })}
                    </div>
                    <div className={labelClass}>
                        {artwork.label}
                    </div>
                </div>
            </div>
        </div>
    }

    renderImage() {
        var artwork = this.props.artwork;
        if (!artwork.image_url_large) {
            return <div className="big-art-box empty"></div>;
        }
        return <a className="big-art-box">
            <div className="big-art-wrap">
                <img className="big-art-img"
                     onClick={goTo(artwork.image_url_large, true)}
                     src={artwork.image_url_small}/>
            </div>
        </a>;
    }
}

class ArtworkPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artwork: props.artwork,
            collections: props.collections || [],
            collection: props.collection,
            in_collection: props.in_collection,

            requestInProgress: false,
        };
    }

    toggleCollectionStatus() {
        var page = this;
        if (page.state.requestInProgress) {
            return;
        }
        page.state.requestInProgress = true;
        var body = {
            'change': page.state.in_collection ? 'remove' : 'add',
            'artwork_id': page.state.artwork.id,
            'collection_id': page.state.collection.id,
        }
        request({
            method: 'POST',
            uri: '/api/change_collection_status',
            body: body,
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            json: true,
        }, function(error, response, body) {
            page.state.requestInProgress = false;
            if (error) {
                console.error(error, response, body);
                return;
            }
            var newState = body;
            page.setState(newState);
        });
    }

    renderCollections() {
        return <div className="title-container">
            <div className="title-container-contents">
                {this.state.collections.map((c) => {
                    return <CollectionRow key={c.id} collection={c} small={true}/>;
                })}
            </div>
        </div>;
    }

    render() {
        let className = "body white";
        if (!this.state.collections.length) {
            className += " empty";
        }
        return <div className="artwork-page">
            <Nav user={this.props.user} links={homeLinks}/>
            <BigArt artwork={this.props.artwork}
                    collection={this.props.collection}
                    in_collection={this.state.in_collection}
                    toggle={this.toggleCollectionStatus.bind(this)}/>
            <div className="body gray">
                <TitleContainer title="Related Art">
                        {this.props.related.map((a) => {
                            return <ArtCard key={a.id} artwork={a}/>;
                        })}
                </TitleContainer>
            </div>
            <div className={className}>
                <h1 className="title-container-title"> Appears In </h1>
                {this.renderCollections()}
            </div>
        </div>;
    }
}

DOM.render(
        <ArtworkPage {...PROPS}/>,
        document.getElementById('react-root'));
