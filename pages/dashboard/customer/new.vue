<template>
  <div>
    <v-form @submit.prevent="saveitem">
      <h4>{{ $t('New Customer') }}</h4>
      <hr>
      <v-text-field :label="$t('name')" v-model="save.name" > </v-text-field>
      <v-text-field :label="$t('website')" v-model="save.website" > </v-text-field>
      <v-btn type="submit" color="green">{{ $t('Save') }}</v-btn>
      <v-btn to="/dashboard/Products/customer/" color="red">{{ $t('back') }}</v-btn>

    </v-form>
    <error-show :err="error"></error-show>
  </div>
</template>

<script>
import ErrorShow from "~/components/ErrorShow";
export default {
  name: "newpgroup",
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
        this.$axios.post(this.$url+'v1/dashboard/customer',this.save,{
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (res){
          location.href='/dashboard/customer/Edit/'+res.data.data._id;

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
