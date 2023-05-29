<script setup>
import InfoStats from "./InfoStats/index.vue";
import CardLink from "./CardLink/index.vue";
</script>

<template>
  <div class="mt-24 md:max-w-5xl w-full flex flex-col items-center justify-center">
    <InfoStats />
    <CardLink :searchValue="searchValue"/>
  </div>
</template>

<script>
export default {
  name: "Link",
  props: ["searchValue"],
};
</script>