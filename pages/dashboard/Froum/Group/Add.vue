<template>
  <div class="ma-3" dir="ltr">
    <h3>New Group</h3>
    <hr />
    <v-form @submit.prevent="saveitem">
      <v-text-field v-model="data.name" label="Name"></v-text-field>
      <v-textarea label="Description" v-model="data.description"></v-textarea>
      <v-btn color="primary" elevation="2" type="submit">Save</v-btn>
      <v-btn to="/dashboard/Froum/Subjects" color="secondary" elevation="2">Back</v-btn>
    </v-form>
    <pre>{{ list }}</pre>
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
      list: null,
      data: {}
    };
  },
  methods: {
    saveitem() {
      let that = this;
      (that.error = null),
        this.$axios
          .post(this.$url + "v1/dashboard/fgroup", this.data, {
            headers: {
              Authorization: localStorage.token
            }
          })
          .then(function(res) {
            location.href = "/dashboard/Froum/Group/";
          })
          .catch(error => {
            //  that.error=error.response.data.message;
            that.error = error.response;
          });
 
    },
    
  },
  mounted(){
   
  }
};
</script>

<style>
</style>