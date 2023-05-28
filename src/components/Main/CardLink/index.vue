<template>
  <div class="w-full" v-if="links.length">
    <div
      v-for="link in links"
      :key="link.id"
      class="py-7 px-5 m-5 flex justify-between items-center bg-white rounded-md shadow-lg"
    >
      <div class="flex gap-4 items-center">
        <font-awesome-icon
          class="text-gray-400 text-xl"
          :icon="['fa', 'ellipsis-vertical']"
        />
        <div class="flex flex-col">
          <span class="text-xl text-gray-600 font-sans font-bold">{{
            link.slug
          }}</span>
          <span class="text-sm text-cyan-400">
            <a target="_blank" :href="`https://${link.url}`">{{ link.url }}</a>
          </span>
        </div>
      </div>
      <div class="flex gap-5 items-center">
        <div class="text-gray-300">
          <small>23</small>
          <font-awesome-icon
            class="mx-2 text-sm"
            :icon="['fa', 'chart-simple']"
          />
        </div>
        <div class="flex gap-3">
          <button>
            <font-awesome-icon
              class="text-sm text-gray-400"
              :icon="['fa', 'copy']"
            />
          </button>
          <button @click="editShortLink(link.id)">
            <font-awesome-icon
              class="text-sm text-gray-400"
              :icon="['fa', 'edit']"
            />
          </button>
          <button @click="deleteShortLink(link.id)">
            <font-awesome-icon
              class="text-sm text-gray-400"
              :icon="['fa', 'trash']"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="py-7 px-5 m-5 bg-white rounded-md shadow-lg">
      <span class="text-xl">No links found</span>
    </div>
  </div>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <v-card>
        <v-card-title>
          <h2 class="text-h5 mt-5 text-gray-400 text-center">Edit Your Link</h2>
        </v-card-title>
        <v-card-text>
          <v-form v-model="isValidForm" @submit.prevent="submit(form.id)">
            <v-text-field
              type="text"
              v-model="form.url"
              placeholder="https://example.com"
              label="Link*"
              required
              :rules="rules"
            />
            <v-text-field
              type="text"
              v-model="form.slug"
              label="Slug (optional)"
            />
            <div class="flex gap-2 justify-end">
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="dialog = false"
              >
                Close
              </v-btn>
              <v-btn
                :disabled="!isValidForm"
                type="submit"
                color="blue-darken-1"
                variant="text"
              >
                Shorten
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { listLinks } from "../../../lib/listLinks";
import { handleCreateOrUpdateLink } from "../../../lib/handleCreateOrUpdateLink";
import { handleDeleteLink } from "../../../lib/handleDeleteLink";
import { uuid } from "vue-uuid";

const NAMESPACE = "65f9af5d-f23f-4065-ac85-da725569fdcd";

export default {
  name: "CardLink",
  data() {
    return {
      NAMESPACE,
      dialog: false,
      links: [],
      form: {
        id: "",
        url: "",
        slug: "",
      },
      isValidForm: false,
      rules: [
        (v) =>
          !!v || "Required field! Please fill in this field with a valid URL!",
        (value) => this.isURL(value) || "URL is not valid",
      ],
    };
  },
  methods: {
    async editShortLink(id) {
      this.dialog = true;
      const link = this.links.find((link) => link.id === id);

      this.form = {
        id: link.id,
        url: `https://${link.url}`,
        slug: link.slug,
      };
    },
    async deleteShortLink(id) {
      await handleDeleteLink(id);
      await this.list();
    },
    async submit(id) {
      if (this.form.slug === "") {
        this.form.slug = uuid.v5(this.form.url, NAMESPACE);
      }

      const link = this.links.find((link) => link.id === id);
      if(link.url === this.form.url && link.slug === this.form.slug) {
        this.dialog = false;
        return;
      }

      if(`https://${link.url}` === this.form.url) {
        delete this.form.url;
      }

      if(link.slug === this.form.slug) {
        delete this.form.slug;
      }

      try {
        await handleCreateOrUpdateLink({
          data: this.form,
          url: `link/${id}`,
          id,
        });
        this.dialog = false;
        await this.list();
      } catch (error) {
        console.log(error);
      }
    },
    async list() {
      this.links = await listLinks();
    },
    isURL(str) {
      let url;

      try {
        url = new URL(str);
      } catch (_) {
        return false;
      }

      return url.protocol === "http:" || url.protocol === "https:";
    },
  },
  async mounted() {
    await this.list();
  },
};
</script>

<style scoped></style>
