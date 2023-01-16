<template>
  <div>
    <div>
      <v-btn :to="this.localePath('/dashboard/Blog/Edit')">{{ $t('New Article') }}</v-btn>
      <v-btn class="success" @click="loaditem">{{ $t('Reload') }} </v-btn>
    </div>
    <div v-if="groups!=null">
      <v-select @change="loaditem" v-model="group" :items="groups.message" item-text="name" item-value="_id"></v-select>
    </div>
    <template v-if="list!=null">

      <v-data-table
        hide-default-footer

        :headers="headers"
        :items="list.message.docs"
        class="elevation-1"
      >
        <template v-slot:item.Edit="{ item }">

          <template v-for="(lang,index) in $i18n.locales">
            <a class="v-btn btn"  :href="localePath('/dashboard/Blog/BlogEditor/'+lang.code+'/'+item._id)" small >
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
        <template v-slot:item.Group="{ item }">
          <pre>{{ item['groups']['name'] }}</pre>

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
        { text:this.$t('Group') , value: 'Group' },
        { text:this.$t('Tags') , value: 'tags' },

        { text: this.$t('Edit'), value: 'Edit' },
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
      this.$axios.delete(this.$url+'v1/dashboard/blog/'+id,{
        headers:{
          Authorization:localStorage.token
        }
      })
        .then(function (res){
          that.loaditem();
        });
    },
    loadgroup(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/bloggroup',{
        headers:{
          Authorization:localStorage.token
        }
      }).then(function (res){
        that.groups=res.data;
      });

    },
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/blog',
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
