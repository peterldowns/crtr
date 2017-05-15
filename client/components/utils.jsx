var {NavLink} = require('./nav.jsx');

export const cssurl = function(s) {
    return `url(${s})`;
};

export const backgroundImg = function(url) {
    return {backgroundImage: cssurl(url)};
};

export const goTo = function(url) {
    return function() {
        window.location.href = url;
    };
};

export const artworkLink = function(artwork) {
    return "/artwork/" + artwork.id;
};

export const collectionsLink = function(id) {
    return "/collections/" + id;
};

export const homeLinks = [
    new NavLink('Home', '/home'),
    new NavLink('Collections', '/collections'),
    new NavLink('Search', '/search'),
    new NavLink('Settings', '/settings'),
];
