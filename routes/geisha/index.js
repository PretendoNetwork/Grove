let routes = require('express').Router(),
    path = require('path'),
    fs = require('fs');

const DOMAIN_WHITELIST = [
    'kanzashi-wup.cdn.pretendo.cc',
    'kanzashi-movie-wup.cdn.pretendo.cc',
    'kanzashi-qa.wup.shop.pretendo.cc',
    'kanzashi-movie-qa.wup.shop.pretendo.cc'
];

console.log(getWhiteListedDomains())

routes.get('/', (request, response) => {
    response.set('X-Nintendo-WhiteList', getWhiteListedDomains()); 

    response.end(fs.readFileSync(path.join(__dirname, 'views/index.html')));
});

routes.get('/message/messages-en_US.xml',  (request, response) => {
    response.set('Content-Type', 'text/xml');

    response.end(fs.readFileSync(path.join(__dirname, 'storage/index.xml')));
});

function getWhiteListedDomains() {
    let whitelist = [1];

    DOMAIN_WHITELIST.forEach(domain => {
        whitelist.push([ // push HTTP version of domain
            'http', // Protocol
            domain, // Domain
            null,   // Unknown
            '2'     // Unknown
        ].join(','));

        whitelist.push([ // push HTTPS version of domain
            'https', // Protocol
            domain,  // Domain
            null,    // Unknown
            '2'      // Unknown
        ].join(','));
    });

    return whitelist.join('|');
}

module.exports = routes;