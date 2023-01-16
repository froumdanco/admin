<template>
  <div>
    <div class="ma-3">
      <v-btn @click="saveitem">{{ $t('Save') }}</v-btn>

      <template v-if="data.data.map!==undefined">
        <v-form class="mt-3" style="background-color: #333333;"  >
          <v-row >
            <v-text-field class="ma-4" cols="4" dir="ltr"  label="lat" v-model="data.data.map['lat']"></v-text-field>
            <v-text-field class="ma-4" cols="4"  dir="ltr" label="lng" v-model="data.data.map['lng']"></v-text-field>
            <v-text-field class="ma-4" cols="4" dir="ltr" label="zoom" v-model="data.data.map['zoom']"></v-text-field>

          </v-row>
        </v-form>
        <pre>{{ data }}</pre>
      </template>
    </div>

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


  },
  mounted() {
    if(this.data.data.map===undefined){
      this.data.data.map= {};
      this.$forceUpdate();
    }
  }

}
</script>

<style scoped>

</style>
