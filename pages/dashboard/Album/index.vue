<template>
  <div class="ma-4 pa-2">
    <h3>
      {{ $t("album") }}
      <span @click="loaditem()"><v-icon>mdi-reload</v-icon></span>
    </h3>
    <hr />
    <v-row class="mt-3">
      <v-col cols="12" md="3">
        <a :href="localePath('/dashboard/Album/new')">
          <div class="boxes mybox">
            <div>
              <v-icon class="iconsplus">mdi-plus-box</v-icon>
            </div>
          </div>
        </a>
      </v-col>
      <template v-if="loaddata != null">
        <v-col
          cols="12"
          md="3"
          v-for="(item, index) in loaddata.docs"
          :key="index"
        >
            <div class="boxes mybox">
              <div class="pa-5 ma-4">
                <!-- <pre>{{ item.mainimage }}</pre> -->
                <h3>{{ item.name }}</h3>
                <div>
                <i>{{ item.code }}</i>

                </div>

                <v-btn @click="deleteitem(item.id)">
                  <v-icon class="iconsplus2">mdi-trash-can</v-icon>
                </v-btn>
                <a :href="localePath(`/dashboard/Album/item/${item.id}`)">
                <v-btn>
                  <v-icon class="iconsplus2"  >mdi-pencil</v-icon>
                </v-btn>

                </a>
                <v-container>
                   <v-row> 
                  <v-col cols="6"><v-btn small @click="arrowleft(item.id)" ><v-icon>mdi-arrow-right</v-icon></v-btn></v-col>
                  <v-col cols="6" ><v-btn  small @click="arrowright(item.id)"  ><v-icon>mdi-arrow-left</v-icon></v-btn></v-col>
                </v-row>
                </v-container>
               
              </div>
            </div>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import { locale } from 'jalali-moment';

export default {
  data() {
    return {
      loaddata: null,
      page: 1,
    };
  },
  methods: {
    arrowleft(id){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/album/up/'+id,{
        headers:{
          Authorization:localStorage.token
        }
      }) .then(function(res){
          that.loaditem();
      });

    },
     arrowright(id){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/album/down/'+id,{
        headers:{
          Authorization:localStorage.token
        }
      }) .then(function(res){
          that.loaditem();
      });

    },
     deleteitem(id){
      let that=this;
      this.$axios.delete(this.$url+'v1/dashboard/album/'+id,{
        headers:{
          Authorization:localStorage.token
        }
      })
        .then(function (res){
          that.loaditem();
        });
    },
    loaditem() {
      let that = this;
      this.$axios
        .get(this.$url + "v1/dashboard/album", {
          params: {
            page: this.page,
            limit: 16,
          },
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then(function (res) {
          that.loaddata = res.data.message;
        });
    },
  },
  mounted() {
    this.loaditem();
  },
};
</script>

<style lang="scss">
.boxes {
  width: 100%;
  height: 300px;
  background-color: rgb(245, 245, 245);
  border: solid 3px rgb(202, 200, 200);
  border-radius: 10px;

  text-align: center;
  & a {
    text-decoration: none;
  }
  & .iconsplus {
    font-size: 70px;
    margin-top: 100px;
  }
}
.mybox {
  cursor: pointer;
}
</style>