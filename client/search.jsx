'use strict';
var React = require('react');
var DOM = require('react-dom');

var {Nav} = require('./components/nav.jsx');
var {homeLinks} = require('./components/utils.jsx');

var {CollectionRow} = require('./components/collection.jsx');
var {TitleContainer} = require('./components/titleContainer.jsx');
var {ArtCard} = require('./components/artCard.jsx');


class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div>
            <Nav user={this.props.user} links={homeLinks}/>
            <div className="body">
            <h1> Hello </h1>
            </div>
        </div>;
    }
}

DOM.render(
        <SearchPage {...PROPS}/>,
        document.getElementById('react-root'));
