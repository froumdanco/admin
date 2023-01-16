<template>
  <div class="ma-3" dir="ltr">
    <h3>Edit Subject</h3>
    <hr />
    <v-form @submit.prevent="saveitem">
      <v-text-field v-model="data.name" label="Name"></v-text-field>
      <v-textarea label="Description" v-model="data.description"></v-textarea>
      <template v-if="list!=null">
            <v-select :items="this.list.message.docs"
                v-model="data.group"
                require
                label="Select Group"
                item-text="name" item-value="id"
      ></v-select>
      </template>
      <v-btn color="primary" elevation="2" type="submit">Save</v-btn>
      <v-btn to="/dashboard/Froum/Subjects" color="secondary" elevation="2">Back</v-btn>
    </v-form>
    <error-show :err="error"></error-show>
  </div>
</template>
  
  <script>
import ErrorShow from "~/components/ErrorShow";
export default {
  name: "SuvjectEditor",
  components: { ErrorShow },

  data() {
    return {
      error: null,
      data: {},
      list:null
    };
  },
  methods: {
    loaditem() {
      let that = this;
      this.$axios
        .get(this.$url + "v1/dashboard/fsubject/" + this.$route.params.id, {
          headers: {
            Authorization: localStorage.token
          }
        })
        .then(function(res) {
          that.data = res.data.message;
        })
        .catch(error => {
          that.error = error.response;
        });
          this.$axios
        .get(this.$url + "v1/dashboard/fgroup", {
          params: {
            limit: 100,
            group: this.group,
            page: this.page
          },
          headers: {
            Authorization: localStorage.token
          }
        })
        .then(function(res) {
          that.list = res.data;
        });
    },
    saveitem() {
      let that = this;
      this.$axios
        .put(this.$url + "v1/dashboard/fsubject/" + this.data.id, this.data, {
          headers: {
            Authorization: localStorage.token
          }
        })
        .then(function(res) {
          location.href = "/dashboard/Froum/Subjects/";
        })
        .catch(error => {
          //  that.error=error.response.data.message;
          that.error = error.response;
        });
    }
  },
  mounted() {
    this.loaditem();
  }
};
</script>
  
  <style>
</style>