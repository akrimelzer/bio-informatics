<template>
  <v-container>
    <v-menu v-model="value" :close-on-click="true" :close-on-content-click="true" :offset-y="true">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">See All Collections</v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(collection, index) in collections" :key="index" @click="doSomething">
          <Popup v-bind:matrix="collection" />
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script>
import Popup from "./Popup";
import axios from "axios";
export default {
  name: "DropDownMenu",
  components: {
    Popup
  },
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
      .get("http://localhost:3000/matrix/")
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
<style scoped>
#drop-down-menu {
  justify-self: center;
  align-self: center;
}
</style>
