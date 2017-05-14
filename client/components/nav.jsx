'use strict';
var React = require('react');
var ReactDOM = require('react-dom');


export class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <header className="nav-down" id="top">
                <a href="http://www.chonglii.com/index.html">
                    <img className="logo_img" id="logo_img" src="/static/img/logo.png" alt="logo of Chong Li"/>
                </a>
                <div>
                    <nav className="nav">
                        <ul>
                            <li><a href="tool" id="nav">Tool</a></li>
                            <li><a href="about" id="nav">About</a></li>
                            <li><a href="gallery" target="_blank">Gallery</a></li>
                            <li><a href="gallery" target="_blank">Team</a></li>
                            <li><a href="gallery" target="_blank">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}
