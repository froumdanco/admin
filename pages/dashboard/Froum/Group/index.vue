<template>
  <div>
    <h3>Subjects</h3>
    <hr />
    <div class="Container">
      <v-card class="card p-1 col-sm-12 col-xs-12">
        <v-btn to="/dashboard/Froum/Group/Add" class="mb-3">
          <v-icon class="ma-1">mdi-plus</v-icon>Add Group
        </v-btn>
        <v-btn @click="loaditem" class="mb-3">
          <v-icon class="ma-1">mdi-refresh</v-icon>Relaod
        </v-btn>
        <template v-if="list!=null">
          <v-data-table
            hide-default-footer
            :headers="headers"
            :items="list.message.docs"
            class="elevation-1"
          >
            <template v-slot:item.Deleted="{ item }">
              <span @click="deleteitem(item['id'])">
                <v-icon small class="mr-2">mdi-delete</v-icon>
              </span>
            </template>
          
            <template v-slot:item.Edit="{ item }">
              <a :href="`/dashboard/Froum/Subjects/${item._id}`">
                <v-icon small class="mr-2">mdi-pencil</v-icon>
              </a>
            </template>
          </v-data-table>
        </template>
      </v-card>
    </div>
  </div>
</template>

          </v-card>
   </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: null,
      headers: [
        {
          text: "name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "description", value: "description" },
        { text: "Edit", value: "Edit" },
        { text: "Deleted", value: "Deleted" }
      ]
    };
  },
  methods: {
    deleteitem(id) {
      let that = this;
      this.$axios
        .delete(this.$url + "v1/dashboard/fgroup/" + id, {
          headers: {
            Authorization: localStorage.token
          }
        })
        .then(function(res) {
          that.loaditem();
        });
    },
    loaditem() {
      let that = this;
      this.$axios
        .get(this.$url + "v1/dashboard/fgroup", {
          params: {
            limit: 100,
            group: this.group,
            page: this.page
          },
          headers: {
            Authorization: localStorage.token
          }
        })
        .then(function(res) {
          that.list = res.data;
        });
    }
  },
  mounted() {
    this.loaditem();
  }
};
</script>

<style>
</style>