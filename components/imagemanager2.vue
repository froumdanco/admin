<template>
  <div>
    <v-dialog v-model="dialog" width="70vm">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">{{
          $t("edit")
        }}</v-card-title>

        <v-card-text>
          <v-form @submit.prevent="savedetail">
            <v-text-field
              :label="$t('title')"
              v-model="edit.title"
            ></v-text-field>
            <v-text-field
              :label="$t('description')"
              v-model="edit.description"
            ></v-text-field>

            <!-- <ckeditor
              :key="123"
              v-model="edit.text"
              :config="editorConfig"
            ></ckeditor>-->
            <imagemanager
              :id="edit._id"
              :text="edit.text"
              :detail="true"
              component="imagemanager"
            ></imagemanager>
            <v-text-field
              dir="ltr"
              :label="$t('code')"
              v-model="edit.link"
            ></v-text-field>
            <ul class="text-right" v-if="colors != null">
              <template v-if="colors != null">
                <v-combobox
                  v-model="edit.colors"
                  :items="colors.message.docs"
                  :label="$t('رنگ')"
                  multiple
                  dense
                >
                  <template
                    v-slot:selection="{ attrs, item, parent, selected }"
                  >
                    <v-chip :index="index"
                      >{{ item.name }}
                      <v-icon small @click="parent.selectItem(item)">
                        $delete
                      </v-icon>
                    </v-chip>
                  </template>
                  <template v-slot:item="{ index, item }">
                    <v-chip class="ma-1" :index="index">{{ item.name }}</v-chip>
                  </template>
                </v-combobox>
              </template>
            </ul>
            <ul class="text-right" v-if="styles != null">
              <template v-if="styles != null">
                <v-combobox
                  v-model="edit.stylework"
                  :items="styles.message.docs"
                  :label="$t('استایل')"
                  multiple
                  dense
                >
                  <template
                    v-slot:selection="{ attrs, item, parent, selected }"
                  >
                    <v-chip :index="index"
                      >{{ item.name }}
                      <v-icon small @click="parent.selectItem(item)">
                        $delete
                      </v-icon>
                    </v-chip>
                  </template>
                  <template v-slot:item="{ index, item }">
                    <v-chip class="ma-1" :index="index">{{ item.name }}</v-chip>
                  </template>
                </v-combobox>
              </template>
            </ul>
            <v-btn type="submit" v-text="$t('save')"></v-btn>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">{{
            $t("close")
          }}</v-btn>
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
        <v-simple-table dark>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-right">Name</th>
                <th class="text-center">Image</th>
                <th class="text-center">Edit</th>
                <th class="text-center">Deleted</th>
                <th class="text-center">Barcode</th>
                <th class="text-center">Order</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i, index) in filelist.message" cols="2" :key="index">
                <td class="pa-4 text-center">
                  <v-img
                    :src="$url + i['path'] + '/thump/' + i['name']"
                    height="100"
                    width="150"
                    class="grey darken-4"
                  ></v-img>
                </td>
                <td class="text-center">
                  <v-btn
                    class="primary"
                    @click="edititem(index)"
                    v-if="detail == true"
                  >
                    <v-icon small class="mr-2">mdi-pencil</v-icon>
                  </v-btn>
                </td>
                <td class="text-center">
                  <v-btn
                    class="primary"
                    @click="deleteimage(i)"
                    v-if="detail == true"
                  >
                    <v-icon small class="mr-2">mdi-delete</v-icon>
                  </v-btn>
                </td>
                <td class="text-center">
                  <img :src="i.barcode" width="100" />
                </td>
                <td class="text-center"></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
      colors: null,
       styles: null,
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
        .get(this.$url + "v1/dashboard/colors", {
          params: {
            limit: 100,
            page: this.page,
          },
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then(function (res) {
          that.colors = res.data;
        });
          this.$axios
        .get(this.$url + "v1/dashboard/modestyle", {
          params: {
            limit: 100,
            page: this.page,
          },
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then(function (res) {
          that.styles = res.data;
        });
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
          that.dialog = false;
        });
    },
    upload() {
      let that = this;
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("component", this.component);
      formData.append("parent", this.id);
      formData.append("barcode", true);

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