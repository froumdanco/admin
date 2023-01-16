<template>
  <div>
    <div class="ma-3">
      <v-btn @click="saveitem">{{ $t('Save') }}</v-btn>

    </div>
    <imagemanager  v-on:myevent="addtogallery" component="vgallery" :id="data.id"></imagemanager>
 <template v-if="data.data.image!==undefined">
      <div >
        <v-row>
          <v-col cols="12" md="2" v-for="(item,index) in data.data.image" :key="index">
            <div>
              <img :src="$domain+item" width="100%" height="200"  />

            </div>
            <v-btn @click="deleteitem(index)">{{ $t('delete') }}</v-btn>
          </v-col>
        </v-row>
      </div>
 </template>
  </div>
</template>

<script>
import imagemanager from "~/components/imagemanager";
export default {
  components:[imagemanager],
  name: "vgallery",
  props:['data'],
  methods:{
    saveitem(){
      let that=this;
      this.data.mode="update";
      this.$axios.put(this.$url+'v1/dashboard/component/'+this.data.id,this.data,{

        headers: {
          Authorization:localStorage.token
        }
      }).then(function (res){
        that.$emit('event');

      });
      this.$emit('myevent','f');

    },
    deleteitem(e){
      this.data.data.image.splice(e,1);
      this.$forceUpdate();
    },
    addtogallery(e){
      let mydata=this.data.data.image;
      if(mydata===undefined){
        mydata=[];
        mydata.push(e);
        this.data.data.image=mydata;
        this.$forceUpdate();
      }else{
        mydata.push(e);
        this.data.data.image=mydata;
        this.$forceUpdate();
      }


    }
  }

}
</script>

<style scoped>

</style>
