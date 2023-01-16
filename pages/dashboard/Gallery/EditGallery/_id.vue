<template>
  <div>
    <template v-if="edit!=null">
      <v-form @submit.prevent="save">
        <h4>{{ $t('Edit') }}  {{ edit.name }} </h4>
        <v-text-field v-model="edit.name" :label="$t('name')" ></v-text-field>
        <v-text-field v-model="edit.url" :label="$t('url')"  ></v-text-field>
        <div v-if="groups!=null">
          <v-select @change="loaditem" v-model="group" :items="groups.message" item-text="name" item-value="_id"></v-select>
        </div>
        <imagemanager
          :id="edit._id"
          :text="edit.text"
          :detail="true"
          component="blog"
          v-on:myevent="doSomething"
        ></imagemanager>

        <v-textarea v-model="edit.keywords" :label="$t('keywords')"  ></v-textarea>
        <v-textarea v-model="edit.description"  :label="$t('description')" ></v-textarea>
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
      groups:null,


    }
  },
  methods:{
    doSomething(e){
      this.edit.text=e;
    },
    save(){
      let that=this;
      this.$axios.put(this.$url+'v1/dashboard/gallery/'+this.$route.params.id,this.edit,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        location.href=that.localePath("/dashboard/gallery/");

      }).catch((error) => {
        that.error=error.response;
      });

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/gallery/'+this.$route.params.id,{
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
