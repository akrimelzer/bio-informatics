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
      <div class="box protein-information"></div>
      <div class="box information"></div>

      <v-btn class="button">GO BACK</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //top_x: this.$route.params.data.top_x,
      //chart_arr: this.$route.params.data.chart_arr
    };
  },
  components: {},
  method: {
    round: function(number) {
      var num = parseFloat(number);
      return num.toFixed(4);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Titillium+Web:400,600,700&display=swap");
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
  font-family: "Titillium Web";
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
