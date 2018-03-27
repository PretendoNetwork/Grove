let routes = require('express').Router(),
    path = require('path'),
    fs = require('fs'),
    debug = require('../../debugger'),
    route_debugger = new debug('Geisha');

route_debugger.success('Loading \'geisha-wup.cdn.pretendo.cc/geisha\'');

const DOMAIN_WHITELIST = [
    'kanzashi-wup.cdn.pretendo.cc',
    'kanzashi-movie-wup.cdn.pretendo.cc',
    'kanzashi-qa.wup.shop.pretendo.cc',
    'kanzashi-movie-qa.wup.shop.pretendo.cc'
];

/**
 * [GET]
 * Replacement for: https://geisha-wup.cdn.nintendo.net/geisha
 * Description: The eShop
 */
routes.get('/', (request, response) => {
    response.set('X-Nintendo-WhiteList', getWhiteListedDomains()); 

    response.end(fs.readFileSync(path.join(__dirname, 'views/testing2.html')));
});

/**
 * [GET]
 * Replacement for: https://geisha-wup.cdn.nintendo.net/geisha/message/messages-LANG_REGION.xml
 * Description: The language file used by the eShop
 */
routes.get(['/message/messages-en_US.xml','/message/messages-nl.xml'],  (request, response) => {
    response.set('Content-Type', 'text/xml');

    response.end(fs.readFileSync(path.join(__dirname, 'storage/index.xml')));
});

// Function name should explain itself
function getWhiteListedDomains() {
    let whitelist = [1]; // IDK why but it NEEDS to start with a `1`

    DOMAIN_WHITELIST.forEach(domain => {
        whitelist.push([ // push HTTP version of domain
            'http', // Protocol
            domain, // Domain
            null,   // Unknown
            '2'     // Unknown. Fails to work if not `2`
        ].join(','));

        whitelist.push([ // push HTTPS version of domain
            'https', // Protocol
            domain,  // Domain
            null,    // Unknown
            '2'      // Unknown. Fails to work if not `2`
        ].join(','));
    });

    return whitelist.join('|');
}

module.exports = routes;