<template>
  <div>
    <v-btn @click="reloadcomponent" class="btn v-btn ma-3" color="secondary"
      >{{ $t("reload") }}
    </v-btn>
    <v-row>
      <v-col cols="12" xs="12" lg="12">
        <v-row>
          <v-col cols="6" md="2" v-for="(item, index) in section" :key="index">
            <v-btn
              @click="openmodal(item)"
              class="btn v-btn"
              style="width: 100%"
              color="primary"
            >
              <v-row>
                <v-col cols="4">
                  <img
                    width="20px"
                    style="filter: invert()"
                    :src="'/icons/' + item.icon"
                  />
                </v-col>
                <v-col cols="8" style="font-size: 10px; padding-top: 20px">
                  {{ $t(item.name) }}
                </v-col>
              </v-row>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div style="background-color: #fff; color: #333333">
      <v-row v-if="listofcomponent != null">
        <v-col
          v-for="(item, index) in listofcomponent.message"
          :key="index"
          cols="12"
          :md="item.cols"
        >
          <v-system-bar color="grey darken-2 pa-2">
            <v-spacer></v-spacer>
            <div
              v-if="item.cols != 3"
              class="float-right ma-4"
              style="color: #fff"
              v-text="item.mode"
            ></div>
            <v-btn
              x-small
              class="ma-1"
              @click="
                showhide[item.id] != true
                  ? (showhide[item.id] = true)
                  : (showhide[item.id] = false);
                $forceUpdate();
              "
            >
              <v-icon v-if="showhide[item.id] != true"
                >mdi-pencil-outline</v-icon
              >
              <v-icon v-if="showhide[item.id] == true">mdi-eye</v-icon>
            </v-btn>
            <v-btn x-small class="ma-1" @click="deleteitem(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn x-small class="ma-1" @click="ordered('up', item)">
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn x-small class="ma-1" @click="ordered('down', item)">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn
              x-small
              @click="changelayout(6, item._id)"
              v-if="item.cols == 12"
            >
              <v-icon>mdi-panorama-wide-angle</v-icon>
            </v-btn>
            <v-btn
              x-small
              @click="changelayout(3, item._id)"
              v-if="item.cols == 6"
            >
              <v-icon> mdi-book-open</v-icon>
            </v-btn>
            <v-btn
              x-small
              @click="changelayout(2, item._id)"
              v-if="item.cols == 3"
            >
              <v-icon>mdi-view-column</v-icon>
            </v-btn>

            <v-btn
              x-small
              @click="changelayout(8, item._id)"
              v-if="item.cols == 2"
            >
              <v-icon> mdi-view-quilt</v-icon>
            </v-btn>
            <v-btn
              x-small
              @click="changelayout(4, item._id)"
              v-if="item.cols == 8"
            >
              <v-icon> mdi-view-quilt</v-icon>
            </v-btn>
            <v-btn
              x-small
              @click="changelayout(12, item._id)"
              v-if="item.cols == 4"
            >
              <v-icon>mdi-view-quilt</v-icon>
            </v-btn>
          </v-system-bar>
          <v-card-text class="white" style="color: #000">
            <v-card class="pa-1" v-if="showhide[item.id] != true">
              <component
                v-on:event="reloadcomponent"
                :data="item"
                :key="item.id"
                :is="'show' + item.mode"
              ></component>
            </v-card>
            <v-card class="pa-1" v-if="showhide[item.id] == true">
              <v-card-title class="text-h5 grey lighten-2">
                {{ $t(item.name) }}
              </v-card-title>
              <component
                v-on:myevent="doSomething2"
                :key="item.id + 100"
                :data="item"
                :is="item.mode"
              ></component>
            </v-card>
          </v-card-text>
        </v-col>
      </v-row>
    </div>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ $t(modal.title) }}
        </v-card-title>

        <component
          v-on:myevent="doSomething2"
          :key="modal.id"
          :data="modal"
          :is="modal.component"
        ></component>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            {{ $t("close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import vtexteditor from "~/components/advancedtiss/vtexteditor";
import showvtexteditor from "~/components/advancedtiss/showvtexteditor";
import vgallery from "~/components/advancedtiss/vgallery";
import showvgallery from "~/components/advancedtiss/showvgallery";
import vmaps from "~/components/advancedtiss/vmaps";
import showvmaps from "~/components/advancedtiss/showvmaps";
import vcarousel from "~/components/advancedtiss/vcarousel";
import showvcarousel from "~/components/advancedtiss/showvcarousel";
import vmovieplayer from "~/components/advancedtiss/vmovieplayer";
import showvmovieplayer from "~/components/advancedtiss/showvmovieplayer";
import vprogressbar from "~/components/advancedtiss/vprogressbar";
import showvprogressbar from "~/components/advancedtiss/showvprogressbar";
export default {
  name: "advancedtisseditor",
  props: ["component", "id"],
  components: {
    vtexteditor,
    showvtexteditor,
    vgallery,
    showvgallery,
    vmaps,
    showvmaps,
    vcarousel,
    showvcarousel,
    vmovieplayer,
    showvmovieplayer,
    vprogressbar,
    showvprogressbar,
  },
  methods: {
    doSomething2() {
      this.dialog = false;
      this.reloadcomponent();
    },
    openmodal(e) {
      let that = this;
      this.$axios
        .post(
          this.$url + "v1/dashboard/component",
          {
            component: this.component,
            parent: this.id,
            mode: e.component,
            id: null,
          },
          {
            headers: {
              Authorization: localStorage.token,
            },
          }
        )
        .then(function (res) {
          that.reloadcomponent();
        });
    },
    editmodals(e) {
      //  this.dialog = true;
      this.modal.title = e.name;
      this.modal.component = e.mode;
      this.modal.data = e.data;
      this.modal.key = this.modal.key + 1;
      this.modal.id = e.id;
      this.modal.parent = this.id;
      this.modal.info = e;
    },
    ordered(event, item) {
      let that = this;
      let data = {
        item: item.id,
        mode: event,
      };
      this.$axios
        .put(this.$url + "v1/dashboard/component/" + item.id, data, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then(function (res) {
          that.reloadcomponent();
        });
    },
    changelayout(e, id) {
      let that = this;
      let data = {
        cols: e,
        mode: "changelayout",
      };
      this.$axios
        .put(this.$url + "v1/dashboard/component/" + id, data, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then(function (res) {
          that.reloadcomponent();
        });
    },
    reloadcomponent() {
      let that = this;
      this.$axios
        .get(this.$url + "v1/dashboard/component/", {
          params: {
            parent: this.id,
          },
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then(function (res) {
          that.listofcomponent = res.data;
        });
    },
    deleteitem(id) {
      let that = this;
      this.$axios
        .delete(this.$url + "v1/dashboard/component/" + id, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then(function (res) {
          that.reloadcomponent();
        });
    },
  },
  data() {
    return {
      showhide: {},
      dialog: false,
      listofcomponent: null,
      modal: {
        title: null,
        component: null,
        key: 0,
        id: null,
      },
      section: [
        { name: "texteditor", icon: "textarea.png", component: "vtexteditor" },
        { name: "gallery", icon: "gallery.png", component: "vgallery" },
        { name: "maps", icon: "maps.png", component: "vmaps" },
        { name: "carousel", icon: "carousel.png", component: "vcarousel" },
        {
          name: "movieplayer",
          icon: "movie-player.png",
          component: "vmovieplayer",
        },
        {
          name: "progressbar",
          icon: "progress-bar.png",
          component: "vprogressbar",
        },
      ],
    };
  },
  mounted() {
    this.reloadcomponent();
  },
};
</script>

<style scoped>
</style>
