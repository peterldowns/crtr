'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

var {Nav, NavLink} = require('./nav.jsx');

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
        return <div>
            <Nav user={this.props.user} links={links}/>
            <h1> Hello </h1>
        </div>;
    }
}

module.exports = Home;
