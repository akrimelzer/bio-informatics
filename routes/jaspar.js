// using the superagent http request library
const request = require("superagent");

const baseURL = "http://jaspar.genereg.net/api/v1";

module.exports = ({ jasparRouter }) => {
  // getting the collections route
  jasparRouter.get("/collections", async (ctx, next) => {
    await request
      .get(baseURL + "/collections/")
      .then((res) => {
        ctx.body = res.body;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // specific Collection on name
  jasparRouter.get("/collections/:collection", async (ctx, next) => {
    await request
      .get(baseURL + "/collections/" + ctx.params.collection)
      .then((res) => {
        ctx.body = res.body;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // infer matrix profiles, given protein sequence
  jasparRouter.get("/infer/:sequence", async (ctx, next) => {
    await request
      .get(baseURL + "/infer/" + ctx.params.sequence)
      .then((res) => {
        ctx.body = res.body;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // return all matrix profiles
  // adding ?page_size=3150 to set number of results to page
  jasparRouter.get("/matrix", async (ctx, next) => {
    await request
      .get(baseURL + "/matrix/?page_size=3150")
      .then((res) => {
        ctx.body = res.body;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // return specific matrix profile
  jasparRouter.get("/matrix/:matrix_id", async (ctx, next) => {
    await request
      .get(baseURL + "/matrix/" + ctx.params.matrix_id)
      .then((res) => {
        ctx.body = res.body;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  jasparRouter.post("/matrix/:matrix_id/PPM/:nums?", async (ctx, next) => {
    let DNASequence = ctx.request.body.dna;
    await request
      .get(baseURL + "/matrix/" + ctx.params.matrix_id)
      .then((res) => {
        PPM = convToPPM(res.body.pfm);
        PWM = convToPWM(PPM)
        ctx.body = "Something went wrong. Sorry about that.";
        splitted_chromosome = [];
        let string_length = PPM.A.length - 1;
        let test_chromosomes = DNASequence.toString();
        let chromosome_slices = getChromosomeSlices(
          test_chromosomes,
          string_length
        );
        let amount_returned = chromosome_slices.length;
        if (ctx.params.nums) {
          amount_returned = ctx.params.nums;
        }

        let probabilities_PPM = getProbabilityKeyValuePair(chromosome_slices, PPM, "PPM");
        let probabilities_PWM = getProbabilityKeyValuePair(chromosome_slices, PWM, "PWM");
        
        const [chart_arr_PPM, returnDict_PPM] = extract_top_x(probabilities_PPM, amount_returned);
        const [chart_arr_PWM, returnDict_PWM] = extract_top_x(probabilities_PWM, amount_returned);


        
        // return top 100 items
        ctx.body = { 
          top_x_PPM: returnDict_PPM, 
          chart_arr_PPM: chart_arr_PPM,
          top_x_PWM: returnDict_PWM, 
          chart_arr_PWM: chart_arr_PWM,
        };

        console.log("returned filtered probabilities");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const extract_top_x = (probabilities, amount_returned) => {
    chart_arr = [[
      0,
      0.0
    ]];

    var items = Object.keys(probabilities).map(function (key, index) {
      if(probabilities[key].position == 1){
        console.log("HELLO")
      }
      if ((probabilities[key].value < 0.00001 && probabilities[key].position != 1 )) {
        return [key, probabilities[key].value, probabilities[key].position];
      }
      chart_arr.push([probabilities[key].position, probabilities[key].value]);
      return [key, probabilities[key].value, probabilities[key].position];
    });
  
    chart_arr.push([Object.keys(probabilities).length, 0.0])
    // Sort the array based on the second element
    items.sort(function (first, second) {
      return second[1] - first[1];
    });

    chart_arr.sort(function (first, second) {
      return first[0] - second[0];
    });
    // make a return dictionary of 100 highest probabilities with transcription factor site

    let returnDict = [];
    for (let i = 0; i < amount_returned; i++) {
      returnDictItem = {
        id: i,
        name: items[i][0],
        position: items[i][2],
        value: items[i][1],
      };
      returnDict.push(returnDictItem);
    }
    return [chart_arr, returnDict]
  }


  const convToPPM = (matrix) => {
    // initialize PPM
    let PPM = {
      A: [],
      C: [],
      T: [],
      G: [],
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

const convToPWM = (matrix) => {
  // initialize PPM
  let PWM = {
    A: [],
    C: [],
    T: [],
    G: [],
  };
  // PFM
  A = matrix.A;
  C = matrix.C;
  T = matrix.T;
  G = matrix.G;
  // iterate through all values and normalize
  for (let i = 0; i < A.length; i++) {  
    //  M_(k,j) = log_2(M_(k,j) / b_k), where b_k = 1/|k| and k = range of alphabet. 
    PWM["A"].push(Math.log2(A[i] / 0.25));
    PWM["C"].push(Math.log2(C[i] / 0.25));
    PWM["T"].push(Math.log2(T[i] / 0.25));
    PWM["G"].push(Math.log2(G[i] / 0.25));
  }
  return PWM;
}

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

  const getProbabilityKeyValuePair = (splitted_chromosome, matrix, method) => {
    probabilities = [];
    for (let i = 0; i < splitted_chromosome.length; i++) {
      let current_chromosome = splitted_chromosome[i];
      probabilities[current_chromosome] = {
        position: i,
        value: getProbability(matrix, current_chromosome, method),
      };
    }
    return probabilities;
  };

  const getProbability = (matrix, current_chromosome, method) => {
    let probability = 1;
    for (let i = 0; i < current_chromosome.length - 1; i++) {
      let current_letter = current_chromosome[i];
      probability = ( method === "PPM") ? probability * matrix[current_letter][i] : probability = probability + matrix[current_letter][i];
    }
    return probability;
  };

  // return all species
  jasparRouter.get("/species", async (ctx, next) => {
    await request
      .get(baseURL + "/species/")
      .then((res) => {
        ctx.body = res.body;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // return specific species profile
  jasparRouter.get("/species/:tax_id", async (ctx, next) => {
    await request
      .get(baseURL + "/species/" + ctx.params.tax_id)
      .then((res) => {
        ctx.body = res.body;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // return all taxon
  jasparRouter.get("/taxon", async (ctx, next) => {
    await request
      .get(baseURL + "/taxon/")
      .then((res) => {
        ctx.body = res.body;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // return specific matrix profile
  jasparRouter.get("/taxon/:tax_group", async (ctx, next) => {
    await request
      .get(baseURL + "/taxon/" + ctx.params.tax_group)
      .then((res) => {
        ctx.body = res.body;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // return all transcription factor flexible models
  jasparRouter.get("/tffm/", async (ctx, next) => {
    await request
      .get(baseURL + "/tffm/")
      .then((res) => {
        ctx.body = res.body;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // return specific transcription factor flexible model
  jasparRouter.get("/tffm/:tffm_id/", async (ctx, next) => {
    await request
      .get(baseURL + "/tffm/" + ctx.params.tffm_id)
      .then((res) => {
        ctx.body = res.body;
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
