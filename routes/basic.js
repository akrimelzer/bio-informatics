module.exports = ({ router }) => {
  // getting the home route
  router.get("/", (ctx, next) => {
    console.log(ctx);
    ctx.body = "Hello World!";
  });
};
