<template>
  <div class="results">
    <div>
      <h1>Results</h1>
    </div>
    <div class="result-container">
      <div class="box protein-img"></div>
      <div class="box protein-information">
        <span
          >Protein blablaji djidj wiji jfie jfej fiejf iejfi ejf eijf eijf ei
          jhwqu qw</span
        >
      </div>
      <div class="box information"></div>

      <v-btn class="button">GO BACK</v-btn>
    </div>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import Chart from '../components/Chart.vue';

export default {
  components: {},

  props: ['matrix']
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Titillium+Web:400,600,700&display=swap');
h1 {
  font-size: 3em;
}
.button {
  grid-column: 3;
  grid-row: 5;
  margin: 0;
  padding: 0;
}

.box {
  border-radius: 15px;
}
.protein-img {
  grid-column: 1;
  grid-row: 1/3;

  background-color: red;
}
.protein-information {
  grid-column: 1;
  grid-row: 3/5;
  background-color: blue;
}
.information {
  grid-column: 2/6;
  grid-row: 1/5;
  background-color: black;
}
.result-container {
  display: grid;
  grid-gap: 5px;
  grid-gap: 10px;
  padding-top: 5vh;
  justify-content: center;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  flex-direction: row;
  width: 80vw;
  height: 70vh;
  border-radius: 15px;

  background-color: darkorange;
}
.results {
  font-family: 'Titillium Web';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: center;
  height: 100vh;
  align-content: center;
  display: flex;
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
}
</style>
