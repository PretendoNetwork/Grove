const router = require('express').Router();
const logger = require('../../logger');

router.get('/geisha', (request, response) => {
	response.render('home', {layout: false});
});

module.exports = router;