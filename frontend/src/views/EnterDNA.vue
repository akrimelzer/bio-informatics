<template>
  <div class="home">
    <h1>Enter DNA please</h1>
    <div class="content">
      <v-col class="premade-dna-area">
        <h3>CHOSE FORM THESE</h3>
        <radio-buttons />
      </v-col>
      <v-col class="dna-input-area">
        <v-textarea solo name="input-7-4" label="Custom DNA sequence" autofocus flat></v-textarea>
      </v-col>
    </div>
    <v-col id="buttons">
      <v-btn>GO BACK</v-btn>
      <v-btn>CONTINUE</v-btn>
    </v-col>
  </div>
</template>

<script>
import RadioButtons from "../components/RadioButtons";
export default {
  name: "Matrix",
  components: {
    RadioButtons
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