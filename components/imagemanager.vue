<template>
  <div>
    <v-dialog v-model="dialog" width="70vm">
      <template v-slot:activator="{ on, attrs }">
   
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ $t("edit") }}
        </v-card-title>

        <v-card-text>
          <v-form @submit.prevent="savedetail">
            <v-text-field :label="$t('title')" v-model="edit.title">
            </v-text-field>
            <v-text-field :label="$t('description')" v-model="edit.description">
            </v-text-field>

            <ckeditor
              :key="123"
              v-model="edit.text"
              :config="editorConfig"
            ></ckeditor>
            <v-text-field dir="ltr" :label="$t('link')" v-model="edit.link">
            </v-text-field>
            <v-text-field
              style="width: 100px"
              type="color"
              :label="$t('color')"
              v-model="edit.color"
            >
            </v-text-field>
            <v-btn type="submit" v-text="$t('save')"></v-btn>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"
            >{{ $t("close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card class="mt-4">
      <v-file-input
        @change="upload"
        v-model="file"
        placeholder="Upload File"
      ></v-file-input>

      <template v-if="filelist != null">
        <v-row>
          <v-col v-for="(i, index) in filelist.message"  cols="3" :key="index">
            <template>
              <v-img
                :src="$url + i['path'] + i['name']"
                height="125"
                class="grey darken-4"
              ></v-img>
              <div class="ma-2">
                <v-btn @click="inserttext(i)">
                  <v-icon small class="mr-2"> mdi-plus </v-icon>
                </v-btn>
                <v-btn class="danger" @click="deleteimage(i)">
                  <v-icon color="error" small class="mr-2"> mdi-delete </v-icon>
                </v-btn>
                <v-btn
                  class="primary"
                  @click="edititem(index)"
                  v-if="detail == true"
                >
                  <v-icon small class="mr-2"> mdi-pencil </v-icon>
                </v-btn>
              </div>
            </template>
          </v-col>
        </v-row>
      </template>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "tisseditor",
  props: {
    component: null,
    id: null,
    text: null,
    detail: false,
  },
  data() {
    return {
      editorConfig: {
        allowedContent: true,
        extraPlugins: [
          "justify",
          "colorbutton",
          "autoembed",
          "balloontoolbar",
          "bidi",
        ],
      },
      dialog: false,
      file: null,
      filelist: null,
      edit: {
        title: null,
        description: null,
        text: null,
        link: null,
        color: null,
      },
      form: {
        component: this.component,
        parent: this.id,
      },
    };
  },
  methods: {
    onEditorInput() {},
    inserttext(i) {
      this.$emit("myevent", i.url);

      // let img='<img src="'+this.$url+i.url+'"/>';
      //  this.text=this.text+img;
    },
    loadfiles() {
      let that = this;
      this.$axios
        .get(this.$url + "v1/dashboard/filemanager", {
          params: {
            component: this.component,
            parent: this.id,
          },
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then(function (res) {
          that.filelist = res.data;
          that.$forceUpdate();
        });
    },
    edititem(i) {
      this.dialog = true;
      this.edit = this.filelist.message[i];
    },
    deleteimage(i) {
      let that = this;
      console.log(i);
      this.$axios
        .delete(this.$url + "v1/dashboard/filemanager/" + i._id, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then(function (res) {
          that.loadfiles();
          that.dialog = false;
        });
    },
    savedetail() {
      let that = this;
      this.$axios
        .put(
          this.$url + "v1/dashboard/filemanager/edit/" + this.edit._id,
          this.edit,
          {
            headers: {
              Authorization: localStorage.token,
            },
          }
        )
        .then(function (res) {
          that.loadfiles();
          that.dialog=false;
        });
    },
    upload() {
      let that = this;
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("component", this.component);
      formData.append("parent", this.id);
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
  },
  mounted() {
    this.loadfiles();
  },
};
</script>

<style scoped>
</style>