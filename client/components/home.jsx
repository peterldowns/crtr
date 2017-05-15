'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var {Nav, NavLink} = require('./nav.jsx');

class TitleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div className="title-container">
            <h1 className="title-container-title">{this.props.title}</h1>
            {this.props.children}
        </div>
    }
}

const cssurl = function(s) {
    return `url(${s})`;
}

const backgroundImg = function(url) {
    return {backgroundImage: cssurl(url)};
}

class ArtCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var A = this.props.artwork;
        return <div className="art-card">
            <div className="art-card-art"
                 style={backgroundImg(A.image_url_small)}></div>
            <a className="art-card-link">{A.title}</a>
        </div>;
    }
}


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var links = [
            new NavLink('Home', '/home'),
            new NavLink('Collections', '/collections'),
            new NavLink('Search', '/search'),
            new NavLink('Settings', '/settings'),
        ];
        console.log('recommendations:', this.props.recommendations);
        return <div>
            <Nav user={this.props.user} links={links}/>
            <TitleContainer title={"Recommended For You"}>
                {this.props.recommendations.map((a) => {
                    return <ArtCard key={a.id} artwork={a}/>;
                })}
            </TitleContainer>
            <TitleContainer title={"Collections"}>
            </TitleContainer>
        </div>;
    }
}

module.exports = Home;
