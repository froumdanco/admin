<template>
  <div class="pa-3 ma-3">
    <template v-if="edit != null">
      <h3>{{ edit.name }}</h3>
      <hr />
      <v-card>
        <v-card-title>فایل های آلبوم</v-card-title>
        <imagemanager2
          :id="edit._id"
          :text="edit.text"
          :detail="true"
          component="album"
          v-on:myevent="doSomething"
        ></imagemanager2>
      </v-card>

      <v-card>
        <v-card-title>کاور آلبوم</v-card-title>
        <imagemanager
          :id="edit._id"
          :text="edit.text"
          :detail="true"
          component="myalbum"
          v-on:myevent="doSomething"
        ></imagemanager>
      </v-card>
    </template>
    <template v-if="edit != null">
      <v-container>
        <v-form @submit.prevent="save">
          <v-row>
            <v-col cols="6">
              <v-text-field
                dir="rtl"
                :label="$t('نام ')"
                v-model="edit.name"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                dir="ltr"
                :label="$t('کد')"
                v-model="edit.code"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-btn type="submit">{{ $t("Save") }}</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
      <tisseditor :id="edit._id" component="albumeditor"></tisseditor>
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
      edit: null,
    };
  },
  watch: {},
  methods: {
    mergemovie() {},
    doSomething(e) {
      this.edit.text = e;
    },
    save() {
      let that = this;
      var edited = {
        name: this.edit.name,
        code: this.edit.code,
      };
      this.$axios
        .put(this.$url + "v1/dashboard/Album/" + this.edit.id, edited, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then(function (res) {
          alert("saveed");
        });
    },
    loaditem() {
      let that = this;
      this.$axios
        .get(this.$url + "v1/dashboard/Album/" + this.$route.params.items, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then(function (res) {
          that.edit = res.data.message;
        })
        .catch((error) => {
          that.error = error.response;
        });
    },
  },
  mounted() {
    this.loaditem();
  },
};
</script>

<style>
</style>
