<template>
  <div>
    <v-form @submit.prevent="saveitem" v-if="data!=null">
      <v-row>
        <v-col cols="12">
          <h3>{{ $t('Edit User') }}</h3>
          <hr />
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-text-field v-model="data.name" :label="$t('name')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-text-field v-model="data.lastname" :label="$t('family')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-text-field v-model="data.email" dir="ltr" :label="$t('email')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-text-field v-model="data.phone" dir="ltr" :label="$t('phone')"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-select v-model="data.usertype" :items="item" item-text="label" item-value="key"></v-select>
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-select v-model="data.staff" :items="m" item-text="label" item-value="key"></v-select>
        </v-col>
        <v-col cols="12" md="12" lg="12">
          <v-btn type="submit">{{ $t('update') }}</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <!-- <pre>{{ error}}</pre> -->
    <ErrorShow :err="error"></ErrorShow>
  </div>
</template>

<script>
export default {
  name: "edituser",
  data() {
    return {
      error: null,
      m: [
        {
          label: this.$t("staff"),
          key: true
        },
        {
          label: this.$t("normal"),
          key: false
        }
      ],
      item: [
        {
          label: this.$t("admin"),
          key: 1
        },
        {
          label: this.$t("user"),
          key: 2
        }
      ],

      data: null
    };
  },
  methods: {
    saveitem() {
      let that = this;
      (that.error = null),
        this.$axios
          .put(
            this.$url + "v1/dashboard/usersedit/" + this.$route.params.id,
            this.data,
            {
              headers: {
                Authorization: localStorage.token
              }
            }
          )
          .then(function(res) {
            location.href = that.localePath("/dashboard/Froum/usermanegment");
          })
          .catch(error => {
            that.error = error.response;
          });
    },
    loaditem() {
      let that = this;
      this.$axios
        .get(this.$url + "v1/dashboard/usersedit/" + this.$route.params.id, {
          headers: {
            Authorization: localStorage.token
          }
        })
        .then(function(res) {
          that.data = res.data.message;
        });
    }
  },
  mounted() {
    this.loaditem();
  }
};
</script>

<style scoped>
</style>
