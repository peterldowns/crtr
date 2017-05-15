var React = require('react');
var DOM = require('react-dom');
var Home = require('./components/home.jsx');

DOM.render(
        <Home {...PROPS}/>,
        document.getElementById('react-root'));
