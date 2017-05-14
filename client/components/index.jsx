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


class Index extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {};
    }


    render() {
        var index = this;
        return <div>
            <Nav/>
            <div className="slideshow-container" style={backgroundImg(this.props.header_img)}>
            </div>
            <div className="index-body curation">
                <h1>Build Your Own Curation</h1>
                <h4>Use this curator tool to boost up your great<br/>
                    ideas and make your curation awesome.
                </h4>
                <button className="button">Try Now</button>
            </div>
            <div className="index-collections-wrapper">
                {this.props.collections.map((c) => {
                    return <CollectionRow key={c.id} collection={c}/>;
                })}
            </div>
        </div>;
    }
}

module.exports = Index;
