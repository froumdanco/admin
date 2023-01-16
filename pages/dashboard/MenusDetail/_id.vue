<template>
    <div>
      <v-btn @click="loaddata">{{ $t('reload') }}</v-btn>
        <pre>{{ menus }}</pre>
    </div>
</template>

<script>
export default {
  name: "index.vue",
  data(){
    return{
      menus:null
    }
  },
  methods:{
      loaddata(){
        let that=this;
        this.$axios.get(this.$url+'v1/dashboard/menugroup',{
          headers:{
            Authorization:localStorage.token
          }
      }).then(function (res){
          that.menus=res.data;
        });

      }
  },
  mounted() {
    this.loaddata();
  }
}
</script>

<style scoped>

</style>
