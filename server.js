//////////////////////////////////////////////////////////////////
///                                                            ///
///                        Dependencies                        ///
///                                                            ///
//////////////////////////////////////////////////////////////////

let port = 8080,
    path = require('path'),
    express = require('express'),
    subdomain = require('express-subdomain'),
    colors = require('colors'),
    morgan = require('morgan'),
    app = express(),
    router = express.Router(),
    kanzashi_router = express.Router();

// API routes
const ROUTES = {
    GEISHA: require('./routes/geisha'),
}

// START APPLICATION

// Create router
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (request, response) => {
    response.end('<script>document.location.href="/test"</script>')
});

app.get('/test', (request, response) => {
    console.log(request.headers);
    response.end('t')
});

// Create subdomain
app.use(subdomain('geisha-wup.cdn', router));
app.use(subdomain('kanzashi-wup.cdn', kanzashi_router));

// Setup routes
router.use('/geisha', ROUTES.GEISHA);
kanzashi_router.get('/i/rep.png', (request, response) => {
    response.sendFile(__dirname + '/public/geisha/image/rep.png');
});

// 404 handler
app.use((request, response) => {
    response.status(404);
    response.send();
});

// non-404 error handler
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
app.listen(port, () => {
    console.log('Server'.blue + ' started '.green.bold + 'on port '.blue + new String(port).yellow);
});