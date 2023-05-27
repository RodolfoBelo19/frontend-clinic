<template>
  <div class="w-full" v-if="links">
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
          <span class="text-sm text-cyan-400">{{ link.url }}</span>
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
          <button>
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
          <v-form v-model="isValidForm" @submit.prevent="submit">
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
export default {
  name: "CardLink",
  data() {
    return {
      dialog: false,
      links: [],
      form: {
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
        url: link.url,
        slug: link.slug,
      };

      const { url, slug } = this.form;
      const response = await fetch(`/links/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          slug,
        }),
      });
      if (response.ok) {
        this.dialog = false;
        this.list();
      }
    },
    async list() {
      this.links = await listLinks();
    },
  },
  async mounted() {
    await this.list();
    await this.trackAccessLog();
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
};
</script>

<style scoped></style>
