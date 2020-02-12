<template>
  <div class="home">
    <h1>Mapping known transcription factor binding sites</h1>
    <v-spacer></v-spacer>
    <DropDownMenu />
    <v-spacer></v-spacer>
  </div>
</template>

<script>
// @ is an alias to /src
import DropDownMenu from "@/components/DropDownMenu.vue";

export default {
  name: "Home",
  components: {
    DropDownMenu
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
</style>
