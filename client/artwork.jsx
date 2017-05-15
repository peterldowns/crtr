'use strict';
var React = require('react');
var DOM = require('react-dom');

var {Nav, NavLink} = require('./components/nav.jsx');
var {CollectionRow} = require('./components/collection.jsx');
var {homeLinks} = require('./components/utils.jsx');
var {TitleContainer} = require('./components/titleContainer.jsx');
var moment = require('moment');


class BigArt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var artwork = this.props.artwork;
        return <div className="big-art">
            {this.renderImage()}
            <div className="big-art-info">
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
        console.log(this.props);
        this.state = {};
    }

    render() {
        return <div>
            <Nav user={this.props.user} links={homeLinks}/>
            <TitleContainer title={this.props.artwork.title}>
                <BigArt artwork={this.props.artwork}/>
            </TitleContainer>
            <TitleContainer title={"Appears In"}>
                {this.props.collections.map((c) => {
                    return <CollectionRow key={c.id} collection={c} small={true}/>;
                })}
            </TitleContainer>
        </div>;
    }
}

DOM.render(
        <Artwork {...PROPS}/>,
        document.getElementById('react-root'));
