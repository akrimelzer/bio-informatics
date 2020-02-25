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
            <v-radio label="Clear" value="clear"></v-radio>
            <v-radio label="Human Genome" value="Human DNA"></v-radio>
            <v-radio label="Streptococcus Genome " value="Streptococcus DNA"></v-radio>
          </v-radio-group>
        </v-container>
      </v-col>
      <v-col class="dna-input-area">
        <v-textarea
          solo
          name="input-7-4"
          label="Enter DNA sequence"
          autofocus
          flat
          :value="DNASequence"
        >{{ human_genome }}</v-textarea>
      </v-col>
    </div>
    <v-col id="buttons">
      <v-btn @click="goBack">GO BACK</v-btn>
      <v-btn>CONTINUE</v-btn>
    </v-col>
  </div>
</template>

<script>
import * as DNAs from "../../var";
let chromosome_1 = DNAs.default[0];
let streptococcus_r6 = DNAs.default[1];
export default {
  name: "Matrix",
  data() {
    return {
      human_genome: chromosome_1,
      streptococcus_genome: streptococcus_r6,
      radios: "clear"
    };
  },
  components: {},
  computed: {
    DNASequence: function() {
      if (this.radios === "Human DNA") {
        return this.human_genome;
      } else if (this.radios === "Streptococcus DNA") {
        return this.streptococcus_genome;
      } else {
        return "";
      }
    }
  },
  methods: {
    goBack: function() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.home {
  height: 100%;
  width: 100%;
  background-color: coral;
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