<template>
  <div><span @click="logout">Logout</span></div>
</template>

<script>
export default {
  name: "Logout",
  data() {
    return {}
  },
  methods:{
    logout(){
      let that=this;
      localStorage.removeItem('token');
      window.location.replace('/');
    }
  },
  mounted() {
    this.logout();
  }
}
</script>

<style scoped>

</style>
