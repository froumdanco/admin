<template>
    <div>
      <v-form>
        <v-row>
          <v-col cols="12">
            <h3>{{ $t('add User') }}</h3>
            <hr />
          </v-col>

          <v-col cols="12" md="6" lg="6">
            <v-text-field     v-model="data.name" :label="$t('name')"></v-text-field>

          </v-col>
          <v-col cols="12" md="6" lg="6">
            <v-text-field   v-model="data.lastname"  :label="$t('family')"></v-text-field>

          </v-col>
          <v-col cols="12" md="6" lg="6">

          <v-text-field    v-model="data.email" dir="ltr" :label="$t('email')"></v-text-field>
          </v-col>
          <v-col cols="12" md="6" lg="6">

          <v-text-field   v-model="data.password"  dir="ltr" :label="$t('password')"></v-text-field>
          </v-col>
          <v-col cols="12" md="6" lg="6">

          <v-text-field  v-model="data.phone"    dir="ltr" :label="$t('phone')"></v-text-field>
          </v-col>
          <v-col cols="12" md="6" lg="6">
          <v-select  v-model="data.rol"     :items="item" item-text="label" item-value="key"></v-select>
          </v-col>
          <v-col cols="12" md="12" lg="12">
            <v-btn @click="saveitem">{{ $t('add User') }}</v-btn>
          </v-col>


        </v-row>

      </v-form>
      <pre>{{ error}}</pre>
      <ErrorShow :err="error"></ErrorShow>
    </div>
</template>

<script>
import ErrorShow from "~/components/ErrorShow";
export default {
name: "index",
  components: {ErrorShow},
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
    data:{
      name:null,
      email:null,
      lastname:null,
      phone:null,
      password:null,
      rol:1


    }
  }
  },
  methods:{
    saveitem(){
      let that=this;
      that.error=null,
        this.$axios.post(this.$url+'v1/dashboard/usersedit',this.data,{
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (res){
          location.href=that.localePath('/dashboard/Users');

        }).catch((error) => {
          that.error=error.response;
        });;
    },


  },

}
</script>

<style scoped>

</style>
