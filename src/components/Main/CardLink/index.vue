<template>
  <v-card class="py-7 px-5 mx-5">
    {{ links }}
  </v-card>
</template>

<script>
import { listLinks } from '../../../lib/listLinks';
export default {
  name: "CardLink",
  data() {
    return {
      links: [],
    };
  },
  methods: {
    async list() {
      this.links = await listLinks()
    }
  },
  async mounted() {
    await this.list();
  },
};
</script>

<style scoped></style>
