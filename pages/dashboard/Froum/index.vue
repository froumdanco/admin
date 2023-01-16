<template>
  <div class="continaer">
    <h3>Froum Managmnet</h3>
    <hr />
    <v-row class="row mt-4">
      <v-col cols="12" md="3" v-for="(item,index) in menus" :key="index">
        <a :href="`/dashboard/Froum${item.url}`">
          <v-card class="card p-1 col-sm-12 col-xs-12">
            <v-icon class="ma-1">{{ item.icon }}</v-icon>
            | {{ item.name }}
          </v-card>
        </a>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          name: "Users",
          url: "/usermanegment",
          icon: "mdi-account"
        }
        ,
        {
          name: "Group",
          url: "/Group",
          icon: "mdi-folder"
        },
        {
          name: "Subjects",
          url: "/Subjects",
          icon: "mdi-forum"
        }
      ]
    };
  }
};
</script>

<style>
</style>