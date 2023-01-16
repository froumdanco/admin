<template>
  <div>
    <div>
      <v-btn :to="localePath('/dashboard/Gallery/Edit')">{{ $t('New Group Gallery') }}</v-btn>
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
        <template v-slot:item.Edit="{ item }">
          <a :href="localePath('/dashboard/Gallery/EditGallery/'+item._id)">

            <v-icon   small     class="mr-2"    @click="edit(item)"  > mdi-pencil </v-icon>
          </a>
        </template>
        <template v-slot:item.Deleted="{ item }">
          <v-icon   small     class="mr-2"     > mdi-delete </v-icon>


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
        { text: this.$t('url'), value: 'url' },

        { text:this.$t('Insert Image'), value: 'Edit' },
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
    loadgroup(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/gallery',{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        that.groups=res.data;
      });

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/gallery',
        {
     params: {
        limit:10,
       group:this.group,
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
    this.loadgroup();
  }
}
</script>

<style>

</style>
