console.log('hello');
var React = require('react');
var DOM = require('react-dom');
var Index = require('./components/index.jsx');
console.log('Index:', Index);

DOM.render(
        <Index {...PROPS}/>,
        document.getElementById('react-root'));
