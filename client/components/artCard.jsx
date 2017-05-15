'use strict';
var React = require('react');
var {backgroundImg, artworkLink} = require('./utils.jsx');


export class ArtCard extends React.Component {
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
