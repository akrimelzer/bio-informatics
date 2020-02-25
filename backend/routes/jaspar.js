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
  // adding ?page_size=3150 to set number of results to page
  jasparRouter.get("/matrix", async (ctx, next) => {
    await request
      .get(baseURL + "/matrix/?page_size=3150")
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

  // return PPM of a specific matrix
  jasparRouter.get("/matrix/:matrix_id/PPM", async (ctx, next) => {
    await request
      .get(baseURL + "/matrix/" + ctx.params.matrix_id)
      .then(res => {
        PPM = convToPPM(res.body.pfm);
        ctx.body = PPM;
      })
      .catch(err => {
        console.log(err);
      });
  });

  const convToPPM = matrix => {
    // initialize PPM
    let PPM = {
      A: [],
      C: [],
      T: [],
      G: []
    };
    // PFM
    A = matrix.A;
    C = matrix.C;
    T = matrix.T;
    G = matrix.G;
    // iterate through all values and normalize
    for (let i = 0; i < A.length; i++) {
      let total_amount = A[i] + C[i] + T[i] + G[i];
      // Pseudocount Xi +1 / N + 1 * 0.25
      PPM["A"].push((A[i] + 1) / (total_amount + 0.25));
      PPM["C"].push((C[i] + 1) / (total_amount + 0.25));
      PPM["T"].push((T[i] + 1) / (total_amount + 0.25));
      PPM["G"].push((G[i] + 1) / (total_amount + 0.25));
    }
    return PPM;
  };

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
