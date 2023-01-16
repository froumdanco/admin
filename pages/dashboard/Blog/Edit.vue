<template>
  <div>
    <v-form @submit.prevent="saveitem">
      <h4>{{ $t('Create New Article')  }}</h4>
      <hr>
      <v-text-field :label="$t('name')" v-model="save.name" > </v-text-field>
      <v-text-field :label="$t('url')" v-model="save.url" > </v-text-field>
      <template v-if="group!=null">

        <v-select :label="$t('Group Select')" v-model="save.parent" :items="group['message']" item-text="name" item-value="_id" ></v-select>

      </template>
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
  watch: {
    'save.name': function (val) {
      this.save.url=this.changeUrl(this.save.name);
    }
  },
  data(){
    return{
      error:null,
      group:null,
      save:{
        name:null,
        url:null,
        parent:null
      }
    }
  },
  methods:{
    saveitem(){
      let that=this;
      that.error=null,

      this.$axios.post(this.$url+'v1/dashboard/blog',this.save,{
          headers:{
            Authorization:localStorage.token
          }
        })
        .then(function (res){
          console.log(res);
          location.href='/dashboard/Blog/';

        }).catch((error) => {
          //  that.error=error.response.data.message;
          that.error=error.response;
        });;
    },
    loadgroup(){
    let that=this;
     this.$axios.get(this.$url+'v1/dashboard/bloggroup',{ headers:{ Authorization:localStorage.token }}).then(function (res){ that.group=res.data });
    }

  },
  mounted() {
    this.loadgroup();
  }

}
</script>

<style scoped>

</style>
