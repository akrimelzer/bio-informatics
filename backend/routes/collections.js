// using the superagent http request library
const request = require("superagent");

module.exports = ({ collectionsRouter }) => {
  // getting the dogs route
  collectionsRouter.get("/", async (ctx, next) => {
    await request
      .get("http://jaspar.genereg.net/api/v1/collections/")
      .then(res => {
        ctx.body = res.body;
      })
      .catch(err => {
        console.log(err);
      });
  });

  collectionsRouter.get("/:collection", async (ctx, next) => {
    await request
      .get(
        "http://jaspar.genereg.net/api/v1/collections/" + ctx.params.collection
      )
      .then(res => {
        ctx.body = res.body;
      })
      .catch(err => {
        console.log(err);
      });
  });
};
