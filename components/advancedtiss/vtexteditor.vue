<template>
  <div class="pa-4">
    <div class="ma-3">
      <v-btn @click="saveitem">{{ $t("Save") }}</v-btn>
    </div>
    <ckeditor v-model="data.data.text" :config="editorConfig"></ckeditor>
    <v-card class="mt-4">
      <v-btn @click="loadfiles">Reload</v-btn>

      <v-file-input
        @change="upload"
        v-model="file"
        placeholder="Upload File"
      ></v-file-input>
      <template v-if="filelist != null">
        <v-row>
          <v-col v-for="(i, index) in filelist.message" :key="index" cols="2">
            <template>
              <v-img
                :src="$url + i['path'] + i['name']"
                height="125"
                class="grey darken-4"
              ></v-img>
              <div class="ma-2">
                <v-btn @click="inserttext(i)">
                  <v-icon small class="mr-2" @click="inserttext(i)">
                    mdi-plus
                  </v-icon>
                </v-btn>
              </div>
            </template>
          </v-col>
          ‍‍
        </v-row>
        <v-row class="w-100">
          <v-col cols="12" class="text-center pa-1">
            <v-btn @click="wall != true ? (wall = true) : (wall = false)"
              >عکس زمینه</v-btn
            >
          </v-col>
          ‍‍
          <v-col cols="12" v-if="wall == true">
            <imagemanager :id="data.id" component="wallarticle"></imagemanager>
          </v-col>
        </v-row>
      </template>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["data"],
  name: "vtexteditor",
  data() {
    return {
      wall: false,
      text: null,
      filelist: null,
      file: null,
      editorConfig: {
        allowedContent: true,
        extraPlugins: [
          "justify",
          "colorbutton",
          "autoembed",
          "balloontoolbar",
          "bidi",
          "font",
        ],
      },
    };
  },
  watch: {
    // whenever question changes, this function will run

    // whenever question changes, this function will run
    data: function (newQuestion, oldQuestion) {
      console.log(this.$lang);
    },
  },

  methods: {
    saveitem() {
      let that = this;
      this.data.mode = "update";
      this.data.lang = this.$route.params.lang;
      this.data.defalang = this.$lang;
      this.$axios
        .put(this.$url + "v1/dashboard/component/" + this.data.id, this.data, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then(function (res) {
          that.$emit("event");
        });
      this.$emit("myevent", "f");
    },
    inserttext(i) {
      let img = '<img width="50%" src="' + this.$domain + i.url + '"/>';
      this.data.data.text = this.data.data.text + img;
    },
    upload() {
      let that = this;
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("component", this.data.component);
      formData.append("parent", this.data.parent);
      this.$axios
        .post(this.$url + "v1/dashboard/filemanager", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.token,
          },
        })
        .then(function (res) {
          that.loadfiles();
        });
    },
    loadfiles() {
      let that = this;
      this.$axios
        .get(this.$url + "v1/dashboard/filemanager", {
          params: {
            component: this.data.component,
            parent: this.data.parent,
          },
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then(function (res) {
          that.filelist = res.data;
        });
    },
    
  },
  mounted() {
    this.loadfiles();
    // if (this.$lang != this.$route.params.lang) {
    //   if (typeof this.data.info[this.$route.params.lang] !== "undefined") {
    //     this.data.data.text = this.data.info[this.$route.params.lang]["text"];
    //   }
    // }
  },
};
</script>

<style scoped>
.w-100 {
  width: 100%;
}
</style>
