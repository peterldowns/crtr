'use strict';
var React = require('react');
var DOM = require('react-dom');
var request = require('browser-request');
var Cookies = require('js-cookie');

var {Nav} = require('./components/nav.jsx');
var {homeLinks} = require('./components/utils.jsx');

var {CollectionRow} = require('./components/collection.jsx');
var {TitleContainer} = require('./components/titleContainer.jsx');
var {ArtCard} = require('./components/artCard.jsx');


class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.debounce = 500 /*ms*/;
        this.confirmation = 2000 /*ms*/;
        this.state = {
            query: this.props.query,
            results: this.props.results,
            timeout: null,
            counter: 1,
        };

        this.onQuery = this.onQuery.bind(this);
        this.makeQuery = this.makeQuery.bind(this);
        this.sendQuery = this.sendQuery.bind(this);
    }

    onQuery(event) {
        let S = this;
        let query = event.target.value;
        let counter = this.state.counter + 1;
        S.setState({query: query, counter: counter});
        if (S.state.timeout !== null) {
            clearTimeout(S.state.timeout);
        }
        let timeout = setTimeout(S.makeQuery(query, counter), S.debounce);
        S.setState({timeout: timeout});
    }

    makeQuery(query, counter) {
        let S = this;
        return function() {
            S.sendQuery(query, counter);
        };
    }

    sendQuery(query, counter) {
        let S = this;
        let payload = {
            query: query,
        };
        request({
            method: 'POST',
            uri: '/api/search',
            body: payload,
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            json: true,
        }, function(error, response, body) {
            if (error) {
                console.error(error, response, body);
                return;
            }
            if (S.state.counter !== counter) {
                console.error('response too old:', body);
                return;
            }
            // TODO: better state replacement over time
            let url = '/search/' + encodeURI(query);
            history.replaceState({}, '', url);
            S.setState({
                results: body.results,
            });
        });
    }


    render() {
        return <div className="search-page">
            <Nav user={this.props.user} links={homeLinks}/>
            <div className="search-bar body gray">
                <h1> Search </h1>
                <input type="text" value={this.state.query} onChange={this.onQuery}/>
                <p> {this.state.query ? `${this.state.results.length} results` : ''} </p>
            </div>
            <div className="search-results body white">
                {this.state.results.map((artwork) => {
                    return <ArtCard key={artwork.id} artwork={artwork}/>;
                })}
            </div>
        </div>;
    }
}

DOM.render(
        <SearchPage {...PROPS}/>,
        document.getElementById('react-root'));
