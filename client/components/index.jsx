'use strict';
var React = require('react');
var ReactDOM = require('react-dom');


var {Nav} = require('./nav.jsx');
var {CollectionRow} = require('./collection.jsx');

const cssurl = function(s) {
    return `url(${s})`;
}

const backgroundImg = function(url) {
    return {backgroundImage: cssurl(url)};
}

const goTo = function(url) {
    return function() {
        window.location.href = url;
    };
}


class Index extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {};
    }


    render() {
        var index = this;
        return <div>
            <Nav user={this.props.user}/>
            <div className="slideshow-container">
                <h1>Curate Your Own Collection</h1>
                <h4>Use this curator tool to boost up your great<br/>
                    ideas and make your curation awesome.
                </h4>
                <div className="button" onClick={goTo('/home')}>Try Now</div>
            </div>
            <div className="index-collections-wrapper">
                <div className="index-collections-text">
                    <h2> Or Dive Into These</h2>
                    <h4> Our visitors have been hard at work curating their own collections. Explore the museum's works throught their eyes. </h4>
                </div>
                {this.props.collections.map((c) => {
                    return <CollectionRow key={c.id} collection={c}/>;
                })}
            </div>
        </div>;
    }
}

module.exports = Index;