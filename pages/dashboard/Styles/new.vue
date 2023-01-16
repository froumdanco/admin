<template>
  <div>
    <v-form @submit.prevent="saveitem">
      <h4>{{ $t("Create New Styles") }}</h4>
      <hr />
      <v-row>
        <v-col cols="6">
          <v-text-field :label="$t('name')" v-model="save.name"> </v-text-field>
        </v-col>
      </v-row>

      <v-btn type="submit">{{ $t("Save") }}</v-btn>
    </v-form>
    <error-show :err="error"></error-show>
  </div>
</template>

<script>
import ErrorShow from "~/components/ErrorShow";
export default {
  name: "newgroup",
  components: {
    "error-show": ErrorShow,
  },
  watch: {
    "save.name": function (val) {
      this.save.url = this.changeUrl(this.save.name);
    },
  },

  data() {
    return {
      error: null,
      save: {
        name: null,
        code: null,
      },
    };
  },
  methods: {
    saveitem() {
      let that = this;
      (that.error = null),
        this.$axios
          .post(this.$url + "v1/dashboard/modestyle", this.save, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then(function (res) {
            location.href = that.localePath("/dashboard/Styles");
          })
          .catch((error) => {
            //  that.error=error.response.data.message;
            that.error = error.response;
          });
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>
