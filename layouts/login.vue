<template>
  <v-app dark class="myitems">
    <v-container style="height: 100%;">
      <Nuxt />

    </v-container>
    <v-footer><small>TISS Ex 1.7    <a style="font-size:8px; color:#333;">Programming By Esmail Pouryousef</a>  </small> </v-footer>
   
  </v-app>
</template>

<script>
export default {
  name: "logins"
}
</script>

<style scoped>
.myitems{
  background-image: url("/wall.jpg");
  background-size: cover;
  background-position: center;
}
</style>
