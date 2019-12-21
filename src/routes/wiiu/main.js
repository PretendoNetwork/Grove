const router = require('express').Router();
const logger = require('../../logger');

const DOMAIN_WHITELIST = [
	'eshop.pretendo.cc',
	'placeholder.com',
	'via.placeholder.com',
	'fonts.googleapis.com'
];

router.get('/geisha', (request, response) => {
	response.set('X-Nintendo-WhiteList', getWhiteListedDomains()); 

	response.render('index', {layout: false});
});

// Builds a domain whitelist for the eShop
// The eShop only allows resources to be loaded from a set of whitelisted domains
// Luckily, this whitelist is controlled via headers!
function getWhiteListedDomains() {
	const whitelist = [1]; // IDK why but it NEEDS to start with a `1`

	DOMAIN_WHITELIST.forEach(domain => {
		whitelist.push([ // push HTTP version of domain
			'http', // Protocol
			domain, // Domain
			null,   // Unknown
			'2'	 // Unknown. Fails to work if not `2`
		].join(','));

		whitelist.push([ // push HTTPS version of domain
			'https', // Protocol
			domain,  // Domain
			null,	// Unknown
			'2'	  // Unknown. Fails to work if not `2`
		].join(','));
	});

	return whitelist.join('|');
}

module.exports = router;