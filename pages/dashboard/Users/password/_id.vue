<template>
  <div>
    <v-form @submit.prevent="saveitem" v-if="data!=null">
      <v-row>
        <v-col cols="12">
          <h3>{{ $t('changepassword') }}</h3>
          <hr />
        </v-col>

        <v-col cols="12" md="6" lg="6">
          <v-text-field  disabled readonly   v-model="data.name" :label="$t('name')"></v-text-field>

        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-text-field disabled  readonly v-model="data.lastname"  :label="$t('family')"></v-text-field>

        </v-col>
        <v-col cols="12" md="6" lg="6">

          <v-text-field disabled  readonly  v-model="data.email" dir="ltr" :label="$t('email')"></v-text-field>
        </v-col>

        <v-col cols="12" md="6" lg="6">

          <v-text-field disabled  readonly  v-model="data.phone"    dir="ltr" :label="$t('phone')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" lg="6">

          <v-text-field   v-model="password"    dir="ltr" :label="$t('newpassword')"></v-text-field>
        </v-col>
        <v-col cols="12" md="12" lg="12">
          <v-btn type="submit">{{ $t('update') }}</v-btn>
        </v-col>


      </v-row>

    </v-form>
    <pre>{{ error}}</pre>
    <ErrorShow :err="error"></ErrorShow>
  </div>
</template>

<script>
export default {
  name: "editpassworrd",
  data(){
    return{
      error:null,
      item:[
        {
          label:this.$t('admin'),
          key:1
        },
        {
          label:this.$t('user'),
          key:2
        },
      ],
      password:null,
      data:null
    }
  },
  methods:{
    saveitem(){
      let that=this;
      that.error=null,
        this.$axios.put(this.$url+'v1/dashboard/usersedit/changepassword/'+this.$route.params.id,{password:this.password},{
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (res){
          location.href=that.localePath('/dashboard/Users');

        }).catch((error) => {
          that.error=error.response;
        });;
    },
    loaditem(){

      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/usersedit/'+this.$route.params.id,{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        that.data=res.data.message;
      });

    }
  },
  mounted() {
    this.loaditem();
  }

}
</script>

<style scoped>

</style>
