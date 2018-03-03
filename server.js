//////////////////////////////////////////////////////////////////
///                                                            ///
///                        Dependencies                        ///
///                                                            ///
//////////////////////////////////////////////////////////////////

let port = 8080,
    debug = require('./debugger'),
    path = require('path'),
    express = require('express'),
    subdomain = require('express-subdomain'),
    colors = require('colors'),
    morgan = require('morgan'),
    app = express(),
    router = express.Router(),
    kanzashi_router = express.Router();

let server_debugger = new debug('Server');

// API routes
server_debugger.log('Importing routes');
const ROUTES = {
    GEISHA: require('./routes/geisha'),
}

// START APPLICATION

// Create router
server_debugger.log('Setting up Middleware');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Create subdomains
server_debugger.log('Creating \'geisha-wup.cdn\' subdomain');
app.use(subdomain('geisha-wup.cdn', router));

server_debugger.log('Creating \'kanzashi-wup.cdn\' subdomain');
app.use(subdomain('kanzashi-wup.cdn', kanzashi_router));

// Setup routes
server_debugger.log('Applying imported routes');
router.use('/geisha', ROUTES.GEISHA);
kanzashi_router.get('/i/rep.png', (request, response) => {
    response.sendFile(__dirname + '/public/geisha/image/rep.png');
});

// 404 handler
server_debugger.log('Creating 404 status handler');
app.use((request, response) => {
    response.status(404);
    response.send();
});

// non-404 error handler
server_debugger.log('Creating non-404 status handler');
app.use((error, request, response) => {
    let status = error.status || 500;
    response.status(status);
    response.json({
        app: 'api',
        status: status,
        error: error.message
    });
});

// Starts the server
server_debugger.log('Starting server');
app.listen(port, () => {
    server_debugger.log('Started '.green + 'on port '.blue + new String(port).yellow);
});