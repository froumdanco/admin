<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
                CHECK YOUR ACCOUNT
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      token: null,

    }
  },
  watch: {
    token(newName) {

      if (!localStorage.token) {
        this.$router.push({name: '/login'});
      }
      if (localStorage.token) {``
        this.$router.push({name: '/dashboard'});
      }
    }
  },
  mounted() {

    if (!localStorage.token) {
      location.href='/login';

      this.$router.push({name: '/login'});
    }
    if (localStorage.token) {
      location.href='/dashboard';

    }
  }
}
</script>
