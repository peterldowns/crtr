'use strict';
var React = require('react');

export class TitleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var className = "title-container";
        if (this.props.empty) {
            className += " empty";
        }
        if (!this.props.noLine) {
            className += " underline";
        }

        return <div className={className}>
            <h1 className="title-container-title">{this.props.title}</h1>
            <div className="title-container-contents">
                {this.props.children}
            </div>
        </div>
    }
}
