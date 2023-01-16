<template>
  <div>
    <h3>{{ $t("album create") }}</h3>
    <hr />
    <v-container>
      <div>
        <v-form @submit.prevent="save">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="formdata.name"
                :label="$t('name')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
              dir="ltr"
                v-model="formdata.code"
                :label="$t('code')"
              ></v-text-field>
            </v-col>
          <v-col cols="12" md="6">
                <v-btn type="submit">{{ $t("create") }}</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {},
      error:null
    };
  },
  methods:{
      save(){
      let that=this;
      that.error=null,

      this.$axios.post(this.$url+'v1/dashboard/album',this.formdata,{
          headers:{
            Authorization:localStorage.token
          }
        })
        .then(function (res){
          console.log(res);
          location.href='/dashboard/Album/';

        }).catch((error) => {
          //  that.error=error.response.data.message;
          that.error=error.response;
        });;
      }
  }
};
</script>

<style>
</style>