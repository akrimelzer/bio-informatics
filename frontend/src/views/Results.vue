<template>
  <div class="results">
    <div>
      <h1>Results</h1>
    </div>
    <div class="result-container">
      <div class="box protein-img">
        <v-card class="mx-auto" max-width="400" tile>
          <v-list :disabled="true">
            <v-subheader>TOP 5</v-subheader>
            <v-list-item-group v-model="item" color="primary">
              <v-list-item
                v-for="(item, i) in this.$route.params.data.top_x"
                :key="i"
                :inactive="inactive"
              >
                <v-list-item-content>
                  <v-list-item-title v-html="i"></v-list-item-title>
                  <v-list-item-subtitle>
                    position: {{ item.position }}</v-list-item-subtitle
                  >
                  <span> <b>P:</b> {{ item.value.toFixed(6) }} </span>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div>
      <div class="box information">
        <div class="chart">
          <Chart :chartdata="chartData" />
        </div>
      </div>


      <v-btn class="button">GO BACK</v-btn>
    </div>
  </div>
</template>

<script>
import Chart from '../components/Chart.vue';
export default {
  components: { Chart },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Probability',
            data: [20, 10, 5, 4, 3, 2],
            backgroundColor: [
              'rgba(230, 126, 34,0.4)'
              /*
                'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
              */
            ],
            borderColor: [
              'rgba(52, 152, 219,1.0)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      }
    };
  },

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
  grid-row: 6;
  margin: 0;
  padding: 0;
}

.chart {
  width: 45vw;
}

.box {
  border-radius: 15px;
}
.protein-img {
  grid-column: 1/3;
  grid-row: 1/3;

  background-color: white;
}
.protein-information {
  grid-column: 1/3;
  grid-row: 3/6;
  background-color: white;
}
.information {
  grid-column: 3/6;
  grid-row: 1/6;
  background-color: white;
}
.result-container {
  padding: 10px;
  display: grid;
  grid-gap: 5px;
  grid-gap: 10px;
  padding-top: 5vh;
  justify-content: center;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
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
