'use strict';
var React = require('react');
var DOM = require('react-dom');

var {Nav, NavLink} = require('./components/nav.jsx');
var {CollectionRow} = require('./components/collection.jsx');
var {homeLinks, backgroundImg, artworkLink} = require('./components/utils.jsx');
var {TitleContainer} = require('./components/titleContainer.jsx');





class ArtCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var A = this.props.artwork;
        return <a className="art-card" href={artworkLink(A)}>
            <div className="art-card-art"
                 style={backgroundImg(A.image_url_small)}></div>
            <a className="art-card-link">{A.title}</a>
        </a>;
    }
}


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div>
            <Nav user={this.props.user} links={homeLinks}/>
            <TitleContainer title={"Collections"}>
                {this.props.collections.map((c) => {
                    return <CollectionRow key={c.id} collection={c} small={true}/>;
                })}
                <div className="collections-row dummy">
                    <div className="collections-row-text"> + New Collection </div>
                </div>
            </TitleContainer>
            <TitleContainer title={"Recommended For You"}>
                {this.props.recommendations.map((a) => {
                    return <ArtCard key={a.id} artwork={a}/>;
                })}
            </TitleContainer>
        </div>;
    }
}

DOM.render(
        <Home {...PROPS}/>,
        document.getElementById('react-root'));
