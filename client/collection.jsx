'use strict';
var React = require('react');
var DOM = require('react-dom');
var request = require('browser-request');

var {Nav, NavLink} = require('./components/nav.jsx');
var {CollectionRow} = require('./components/collection.jsx');
var {homeLinks} = require('./components/utils.jsx');
var {ArtCard} = require('./components/artCard.jsx');
var {TitleContainer} = require('./components/titleContainer.jsx');


class CollectionPage extends React.Component {
    constructor(props) {
        super(props);
        console.log('PROPS:', props);
        this.state = {};
    }

    render() {
        var C = this.props.collection;

        return <div className="collection-page">
            <Nav user={this.props.user} links={homeLinks}/>
            <div className="body gray">
                <h1> {C.title} </h1>
                <p> {C.description} </p>
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
