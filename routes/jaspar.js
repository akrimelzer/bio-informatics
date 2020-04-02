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

  jasparRouter.post("/matrix/:matrix_id/PPM/:nums?", async (ctx, next) => {
    console.log(ctx.request.body)
    let DNASequence = ctx.request.body.dna;
    await request
      .get(baseURL + "/matrix/" + ctx.params.matrix_id)
      .then(res => {
        PPM = convToPPM(res.body.pfm);
        ctx.body = "Something went wrong. Sorry about that.";
        splitted_chromosome = [];
        let string_length = PPM.A.length - 1;
        let test_chromosomes = DNASequence.toString();
        let chromosome_slices = getChromosomeSlices(
          test_chromosomes,
          string_length
        );
        let amount_returned = chromosome_slices.length;

        let probabilities = getProbabilityKeyValuePair(chromosome_slices, PPM);

        // Create items array
        chart_arr = [];

        var items = Object.keys(probabilities).map(function(key) {
          chart_arr.push(probabilities[key].value);
          return [key, probabilities[key].value, probabilities[key].position];
        });
        // Sort the array based on the second element
        items.sort(function(first, second) {
          return second[1] - first[1];
        });

        // make a return dictionary of 100 highest probabilities with transcription factor site
        if (ctx.params.nums) {
          amount_returned = ctx.params.nums;
        }
        let returnDict = {};
        for (let i = 0; i < amount_returned; i++) {
          returnDict[items[i][0]] = {
            position: items[i][2],
            value: items[i][1]
          };
        }
        // return top 100 items
        ctx.body = { top_x: returnDict, chart_arr: chart_arr };

        console.log("returned filtered probabilities");
      })
      .catch(err => {
        console.log(err);
      });
  });

  // return PPM of a specific matrix
  const get_PPM = jasparRouter.get(
    "/matrix/:matrix_id/PPM/:nums?",
    async (ctx, next) => {
      console.log("Accessing Get request");
      await request
        .get(baseURL + "/matrix/" + ctx.params.matrix_id)
        .then(res => {
          let amount_returned = 100;
          PPM = convToPPM(res.body.pfm);
          ctx.body = "Something went wrong. Sorry about that.";
          splitted_chromosome = [];
          let string_length = PPM.A.length - 1;
          let test_chromosomes = chromosome_1;
          let chromosome_slices = getChromosomeSlices(
            test_chromosomes,
            string_length
          );

          let probabilities = getProbabilityKeyValuePair(
            chromosome_slices,
            PPM
          );
          // Create items array
          var items = Object.keys(probabilities).map(function(key) {
            return [key, probabilities[key].value, probabilities[key].position];
          });

          // Sort the array based on the second element
          items.sort(function(first, second) {
            return second[1] - first[1];
          });

          // make a return dictionary of 100 highest probabilities with transcription factor site
          if (ctx.params.nums) {
            amount_returned = ctx.params.nums;
          }
          let returnDict = {};
          for (let i = 0; i < amount_returned; i++) {
            returnDict[items[i][0]] = {
              position: items[i][2],
              value: items[i][1]
            };
          }
          // return top 100 items
          ctx.body = returnDict;
        })
        .catch(err => {
          console.log(err);
        });
    }
  );

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
  const getChromosomeSlices = (chromosome, string_length) => {
    chromosome = chromosome.replace(/(\r\n|\n|\r)/gm, "");
    for (let i = 0; i < chromosome.length - string_length; i++) {
      let chromosome_slice = chromosome.slice(i, i + string_length);
      if (
        chromosome_slice.length === string_length &&
        chromosome_slice !== undefined
      ) {
        splitted_chromosome.push(chromosome_slice);
      }
    }
    return splitted_chromosome;
  };

  const getProbabilityKeyValuePair = (splitted_chromosome, PPM) => {
    probabilities = [];
    for (let i = 0; i < splitted_chromosome.length; i++) {
      let current_chromosome = splitted_chromosome[i];
      probabilities[current_chromosome] = {
        position: i,
        value: getProbability(PPM, current_chromosome)
      };
    }
    return probabilities;
  };

  const getProbability = (matrix, current_chromosome) => {
    let probability = 1;
    for (let i = 0; i < current_chromosome.length - 1; i++) {
      let current_letter = current_chromosome[i];
      probability = probability * matrix[current_letter][i];
    }
    return probability;
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
