<template>
  <div class="w-full md:p-12 p-7 m-5">
    <!-- <div class="flex justify-between">
      <span>stats</span>
      <span>see all</span>
    </div> -->
    <div class="flex justify-center gap-5">
      <div class="flex items-center gap-3">
        <span class="text-gray-600">
          <font-awesome-icon :icon="['fa', 'link']" />
        </span>
        <div class="flex flex-col">
          <span class="text-xl font-sans font-bold">{{ links.length }}</span>
          <small class="text-gray-500">Links</small>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-gray-600">
          <font-awesome-icon :icon="['fa', 'arrow-pointer']" />
        </span>
        <div class="flex flex-col">
          <span class="text-xl font-sans font-bold">{{
            getTotalAccessCount
          }}</span>
          <small class="text-gray-500">Clicks</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { listLinks } from "../../../../lib/listLinks";
import { listInfoLinks } from "../../../../lib/listInfoLinks";
export default {
  name: "InfoStats",
  data() {
    return {
      links: [],
      linksInfo: [],
    };
  },
  methods: {
    async getList() {
      [this.links, this.linksInfo] = await Promise.all([
        listLinks(),
        listInfoLinks(),
      ]);
    },
  },
  async mounted() {
    await this.getList();
  },
  computed: {
    getTotalAccessCount() {
      return this.linksInfo.reduce((total, e) => total + e.count_access, 0);
    },
  },
};
</script>
