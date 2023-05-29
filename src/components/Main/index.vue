<script setup>
import Link from "./Link/index.vue";
</script>

<template>
  <div class="flex justify-center bg-gray-100 h-screen">
    <Link :searchValue="searchValue"/>
  </div>
</template>

<script>
export default {
  name: "Main",
  props: ["searchValue"],
};
</script>
