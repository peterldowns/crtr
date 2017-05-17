'use strict';
var React = require('react');
var DOM = require('react-dom');
var request = require('browser-request');
var moment = require('moment');

var {CollectionRow} = require('./components/collection.jsx');
var {backgroundImg, collectionsLink} = require('./components/utils.jsx');
var {ArtCard} = require('./components/artCard.jsx');
var {TitleContainer} = require('./components/titleContainer.jsx');


class GalleryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let A = this.props.artwork;
        return <div className="item" onClick={this.props.onClick}>
            <div className="item-img" style={backgroundImg(A.image_url_small)}>
            </div>
            <div className="item-title"> {A.title} </div>
        </div>;
    }
}

class GalleryPage extends React.Component {
    constructor(props) {
        super(props);
        let G = this;
        G.mapping = {}
        G.props.collection.artworks.forEach(function(artwork) {
            G.mapping[artwork.id] = artwork;
        });
        G.state = {
            detailView: null,
        };
        G.itemClick = G.itemClick.bind(G);
    }

    itemClick(artwork) {
        let G = this;
        return function(event) {
            G.setState({detailView: artwork ? artwork.id : null});
        };
    }

    render() {
        let G = this;
        let C = this.props.collection;
        if (!G.state.detailView) {
            var content = <div className="item-view">
                <p className="description"> {C.description || 'lorem ipsum dolores'} </p>
                <div key="works" className="works">
                    {C.artworks.map((a) => {
                        return <GalleryItem onClick={G.itemClick(a)} key={a.id} artwork={a}/>;
                    })}
                </div>
            </div>;
        } else {
            let A = G.mapping[G.state.detailView];
            let info = [
                ['Title', A.title],
                ['Classification', A.classification],
                ['Department', A.department],
                ['Culture', A.culture],
                ['Medium', A.medium],
                ['Date', moment(A.created).format('MMMM Do YYYY')],
            ];
            var content = <div key="details-view" className="details-view">
                <div className="details-view-nav">
                    <div className="nav-item nav-left">
                        <h2 className="nav-title"> {A.title} </h2>
                    </div>
                    <div className="nav-item nav-center"></div>
                    <div className="nav-item nav-right">
                        <div  onClick={G.itemClick()} className="ctrl button"> Back </div>
                    </div>
                </div>
                <div className="details-view-splitpane">
                    <img className="details-view-artwork" src={A.image_url_large}/>
                    <div className="details-view-info">
                        <div className='artwork-label'>
                            {A.label}
                        </div>
                        <div className='big-art-info-table'>
                            {info.filter(([name, value]) => !!value).map(([name, value]) => {
                                return <div className="big-art-info-row" key={name}>
                                    <div className="big-art-info-cell name">{name}</div>
                                    <div className="big-art-info-cell value">{value}</div>
                                </div>;
                            })}
                    </div>


                    </div>
                </div>
            </div>;
        }

        return <div className="gallery-page">
            <a className="collection-link" target="_blank" href={collectionsLink(C.id)}> View Collection </a>
            <h1 className="title"> {C.title} </h1>
            {content}
        </div>;
    }
}


DOM.render(
        <GalleryPage {...PROPS}/>,
        document.getElementById('react-root'));
