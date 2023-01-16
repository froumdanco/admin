<template>
  <div>
    <v-form @submit.prevent="saveitem">
      <h4>{{  $t('Create New Group') }}</h4>
      <hr>
      <pre>{{ save.url }}</pre>
      <v-text-field :label="$t('name')" v-model="save.name" > </v-text-field>
      <v-text-field :label="$t('url')" v-model="save.url" > </v-text-field>
      <v-btn type="submit">{{ $t('Save') }}</v-btn>
    </v-form>
    <error-show :err="error"></error-show>
  </div>
</template>

<script>

import ErrorShow from "~/components/ErrorShow";
export default {
  name: "newgroup",
  components:{
    'error-show':ErrorShow
  },
  data(){
    return{
      error:null,
      save:{
        name:null,
        url:null
      }
    }
  },
  watch: {
    'save.name': function (val) {
      this.save.url=this.changeUrl(this.save.name);

    }
  },
  methods:{
    saveitem(){
      let that=this;
      that.error=null,
      this.$axios.post(this.$url+'v1/dashboard/bloggroup',this.save,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){

        location.href=that.localePath('/dashboard/BlogGroup/Edit/'+res.data.data._id);

      }).catch((error) => {
      //  that.error=error.response.data.message;
        that.error=error.response;
      });;
    }

  },
  mounted() {

  }

}
</script>

<style scoped>

</style>
