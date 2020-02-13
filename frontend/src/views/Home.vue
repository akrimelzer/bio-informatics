<template>
  <div class="home">
    <h1>Mapping known transcription factor binding sites</h1>
    <v-card class="mx-auto search-bar" dark color="deep-orange lighten-1" width="30%">
      <v-text-field v-model="search" mx-10 label="Main input" hide-details="auto"></v-text-field>
    </v-card>

    <div class="matrixes" v-for="(matrix, index) in filteredMatrixes" :key="index">
      <Popup v-bind:matrix="matrix" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Popup from "@/components/Popup.vue";

export default {
  name: "Home",
  components: {
    Popup
  },
  data: () => ({
    matrixes: "",
    value: false,
    search: ""
  }),
  methods: {
    doSomething: function() {
      console.log("did something.");
    }
  },
  computed: {
    filteredMatrixes: function() {
      if (this.search === "") {
        return this.matrixes;
      } else {
        return this.matrixes.filter(matrix => {
          return matrix.name
            .toLowerCase()
            .startsWith(this.search.toLowerCase());
        });
      }
    }
  },
  created: function() {
    axios
      .get("http://localhost:3000/matrix/")
      .then(response => {
        this.matrixes = response.data.results;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.home {
  height: 100vh;
  width: 100vw;
  background-color: coral;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.matrixes {
  padding: 10px;
}

.search-bar {
  margin-top: 10%;
}
</style>
