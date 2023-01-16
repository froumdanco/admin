<template>
  <div>
    <template v-if="edit!=null">
      <v-form @submit.prevent="save">

        <v-card color="basil">
          <v-card-title class=" justify-center ">
            <h4>
              {{ $t('Edit Article') }} {{  edit.name }} {{ $t('in') }} {{ $t($route.params.lang) }}

            </h4>
          </v-card-title>



        </v-card>
        <v-text-field requied :label="$t('name')" v-model="edit.name" > </v-text-field>
        <v-text-field requied :label="$t('url')" v-model="edit.url" > </v-text-field>

        <v-btn type="submit">{{ $t('Save') }}</v-btn>

      </v-form>

      <error-show :err="error"></error-show>

    </template>
  </div>
</template>

<script>
import ErrorShow from "~/components/ErrorShow";
export default {
  name: "EditGroup",
  components: {ErrorShow},


  data(){
    return{
      file:null,
      tab:null,

      edit:null,
      tags:null,
      error:null,
      groups:null,
      items: [],

    }
  },
  watch: {
    // whenever question changes, this function will run
    tags: function (newQuestion, oldQuestion) {
      for(const  i in newQuestion){
        this.items.push(newQuestion[i].name);
      }
    },
    // whenever question changes, this function will run
    edit: function (newQuestion, oldQuestion) {
      if(this.$lang!=this.$route.params.lang){
        if(typeof this.edit[this.$route.params.lang] !== 'undefined'){
          this.edit.name=this.edit[this.$route.params.lang]['name'];
        }
      }
    }
  },
  methods:{
    mergemovie(){

    },
    doSomething(e){
      this.edit.text=e;
    },

    save(){
      let that=this;
      this.edit.lang=this.$route.params.lang;
      this.edit.defalang=this.$lang;

      this.$axios.put(this.$url+'v1/dashboard/menugroup/'+this.$route.params.id,this.edit,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        location.href=that.localePath('/dashboard/Menus/');

      }).catch((error) => {
        that.error=error.response;
      });

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/menugroup/'+this.$route.params.id,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        that.edit=res.data.message;
      }).catch((error) => {
        that.error=error.response;
      });

    },

  },
  mounted(){
    this.loaditem();
  }
}
</script>

<style scoped>

</style>
