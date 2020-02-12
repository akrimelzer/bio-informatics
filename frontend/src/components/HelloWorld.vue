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
        <v-menu
          v-model="value"
          :close-on-click="true"
          :close-on-content-click="true"
          :offset-y="true"
        >
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">
              Dropdown
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(collection, index) in collections"
              :key="index"
              @click="doSomething"
            >
              <v-list-item-title>{{ collection.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data: () => ({
    collections: "",
    value: false
  }),
  methods: {
    doSomething: function() {
      console.log("did something.");
    }
  },
  created: function() {
    axios
      .get("http://localhost:3000/collections/")
      .then(response => {
        this.collections = response.data.results;
        console.log(this.collection);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
