<template>
  <div>
    <v-row justify="center">
      <v-btn
        color="deep-orange lighten-1"
        class="matrix-button"
        dark
        @click.stop="dialog = true"
      >{{matrix.name}}</v-btn>
      <!--
            matrix_id": "PF0144.1",
             "name": "AAANWWTGC", 
             "collection": "PHYLOFACTS", 
             "base_id": "PF0144", 
             "version": "1", 
             "sequence_logo": "http://jaspar.genereg.net/static/logos/svg/PF0144.1.svg", 
            "url": "http://jaspar.genereg.net/api/v1/matrix/PF0144.1/"
      -->
      <v-dialog v-model="dialog" max-width="490">
        <v-card>
          <v-card-title class="headline">{{ matrix.name}}</v-card-title>

          <v-card-text>ID: {{matrix.matrix_id}}</v-card-text>
          <v-card-text>Collection: {{matrix.collection}}</v-card-text>
          <v-card-text>Base ID: {{matrix.base_id}}</v-card-text>
          <v-card-text>Version: {{matrix.version}}</v-card-text>
          <v-img height="200" width="200" v-bind:src="matrix.sequence_logo"></v-img>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false">BACK</v-btn>

            <v-btn color="green darken-1" text @click="dialog = false">CONTINUE</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["matrix"],
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style>
.matrix-button {
  color: aqua;
  width: 30%;
}
</style>