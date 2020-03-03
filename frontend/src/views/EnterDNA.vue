<template>
  <div class="home">
    <h1>Enter DNA please</h1>
    <div class="content">
      <v-col class="premade-dna-area">
        <h3>CHOSE FORM THESE</h3>
        <v-container fluid>
          <p v-if="radios !== 'clear'">Currently selected: {{ radios }}</p>
          <p v-else>Choose from our preselected DNAs</p>
          <v-radio-group v-model="radios" :mandatory="false">
            <div @click="setDNAValue(0)">
              <v-radio
                label="Clear"
                color="deep-orange lighten-1"
                value="clear"
                class="white--text"
              ></v-radio>
            </div>
            <div @click="setDNAValue(1)">
              <v-radio
                label="Human Genome"
                color="deep-orange lighten-1"
                value="Human DNA"
                class="white--text"
              ></v-radio>
            </div>
            <div @click="setDNAValue(2)">
              <v-radio
                label="Streptococcus Genome"
                color="deep-orange lighten-1"
                value="Streptococcus DNA"
                class="white--text"
              ></v-radio>
            </div>
          </v-radio-group>
        </v-container>
        <div>
          <h2>Current Transcription Factor:</h2>
          <h2>{{ this.$route.params.name }}</h2>
        </div>
      </v-col>
      <v-col class="dna-input-area">
        <v-textarea
          solo
          name="input-7-4"
          label="Enter DNA sequence"
          autofocus
          flat
          v-model="DNA"
          :value="DNA"
          >{{ DNA }}</v-textarea
        >
      </v-col>
    </div>
    <v-col id="buttons">
      <v-btn @click="goBack">GO BACK</v-btn>
      <v-btn @click="continueToResults">CONTINUE</v-btn>
    </v-col>
  </div>
</template>

<script>
import axios from "axios";
import * as DNAs from "../../var";
let chromosome_1 = DNAs.default[0];
let streptococcus_r6 = DNAs.default[1];
export default {
  name: "Matrix",
  data() {
    return {
      radios: "clear",
      DNA: ""
    };
  },
  methods: {
    setDNAValue: function(value) {
      if (value === 1) {
        this.radios = "Human DNA";
        this.DNA = chromosome_1;
      } else if (value === 2) {
        this.radios = "Streptococcus DNA";
        this.DNA = streptococcus_r6;
      } else {
        this.radios = "clear";
        this.DNA = "";
      }
    },
    goBack: function() {
      this.$router.go(-1);
    },
    goNext: function(data) {
      this.$router.push({
        name: "Results",
        params: {
          data: data
        }
      });
    },
    continueToResults: async function() {
      await axios
        .post(
          "http://localhost:3000/matrix/" +
            this.$route.params.matrix_id +
            "/PPM/5",
          {
            dna: this.DNA
          }
        )
        .then(
          function(response) {
            let topArray = response.data;
            //let returnArray;
            if (topArray === "Something went wrong. Sorry about that.") {
              console.log(topArray);
            } else {
              this.$router.push({
                name: "Results",
                params: {
                  data: topArray
                }
              });
              console.log(this.$router.params);
            }
            // SEND TO RESULTS PAGE WHEN FINISHED
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Titillium+Web:400,600,700&display=swap");
.white--text /deep/ label {
  color: white;
}
.home {
  font-family: "Titillium Web";
  height: 100%;
  width: 100%;
  color: white;
  background: #00d2ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #3a7bd5,
    #00d2ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #3a7bd5,
    #00d2ff
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: flex;
  flex-direction: column;
  text-align: center;
}
h1 {
  padding-bottom: 10%;
}
.content {
  display: flex;
  flex-direction: row;
  align-items: space-between;
}
.premade-dna-area {
  flex: 1;
}
.dna-input-area {
  flex: 2;
}
#buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 20%;
}
</style>
