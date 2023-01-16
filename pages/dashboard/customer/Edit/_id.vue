<template>
  <div>
    <v-form @submit.prevent="saveitem" v-if="save!=null">
      <h4 @click="loaddata">{{ $t('New Customer') }}</h4>
      <hr>
      <v-text-field :label="$t('name')" v-model="save.name" > </v-text-field>
      <v-text-field :label="$t('website')" v-model="save.website" > </v-text-field>
      <v-text-field :label="$t('phone')" v-model="save.phone" > </v-text-field>
      <v-text-field :label="$t('description')" v-model="save.text" > </v-text-field>
      <label>{{ $t('upload logo') }}</label>
      <imagemanager
        :id="save['id']"
        component="customers"
        :text="save.name"
        v-on:myevent="doSomething"

      ></imagemanager>

    <div class="mt-3">
      <v-btn type="submit" color="green">{{ $t('Save') }}</v-btn>
      <v-btn to="/dashboard/customer/" color="red">{{ $t('back') }}</v-btn>

    </div>

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
      save:null
    }
  },
  watch: {
    'save.name': function (val) {
      this.save.url=this.changeUrl(this.save.name);
    }
  },
  methods:{
    loaddata(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/customer/'+this.$route.params.id,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        that.save=res.data.message;
      });
    },
    saveitem(){
      let that=this;
      that.error=null,
        this.$axios.put(this.$url+'v1/dashboard/customer/'+this.$route.params.id,this.save,{
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (res){
          location.href='/dashboard/customer';

        }).catch((error) => {
          //  that.error=error.response.data.message;
          that.error=error.response;
        });;
    }

  },
  mounted() {
    this.loaddata();

  }

}
</script>

<style scoped>

</style>
