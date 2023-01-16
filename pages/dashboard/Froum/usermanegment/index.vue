<template>
    <div>
      <div>
        <v-btn :to="localePath('/dashboard/Users/Edit')">{{ $t('Add User') }}</v-btn>
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
          <template v-slot:item.usertype="{ item }">
  
          <template v-if="item.usertype==1">{{ $t('admin') }}</template>
          <template v-if="item.usertype==2">{{ $t('user') }}</template>
  
          </template>
          <template v-slot:item.edit="{ item }">
            <a :href="localePath('/dashboard/Froum/usermanegment/Edit/'+item._id)">
              <v-icon   small     class="mr-2"     > mdi-table-edit </v-icon>
  
            </a>
          </template>
          <template v-slot:item.changepassword="{ item }">
            <a :href="localePath('/dashboard/Froum/usermanegment/'+item._id)">
  
            <v-icon   small     class="mr-2"     > mdi-key </v-icon>
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
          {
            text: this.$t('lastname'),
            align: 'start',
            sortable: false,
            value: 'lastname',
          }, {
            text: this.$t('staff'),
            align: 'start',
            sortable: false,
            value: 'staff',
          },
          {
            text: this.$t('email'),
            align: 'start',
            sortable: false,
            value: 'email',
          },
          { text: this.$t('rol'), value: 'usertype' },
  
          { text:this.$t('phone'), value: 'phone' },
          { text:this.$t('edit'), value: 'edit' },
          { text:this.$t('changepassword'), value: 'changepassword' },
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
  
      loaditem(){
        let that=this;
        this.$axios.get(this.$url+'v1/dashboard/usersedit',
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
  