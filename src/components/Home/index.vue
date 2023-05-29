<script setup>
import Header from "../Header/index.vue";
import Main from "../Main/index.vue";
</script>

<template>
  <Header @search="handleSearch"/>
  <Main :searchValue="searchValue"/>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    handleSearch(value) {
      this.searchValue = value;
    },
  },
};
</script>

<style scoped></style>
