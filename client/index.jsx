console.log('hello');
var React = require('react');
var DOM = require('react-dom');
var Index = require('./components/index.jsx');

DOM.render(
        <Index {...PROPS}/>,
        document.getElementById('react-root'));
