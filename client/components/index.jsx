'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

const cssurl = function(s) {
    return `url(${s})`;
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.props = props;
        this.state = {};
        console.log('render!');
    }

    render() {
        var index = this;
        return (
            <div>
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
            <div>
                <div className="slideshow-container" style={{backgroundImage: cssurl(this.props.header_img)}}>
                </div>
                <hr/>

                // curation
                <div className="curation">
                    <h1>Build Your Own Curation</h1>
                    <h4>Use this curator tool to boost up your great<br/>
                        ideas and make your curation awesome.
                    </h4>
                    <button className="button">Try Now</button>
                </div>

                // crtr today
                <div className="cardblock">
                    <h3>CRTR TODAY</h3>
                    <div>

                        <div className="card">
                            <a href="samplecuration.html">
                                <img src="resources/card1.jpg" alt="Avatar"/>
                                <div className="container">
                                    <h5>What Great Simple Wants For Christmas</h5>
                                    <h6>Figuring out how our brains work is key to understanding </h6>
                                </div>
                            </a>
                        </div>

                        <div className="card">
                            <a href="samplecuration.html">
                                <img src="resources/card2.png" alt="Avatar"/>
                                <div className="container">
                                    <h5>What Great Simple Wants For Christmas</h5>
                                    <h6>Figuring out how our brains work is key to understanding </h6>
                                </div>
                            </a>
                        </div>

                        <div className="card">
                            <a href="samplecuration.html">
                                <img src="resources/card5.png" alt="Avatar"/>
                                <div className="container">
                                    <h5>Robot’s Penguin Disguise Keeps Birds Calm</h5>
                                    <h6>Figuring out how our brains work is key to understanding </h6>
                                </div>
                            </a>
                        </div>

                        <div className="card">
                            <a href="samplecuration.html">
                                <img src="resources/card6.png" alt="Avatar"/>
                                <div className="container">
                                    <h5>What Great Simple Wants For Christmas</h5>
                                    <h6>Figuring out how our brains work is key to understanding </h6>
                                </div>
                            </a>
                        </div>

                        <div className="card">
                            <a href="samplecuration.html">
                                <img src="resources/card7.png" alt="Avatar"/>
                                <div className="container">
                                    <h5>Britain’s 10 Greatest Gourmet Sandwiches</h5>
                                    <h6>Figuring out how our brains work is key to understanding  </h6>
                                </div>
                            </a>
                        </div>

                        <div className="card">
                            <a href="samplecuration.html">
                                <img src="resources/card8.png" alt="Avatar"/>
                                <div className="container">
                                    <h5>The Secret Sauce of Guilty Pleasures</h5>
                                    <h6>What makes some foods nearly irresistible?</h6>
                                </div>
                            </a>
                        </div>
                        <div className="card">
                            <a href="samplecuration.html">
                                <img src="resources/card3.png" alt="Avatar"/>
                                <div className="container">
                                    <h5>Britain’s 10 Greatest Gourmet Sandwiches</h5>
                                    <h6>Figuring out how our brains work is key to understanding  </h6>
                                </div>
                            </a>
                        </div>

                        <div className="card">
                            <a href="samplecuration.html">
                                <img src="resources/card4.png" alt="Avatar"/>
                                <div className="container">
                                    <h5>The Secret Sauce of Guilty Pleasures</h5>
                                    <h6>What makes some foods nearly irresistible?</h6>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

module.exports = Index;
