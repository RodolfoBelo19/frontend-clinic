<template>
  <div class="w-full" v-if="links">
    <div
      v-for="link in links"
      :key="link.id"
      class="py-7 px-5 m-5 flex justify-between items-center bg-white rounded-md shadow-lg"
    >
      <div class="flex gap-4 items-center">
        <font-awesome-icon class="text-gray-400 text-xl" :icon="['fa', 'ellipsis-vertical']" />
        <div class="flex flex-col">
          <span class="text-xl text-gray-600 font-sans font-bold">{{ link.slug }}</span>
          <span class="text-sm text-cyan-400">{{ link.url }}</span>
        </div>
      </div>
      <div class="flex gap-5 items-center">
        <div class="text-gray-300">
          <small>23</small>
          <font-awesome-icon class="mx-2 text-sm" :icon="['fa', 'chart-simple']" />
        </div>
        <div class="flex gap-3">
          <font-awesome-icon class="text-sm text-gray-400" :icon="['fa', 'copy']" />
          <font-awesome-icon class="text-sm text-gray-400" :icon="['fa', 'edit']" />
          <font-awesome-icon class="text-sm text-gray-400" :icon="['fa', 'trash']" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="py-7 px-5 m-5 bg-white rounded-md shadow-lg">
      <span class="text-xl">No links found</span>
    </div>
  </div>
</template>

<script>
import { listLinks } from "../../../lib/listLinks";
export default {
  name: "CardLink",
  data() {
    return {
      links: [],
    };
  },
  methods: {
    async list() {
      this.links = await listLinks();
    },
  },
  async mounted() {
    await this.list();
  },
};
</script>

<style scoped></style>
