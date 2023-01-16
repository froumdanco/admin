<template>
  <div>
    <div>
      <v-btn :to="this.localePath('/dashboard/BlogGroup/new')" >{{ $t('New Group') }}</v-btn>
      <v-btn class="success" @click="loaditem">{{ $t('Reload') }} </v-btn>
    </div>
    <template v-if="list!=null">
      <v-data-table
        hide-default-footer

        :headers="headers"
        :items="list.message"
        :items-per-page="15"
        class="elevation-1"
      >
        <template v-slot:item.Edit="{ item }">

          <template v-for="(lang,index) in $i18n.locales">
            <a class="v-btn btn"  :href="localePath('/dashboard/BlogGroup/Edit/'+lang.code+'/'+item._id)" small >
              <v-icon   small     class="mr-2"      > mdi-pencil </v-icon>
              <span  style="color: #333333;" >
                              {{ $t(lang.code) }}

              </span>
            </a>
          </template>
        </template>
        <template v-slot:item.Deleted="{ item }">
          <span   @click="deleteitem(item['id'])">
                      <v-icon   small     class="mr-2"   > mdi-delete </v-icon>

          </span>

        </template>
        <template v-slot:item.Insert="{ item }">
          <v-icon   small     class="mr-2"    @click="edit(item)"  > mdi-file-document </v-icon>
        </template>

      </v-data-table>
    </template>
    <ErrorShow :err="error"></ErrorShow>

  </div>
</template>

<script>
import ErrorShow from "~/components/ErrorShow";
export default {
  components: {ErrorShow},
    data(){
      return{
        error:null,
        headers: [
          {
            text: this.$t('name'),
            align: 'start',
            sortable: false,
            value:  'name',
          },
          { text: this.$t('url'), value: 'url' },
          { text: this.$t('Edit'), value: 'Edit' },
          { text: this.$t('Insert Article'), value: 'Insert' },
          { text: this.$t('Deleted'), value: 'Deleted' },
        ],
        list:null,

      }
    },
  methods:{
      edit(item){

      },
    deleteitem(id){
      let that=this;
      this.$axios.delete(this.$url+'v1/dashboard/bloggroup/'+id,{
        headers:{
          Authorization:localStorage.token
        }
      })
        .then(function (res){
          that.loaditem();
        }).catch((error) => {
        that.error= error.response;

        that.$forceUpdate();
      });
    },
          loaditem(){
              let that=this;
              this.$axios.get(this.$url+'v1/dashboard/bloggroup',{
                headers:{
                  Authorization:localStorage.token,
                  lang:this.$lang
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
