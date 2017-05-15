'use strict';
var React = require('react');

export class TitleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div className="title-container">
            <h1 className="title-container-title">{this.props.title}</h1>
            <div className="title-container-contents">
                {this.props.children}
            </div>
        </div>
    }
}
