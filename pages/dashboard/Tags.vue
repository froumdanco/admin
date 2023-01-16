<template>
  <div>
    <div>
      <v-btn class="success" @click="loaditem">{{ $t('Reload') }}</v-btn>
    </div>

    <template v-if="list!=null">

      <v-data-table
        hide-default-footer
        :headers="headers"
        :items="list.message.docs"
        :items-per-page="15"
        class="elevation-1"
      >
        <template v-slot:item.Deleted="{ item }">
          <v-icon   small     class="mr-2"  @click="deleted(item._id)"    > mdi-delete </v-icon>
        </template>
      </v-data-table>
      <v-pagination
        v-model="page"
        :length="list.message.totalPages"
      ></v-pagination>
    </template>
  </div>
</template>

<script>
export default {
  data(){
    return{
      page:1,
      group:null,
      headers: [
        {
          text: this.$t('name'),
          align: 'start',
          sortable: false,
          value: 'name',
        },

        { text: this.$t('Deleted'), value: 'Deleted' },
      ],
      groups:null,
      list:null

    }
  },
  watch:{
    page(newQuery, oldQuery) {
      this.loaditem();
    }
  },
  methods:{
    edit(item){

    },
    deleted(i){
      let that=this;
      this.$axios.delete(this.$url+'v1/dashboard/tags/'+i,
        {
         headers:{
            Authorization:localStorage.token
          }
        }).then(function (res){
        that.loaditem();
      });
    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/tags',
        {
          params: {
            limit:10,
            page:this.page
          },
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (res){
        that.list=res.data;
      });

    }
  },
  mounted(){
    this.loaditem();
  }
}
</script>

<style>

</style>
