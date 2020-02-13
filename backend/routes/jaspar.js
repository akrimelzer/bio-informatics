// using the superagent http request library
const request = require("superagent");

const baseURL = "http://jaspar.genereg.net/api/v1";

module.exports = ({ jasparRouter }) => {
  // getting the collections route
  jasparRouter.get("/collections", async (ctx, next) => {
    await request
      .get(baseURL + "/collections/")
      .then(res => {
        ctx.body = res.body;
      })
      .catch(err => {
        console.log(err);
      });
  });
  // specific Collection on name
  jasparRouter.get("/collections/:collection", async (ctx, next) => {
    await request
      .get(baseURL + "/collections/" + ctx.params.collection)
      .then(res => {
        ctx.body = res.body;
      })
      .catch(err => {
        console.log(err);
      });
  });

  // infer matrix profiles, given protein sequence
  jasparRouter.get("/infer/:sequence", async (ctx, next) => {
    await request
      .get(baseURL + "/infer/" + ctx.params.sequence)
      .then(res => {
        ctx.body = res.body;
      })
      .catch(err => {
        console.log(err);
      });
  });

  // return all matrix profiles
  jasparRouter.get("/matrix", async (ctx, next) => {
    await request
      .get(baseURL + "/matrix/")
      .then(res => {
        ctx.body = res.body;
      })
      .catch(err => {
        console.log(err);
      });
  });

  // return specific matrix profile
  jasparRouter.get("/matrix/:matrix_id", async (ctx, next) => {
    await request
      .get(baseURL + "/matrix/" + ctx.params.matrix_id)
      .then(res => {
        ctx.body = res.body;
      })
      .catch(err => {
        console.log(err);
      });
  });

  // return all species
  jasparRouter.get("/species", async (ctx, next) => {
    await request
      .get(baseURL + "/species/")
      .then(res => {
        ctx.body = res.body;
      })
      .catch(err => {
        console.log(err);
      });
  });

  // return specific species profile
  jasparRouter.get("/species/:tax_id", async (ctx, next) => {
    await request
      .get(baseURL + "/species/" + ctx.params.tax_id)
      .then(res => {
        ctx.body = res.body;
      })
      .catch(err => {
        console.log(err);
      });
  });

  // return all taxon
  jasparRouter.get("/taxon", async (ctx, next) => {
    await request
      .get(baseURL + "/taxon/")
      .then(res => {
        ctx.body = res.body;
      })
      .catch(err => {
        console.log(err);
      });
  });

  // return specific matrix profile
  jasparRouter.get("/taxon/:tax_group", async (ctx, next) => {
    await request
      .get(baseURL + "/taxon/" + ctx.params.tax_group)
      .then(res => {
        ctx.body = res.body;
      })
      .catch(err => {
        console.log(err);
      });
  });

  // return all transcription factor flexible models
  jasparRouter.get("/tffm/", async (ctx, next) => {
    await request
      .get(baseURL + "/tffm/")
      .then(res => {
        ctx.body = res.body;
      })
      .catch(err => {
        console.log(err);
      });
  });

  // return specific transcription factor flexible model
  jasparRouter.get("/tffm/:tffm_id/", async (ctx, next) => {
    await request
      .get(baseURL + "/tffm/" + ctx.params.tffm_id)
      .then(res => {
        ctx.body = res.body;
      })
      .catch(err => {
        console.log(err);
      });
  });
};
