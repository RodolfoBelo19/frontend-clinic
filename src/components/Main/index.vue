<script setup>
import CardLink from "./CardLink/index.vue";
import InfoStats from "./InfoStats/index.vue";
</script>

<template>
  <div class="flex justify-center bg-gray-100 h-screen">
    <div class="md:max-w-5xl w-full flex flex-col items-center justify-center">
      <InfoStats />
      <CardLink />
    </div>
  </div>
</template>
