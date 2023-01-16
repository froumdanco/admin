<template>
  <div>
    <div class="ma-3">
      <v-btn @click="saveitem">{{ $t('Save') }}</v-btn>
      <div v-if="data.data.movie!==undefined"  :key="data.id">
        <pre>{{ data.data.movie['model'] }}</pre>
      <v-row>
        <v-col      cols="12"
                    lg="4"
                    md="4">
          <v-select

            @change="changed"
            v-model="data.data.movie['model']"
            :items="[
              {value:'aparat'},
              {value:'youtube'}

            ]"
            item-value="value"
            item-text="value"
            :label="$t('select Service')"
          ></v-select>
        </v-col>
        <v-col      cols="12"
                    lg="12"
                    md="12-">
        <v-text-field
          dir="ltr"

          cols="12"
          md="12"
          v-if="data.data.movie['model']=='youtube'"
          v-model="data.data.movie['youtube']" :label="$t('YouTubeLink')"></v-text-field>
        <v-text-field
          dir="ltr"
          cols="12"
          lg="12"
          md="12"
          v-if="data.data.movie['model']=='aparat'"
          v-model="data.data.movie['aparat']" :label="$t('Aparat Link')"></v-text-field>
        </v-col>

      </v-row>

      </div>
    </div>

  </div>
</template>

<script>
import imagemanager from "~/components/imagemanager";
export default {
  components:[imagemanager],
  name: "vmovieplayer",
  props:['data'],
  data(){
    return{
      mode:'youtube'
    }
  },
  methods:{
    changed(){
        this.$forceUpdate();
    },
    saveitem(){
      let that=this;
      this.data.mode="update";
      this.data.lang=this.$route.params.lang;
      this.data.defalang=this.$lang;

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
    if(this.data.data.movie===undefined){
      this.data.data.movie= {
      };
     this.$forceUpdate();
      // if(this.$lang!=this.$route.params.lang){
      //
      //   if(typeof this.data.info[this.$route.params.lang] !== 'undefined'){
      //
      //     this.data.data.movie=this.data.info[this.$route.params.lang]['movie'];
      //   }
      // }
    }

  }

}
</script>

<style scoped>

</style>
