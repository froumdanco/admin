<template>
  <div>
    <div>
      <v-btn :to="this.localePath('/dashboard/Menus/Edit')">{{ $t('Add Menu Group') }}</v-btn>
      <v-btn class="success" @click="loaditem">{{ $t('Reload') }} </v-btn>
    </div>
    <template v-if="list!=null">
      <v-data-table
        hide-default-footer
        :headers="headers"
        :items="list.message"
        class="elevation-1"
      >
        <template v-slot:item.Edit="{ item }">
          <template v-for="(lang,index) in $i18n.locales">
            <a :key="index" class="v-btn btn"  :href="localePath('/dashboard/Menus/Edit/'+lang.code+'/'+item._id)" small >
              <v-icon   small     class="mr-2"   style="color: #333333;"    > mdi-pencil </v-icon>
              <span style="color: #333333;"> {{ $t(lang.code) }}</span>
            </a>
          </template>
        </template>
        <template v-slot:item.Deleted="{ item }">
          <span   @click="deleteitem(item['id'])">

                <v-icon   small     class="mr-2"   > mdi-delete </v-icon>
          </span>
        </template>
        <template v-slot:item.Submenu="{ item }">
          <a :href="localePath('/dashboard/MenusDetail/'+item.id)"  >
              <v-icon   small     class="mr-2"   > mdi-format-align-justify </v-icon>
          </a>
         </template>
        <template v-slot:item.Group="{ item }">
          <span>{{ item['groups']['name'] }}</span>
        </template>
      </v-data-table>

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

        { text: this.$t('Edit'), value: 'Edit' },
        { text: this.$t('Submenu'), value: 'Submenu' },
        { text:  this.$t('Deleted'), value: 'Deleted' },
      ],
      groups:null,
      list:null

    }
  },
  watch:{
    page(newQuery, oldQuery) {
      this.loaditem();
    },


  },
  methods:{
    edit(item){

    },
    deleteitem(id){
      let that=this;
      this.$axios.delete(this.$url+'v1/dashboard/menugroup/'+id,{
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
      this.$axios.get(this.$url+'v1/dashboard/menugroup',
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
  }
}
</script>

<style>

</style>
