<template>
  <div>
    <div>
      <v-btn :to="localePath('/dashboard/customer/new')">{{ $t('New Customer') }}</v-btn>
      <v-btn class="success" @click="loaditem">{{ $t('Reload') }}</v-btn>
    </div>
    <template v-if="list!=null">

      <v-data-table
        hide-default-footer
        :headers="headers"
        :items="list.message"
        :items-per-page="150"
        class="elevation-1"
      >
        <template v-slot:item.Edit="{ item }">


          <a class="v-btn btn"   :href="localePath('/dashboard/customer/Edit/'+item._id)" small  >
            <v-icon   small     class="mr-2"      > mdi-pencil </v-icon>
            <span style="color: #333;">{{ $t('edit') }}</span>

          </a>

        </template>
        <template v-slot:item.Deleted="{ item }">
          <span  @click="deletetitem(item.id)">
                      <v-icon   small     class="mr-2"     > mdi-delete </v-icon>

          </span>


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
        { text:  this.$t('name'), value: 'url' },
        { text:   this.$t('website'), value: 'Group' },
        { text:   this.$t('phone'), value: 'tags' },

        { text: this.$t('Edit'), value: 'Edit' },
        { text:  this.$t('Deleted'), value: 'Deleted' },
      ],


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

    deletetitem(id){
      let that=this;
      this.$axios.delete(this.$url+'v1/dashboard/customer/'+id,{
        headers:{
          Authorization:localStorage.token
        }
      })
        .then(function (res){
          that.loaditem();
      });
    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/customer',
        {
          params: {
            limit:10,
            page:this.page,
          },
          headers:{
            Authorization:localStorage.token
          }
        }).then(function (res){
        that.list=res.data;
        that.$forceUpdate();
      });

    }
  },
  mounted(){
    this.loaditem();
    //this.loadgroup();
  }
}
</script>

<style>

</style>
