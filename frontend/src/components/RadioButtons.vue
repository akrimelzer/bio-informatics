

<template>
  <v-container fluid>
    <p v-if="radios !== 'clear'">Currently selected: {{ radios }}</p>
    <p v-else>Choose from our preselected DNAs</p>
    <v-radio-group v-model="radios" :mandatory="false">
      <v-radio label="Clear" value="clear"></v-radio>
      <v-radio label="Human DNA" value="Human DNA"></v-radio>
      <v-radio label="Dog DNA" value="Dog DNA"></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      radios: "clear"
    };
  }
};
</script>

<style>
</style>