<template>
  <div
    class="gap-5 bg-white fixed w-full shadow-lg py-4 px-5 flex items-center justify-between"
  >
    <h1 class="text-center text-gray-400 font-bold tracking-widest">DDSV</h1>

    <div class="gap-5 w-6/12 flex items-center justify-center">
      <font-awesome-icon class="text-gray-400" :icon="['fa', 'search']" />

      <input
        placeholder="Search or Paste URL"
        type="text"
        class="text-center w-full shadow-sm p-3 border-2 border-gray-300 bg-gray-200 rounded-lg"
      />
      <button @click="dialog = true" class="text-2xl text-gray-400">+</button>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
          <v-card>
            <v-card-title>
              <h2 class="text-h5 mt-5 text-gray-400 text-center">
                Shorten Your Link
              </h2>
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
    </div>

    <div class="flex items-center gap-4">
      <font-awesome-icon class="text-gray-400" :icon="['fa', 'bell']" />
      <img
        class="rounded-full w-12"
        src="https://avatars.githubusercontent.com/u/64740047?v=4"
        alt=""
      />
      <font-awesome-icon class="text-gray-400" :icon="['fa', 'chevron-down']" />
    </div>
  </div>
</template>

<script>
import { handleCreateOrUpdateLink } from "../../lib/handleCreateOrUpdateLink";
import { uuid } from "vue-uuid";

const NAMESPACE = "65f9af5d-f23f-4065-ac85-da725569fdcd";

export default {
  name: "Header",
  data() {
    return {
      NAMESPACE,
      dialog: false,
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
    async submit() {
      if (this.form.slug === "") {
        this.form.slug = uuid.v5(this.form.url, NAMESPACE);
      }

      try {
        await handleCreateOrUpdateLink({
          data: this.form,
          url: "link",
        });
        this.dialog = false;
        this.resetForm();
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    resetForm() {
      this.form = {
        url: "",
        slug: "",
      };
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
};
</script>
