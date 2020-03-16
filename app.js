const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const cors = require('@koa/cors');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const PORT = process.env.PORT || 8080;

const app = new Koa();

// enable CORS (y)
app.use(cors());

// log all events to the terminal
app.use(logger());

app.use(bodyParser());

// instantiate our new Router
const jasparRouter = new Router();
const dogRouter = new Router({
  prefix: '/dogs'
});
const collectionsRouter = new Router({
  prefix: '/collections'
});

// require our external routes and pass in the router
require('./routes/dogs.js')({ dogRouter });
require('./routes/collections.js')({ collectionsRouter });
require('./routes/jaspar.js')({ jasparRouter });

// tells the router to use all the routes that are on the object
app.use(dogRouter.routes());
app.use(dogRouter.allowedMethods());

app.use(collectionsRouter.routes());
app.use(collectionsRouter.allowedMethods());

app.use(jasparRouter.routes());
app.use(jasparRouter.allowedMethods());

app.use(
  serve(path.resolve(__dirname, 'client/build'), {
    maxage: 1000 * 60 * 60 * 24 * 30 // a month
  })
);
// tells the server to listen to events on the 3000 port
app.listen(PORT);
module.exports = app;
