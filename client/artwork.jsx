'use strict';
var React = require('react');
var DOM = require('react-dom');
var request = require('browser-request');

var {Nav, NavLink} = require('./components/nav.jsx');
var {CollectionRow} = require('./components/collection.jsx');
var {homeLinks} = require('./components/utils.jsx');
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
                + My Collection
            </div>;
        }
        return <div key="add" className="button art-ctrl-add" onClick={this.props.toggle}>
            &ndash; My Collection
        </div>;
    }

    render() {
        var artwork = this.props.artwork;
        return <div className="big-art">
            {this.renderImage()}
            <div className="big-art-info">
                <div className="big-art-tools">
                    {this.renderControl()}
                </div>

                <p> <b>Title</b>: {artwork.title} </p>
                <p> <b>Classification</b>: {artwork.classification} </p>
                <p> <b>Department</b>: {artwork.department} </p>
                <p> <b>Culture</b>: {artwork.culture} </p>
                <p> <b>Medium</b>: {artwork.medium} </p>
                <p> <b>Date</b>: {moment(artwork.created).format('MMMM Do YYYY')} </p>
            </div>
        </div>
    }

    renderImage() {
        var artwork = this.props.artwork;
        if (!artwork.image_url_large) {
            return <div className="big-art-box empty"></div>;
        }
        return <a className="big-art-box" target="_blank" href={artwork.image_url_large}>
            <div className="big-art-wrap">
                <img className="big-art-img" src={artwork.image_url_small}/>
            </div>
        </a>;
    }
}

class Artwork extends React.Component {
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
        return <TitleContainer empty={!this.state.collections.length}
                               title={"Appears In"}>
            {this.state.collections.map((c) => {
                return <CollectionRow key={c.id} collection={c} small={true}/>;
            })}
        </TitleContainer>;
    }

    render() {
        return <div className="artwork-page">
            <Nav user={this.props.user} links={homeLinks}/>
            <div className="body">
                <TitleContainer title={this.props.artwork.title}>
                    <BigArt artwork={this.props.artwork}
                            in_collection={this.state.in_collection}
                            toggle={this.toggleCollectionStatus.bind(this)}/>
                </TitleContainer>
                <TitleContainer title="Related Art">
                    {this.props.related.map((a) => {
                        return <ArtCard key={a.id} artwork={a}/>;
                    })}
                </TitleContainer>
                {this.renderCollections()}
            </div>;
        </div>;
    }
}

DOM.render(
        <Artwork {...PROPS}/>,
        document.getElementById('react-root'));
