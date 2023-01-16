<template>
  <div class="ma-5 myitem align-center" >
    <v-card class="pa-5  align-center">
     <strong>{{  $t('Login User') }}</strong>
      <form @submit.prevent="login">
        <v-text-field :placeholder="$t('Email')" v-model="user.email"></v-text-field>
        <v-text-field :placeholder="$t('Password')" type="password" v-model="user.password"></v-text-field>
        <v-btn  type="submit">{{ $t('Login')}}</v-btn>
      </form>
      <v-alert
         v-if="error!=null"
        type="error"
      >{{ $t(error) }}</v-alert>
    </v-card>

  </div>
</template>

<script>
const qs = require('qs');
export default {
  name: "login",
  layout:'login',
  data() {
    return {
      location:'bgtop',
      token:null,
      user:{
        email:null,
        password:null
      },
      error:null,
      type:'password'
    }
  },
  methods:{
    login(){
      let that=this;
      this.$axios.post(this.$url+'v1/auth',qs.stringify(this.user))
        .then(function (response) {
          that.token=response.data.token;
        } ) .catch((error) => {
          that.error=error.response.data.message;

      });
    },
  },
  watch: {
    token(newName) {

      localStorage.token ='Bearer '+newName;
      if(localStorage.token){
        location.href='/dashboard';
      }
    }
  },
  mounted() {


    if (localStorage.token) {
      location.href='/dashboard';

    }
  }
}
</script>

<style scoped>
.myitem{
  max-width: 300px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}
</style>
