<template>
  <div>
   <template v-if="edit!=null">
    <v-form @submit.prevent="save">
      <h4>   {{ $t('Blog Group') }} {{  edit.name }} {{ $t('in') }} {{ $t($route.params.lang) }} </h4>
      <v-text-field v-model="edit.url" :label="$t('Url')"></v-text-field>
    <hr />

      <v-text-field v-model="edit.name" :label="$t('name')"></v-text-field>

      <label>{{ $t('Text') }}</label>
      <tisseditor
        :id="edit._id"
        :text="edit.text"
        component="bloggroup"
        v-on:myevent="doSomething"
      ></tisseditor>
      <v-text-field v-model="edit.title" :label="$t('title')"></v-text-field>

      <v-textarea v-model="edit.keywords" :label="$t('keywords')"></v-textarea>
      <v-textarea v-model="edit.description" :label="$t('description')"></v-textarea>
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
      edit:null,
      error:null,

    }
  },
  watch: {
    // whenever question changes, this function will run
    edit: function (newQuestion, oldQuestion) {
          if(this.$lang!=this.$route.params.lang){
            if(typeof this.edit[this.$route.params.lang] !== 'undefined'){
              this.edit.title=this.edit[this.$route.params.lang]['title'];
              this.edit.name=this.edit[this.$route.params.lang]['name'];
              this.edit.text=this.edit[this.$route.params.lang]['text'];
              this.edit.keywords=this.edit[this.$route.params.lang]['keywords'];
              this.edit.description=this.edit[this.$route.params.lang]['description'];

            }
          }
    }
  },
  methods:{
    createlang(e){
      console.log(e);
      if(!this.edit.otherlang){
        this.edit.otherlang={};
      }
    },
    currentlanguagr(e){
      if(e==this.currentlang){
        return '#333';
      }
    },
    doSomething(e){
      this.edit.text=e;
    },
    save(){
      let that=this;
      this.edit.lang=this.$route.params.lang;
      this.edit.defalang=this.$lang;
      this.$axios.put(this.$url+'v1/dashboard/bloggroup/'+this.$route.params.id,this.edit,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        location.href=that.localePath('/dashboard/BlogGroup/');

      }).catch((error) => {
        that.error=error.response;
      });

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/bloggroup/'+this.$route.params.id,{
        params:{
          defalang:this.$lang,

        },
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        that.edit=res.data.message;
      }).catch((error) => {
        that.error=error.response;
      });

    }
  },
  mounted(){
    this.loaditem();
  }
}
</script>

<style scoped>

</style>
