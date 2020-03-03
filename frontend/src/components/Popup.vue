<template>
  <div>
    <v-row justify="center">
      <v-btn
        color="deep-orange lighten-1"
        class="matrix-button"
        dark
        @click.stop="dialog = true"
      >{{matrix.name}}</v-btn>

      <v-dialog v-model="dialog" max-width="720" outlined>
        <v-card>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Collection: {{matrix.collection}}</div>
              <v-card-title class="headline">{{ matrix.name}}</v-card-title>
              <v-card-text>ID: {{matrix.matrix_id}}</v-card-text>
            </v-list-item-content>
            <v-img height="220" width="200" v-bind:src="matrix.sequence_logo"></v-img>
          </v-list-item>
          <!-- buttons -->
          <v-card-actions>
            <v-btn color="green darken-1" text @click="dialog = false">BACK</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="goToNext">CONTINUE</v-btn>
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
  },
  methods: {
    goToNext: function() {
      this.dialog = false;
      console.log(this.$router);
      console.log(this.matrix);
      this.$router.push({
        name: "Matrix",
        params: {
          matrix: this.matrix,
          name: this.matrix.name,
          matrix_id: this.matrix.matrix_id
        }
      });
    }
  }
};
</script>

<style>
.matrix-button {
  color: aqua;
  width: 30%;
}
</style>