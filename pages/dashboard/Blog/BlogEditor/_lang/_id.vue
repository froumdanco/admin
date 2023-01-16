<template>
  <div>
    <template v-if="edit != null">
      <v-form @submit.prevent="save">
        <v-card color="basil">
          <v-card-title class="text-center justify-center py-6">
            <h4>
              {{ $t("Edit Article") }} {{ edit.name }} {{ $t("in") }}
              {{ $t($route.params.lang) }}
            </h4>
          </v-card-title>

          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tab>{{ $t("content") }} </v-tab>
            <v-tab>{{ $t("setting") }} </v-tab>
            <v-tab>{{ $t("keywords") }} </v-tab>
            <v-tab>{{ $t("video") }} </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item class="pa-5">
              <v-card class="pa-3">
                <h3>{{ $t("content") }}</h3>
                <hr />
                <v-text-field
                  v-model="edit.name"
                  :label="$t('Name')"
                ></v-text-field>

            
              </v-card>
            </v-tab-item>

            <v-tab-item class="pa-5">
              <v-card color="#eee" class="pa-4 mb-4 mt-4">
                <v-text-field
                  v-model="edit.url"
                  :label="$t('Url')"
                ></v-text-field>
                <div v-if="groups != null">
                  <v-select
                    :label="$t('Group Select')"
                    v-model="edit.parent"
                    :items="groups.message"
                    item-text="name"
                    item-value="_id"
                  ></v-select>
                </div>
                <v-col cols="12">
                  <v-combobox
                    v-model="edit.tags"
                    :items="items"
                    :label="$t('Subject')"
                    multiple
                    chips
                  ></v-combobox>
                </v-col>
              </v-card>
            </v-tab-item>
            <v-tab-item class="pa-5">
              <v-text-field
                v-model="edit.refrence"
                :label="$t('Reference')"
              ></v-text-field>
              <v-textarea v-model="edit.telegram" :label="$t('telegram')">
                </v-textarea
              >

              <v-textarea
                v-model="edit.keywords"
                :label="$t('keywords')"
              ></v-textarea>
              <v-textarea
                v-model="edit.description"
                :label="$t('description')"
              ></v-textarea>
            </v-tab-item>
            <v-tab-item class="pa-5">
              <div class="mt-3 text-center">
                <label>{{ $t("video uploader") }}</label>
                <uploadropzone :id="edit.id" component="blog"></uploadropzone>
              </div>
            </v-tab-item>
          </v-tabs-items>
        
        </v-card>

        <v-btn type="submit">{{ $t("Save") }}</v-btn>
        <v-btn class="btn" color="primary" @click="sendtottelegram"
          >{{ $t("Send To Telegram Bot") }}
        </v-btn>
      </v-form>

      <error-show :err="error"></error-show>
    </template>
  </div>
</template>

<script>
import ErrorShow from "~/components/ErrorShow";
export default {
  name: "EditGroup",
  components: { ErrorShow },

  data() {
    return {
      file: null,
      tab: null,

      edit: null,
      tags: null,
      error: null,
      groups: null,
      items: [],
    };
  },
  watch: {
    // whenever question changes, this function will run
    tags: function (newQuestion, oldQuestion) {
      for (const i in newQuestion) {
        this.items.push(newQuestion[i].name);
      }
    },
    // whenever question changes, this function will run
    edit: function (newQuestion, oldQuestion) {
      if (this.$lang != this.$route.params.lang) {
        if (typeof this.edit[this.$route.params.lang] !== "undefined") {
          this.edit.title = this.edit[this.$route.params.lang]["title"];
          this.edit.name = this.edit[this.$route.params.lang]["name"];
          this.edit.text = this.edit[this.$route.params.lang]["text"];
          this.edit.keywords = this.edit[this.$route.params.lang]["keywords"];
          this.edit.description =
            this.edit[this.$route.params.lang]["description"];
          this.edit.tags = this.edit[this.$route.params.lang]["tags"];
          this.edit.telegram = this.edit[this.$route.params.lang]["telegram"];
          this.edit.refrence = this.edit[this.$route.params.lang]["refrence"];
        }
      }
    },
  },
  methods: {
    mergemovie() {},
    doSomething(e) {
      this.edit.text = e;
    },
    sendtottelegram() {
      let that = this;
      this.$axios
        .get(this.$url + "v1/dashboard/telegram/" + this.$route.params.id, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then(function (res) {
          //location.href='/dashboard/blog/';
        });
    },
    save() {
      let that = this;
      this.edit.lang = this.$route.params.lang;
      this.edit.defalang = this.$lang;

      this.$axios
        .put(
          this.$url + "v1/dashboard/blog/" + this.$route.params.id,
          this.edit,
          {
            headers: {
              Authorization: localStorage.token,
            },
          }
        )
        .then(function (res) {
          location.href = that.localePath("/dashboard/blog/");
        })
        .catch((error) => {
          that.error = error.response;
        });
    },
    loaditem() {
      let that = this;
      this.$axios
        .get(this.$url + "v1/dashboard/blog/" + this.$route.params.id, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then(function (res) {
          that.edit = res.data.message;
          that.tags = res.data.tag;
        })
        .catch((error) => {
          that.error = error.response;
        });
    },
    loadgroup() {
      let that = this;
      this.$axios
        .get(this.$url + "v1/dashboard/bloggroup", {
          headers: { Authorization: localStorage.token },
        })
        .then(function (res) {
          that.groups = res.data;
        });
    },
  },
  mounted() {
    this.loaditem();
    this.loadgroup();
  },
};
</script>

<style scoped>
</style>
