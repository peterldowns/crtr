'use strict';
var React = require('react');
var {backgroundImg, artworkLink} = require('./utils.jsx');
var {TitleContainer} = require('./titleContainer.jsx');


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
            <div className="art-card-link">
                <div className="art-card-title">{A.title}</div>
            </div>
        </a>;
    }
}
