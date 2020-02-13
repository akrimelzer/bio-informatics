const Koa = require("koa");
const cors = require("@koa/cors");
const Router = require("koa-router");
const logger = require("koa-logger");
const app = new Koa();

// enable CORS (y)
app.use(cors());

// log all events to the terminal
app.use(logger());

// error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});

// instantiate our new Router
const jasparRouter = new Router();
const dogRouter = new Router({
  prefix: "/dogs"
});
const collectionsRouter = new Router({
  prefix: "/collections"
});

// require our external routes and pass in the router
require("./routes/dogs.js")({ dogRouter });
require("./routes/collections.js")({ collectionsRouter });
require("./routes/jaspar.js")({ jasparRouter });

// tells the router to use all the routes that are on the object
app.use(dogRouter.routes());
app.use(dogRouter.allowedMethods());

app.use(collectionsRouter.routes());
app.use(collectionsRouter.allowedMethods());

app.use(jasparRouter.routes());
app.use(jasparRouter.allowedMethods());

// tells the server to listen to events on the 3000 port
const server = app.listen(3000);
module.exports = server;
