<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>
        <v-btn @click="callBackend">Get collections</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data: () => ({}),
  methods: {
    callBackend: function() {
      axios
        .get("http://localhost:3000/collections/")
        .then(function(response) {
          console.log(response.data.results);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
