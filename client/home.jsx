'use strict';
var React = require('react');
var DOM = require('react-dom');

var {Nav, NavLink} = require('./components/nav.jsx');
var {CollectionRow} = require('./components/collection.jsx');
var {homeLinks} = require('./components/utils.jsx');
var {TitleContainer} = require('./components/titleContainer.jsx');
var {ArtCard} = require('./components/artCard.jsx');


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div>
            <Nav user={this.props.user} links={homeLinks}/>
            <div className="body white">
                <div className="title-container">
                    <div className="title-container-contents">
                        {this.props.collections.map((c) => {
                            return <CollectionRow key={c.id} collection={c} small={true}/>;
                        })}
                        <div className="collections-row dummy">
                            <div className="collections-row-text"> + New Collection </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="body gray">
                <div className="title-container">
                    <div className="title-container-title"> Recommended For You </div>
                    <div className="title-container-contents">
                        {this.props.recommendations.map((a) => {
                            return <ArtCard key={a.id} artwork={a}/>;
                        })}
                    </div>
                </div>
            </div>
        </div>;
    }
}

DOM.render(
        <Home {...PROPS}/>,
        document.getElementById('react-root'));
