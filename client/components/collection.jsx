'use strict';
var React = require('react');
var ReactDOM = require('react-dom');

const cssurl = function(s) {
    return `url(${s})`;
}
const backgroundImg = function(url) {
    return {backgroundImage: cssurl(url)};
}

export class CollectionRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var c = this.props.collection;
        var art = c.artworks.slice(0, 4);
        return <div className="collections-row">
            <div className="collections-row-text">
                <a className="collections-row-title" href="#"> {c.title} &rarr; </a>
            </div>
            <div className="collections-row-art">
                {art.map((a) => {
                    return <div className="collections-row-artwork"
                                key={a.id}
                                style={backgroundImg(a.image_url_small)}>
                    </div>;
                })}
            </div>
        </div>;
    }
}
