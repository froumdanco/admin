<template>
  <div>
    <template v-if="edit!=null">
      <v-form @submit.prevent="save">
        <h4>{{ $t('Edit') }}  {{ edit.name }} </h4>
        <v-text-field v-model="edit.name" :label="$t('name')" ></v-text-field>
        <v-text-field type="color" v-model="edit.code" :label="$t('color')"  ></v-text-field>
    
  
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
  methods:{
    doSomething(e){
      this.edit.text=e;
    },
    save(){
      let that=this;
      this.$axios.put(this.$url+'v1/dashboard/colors/'+this.$route.params.id,this.edit,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        location.href=that.localePath("/dashboard/Colors/");

      }).catch((error) => {
        that.error=error.response;
      });

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/colors/'+this.$route.params.id,{
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
