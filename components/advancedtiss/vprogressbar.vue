<template>
  <div>
    <div v-if="data.data.progress!==undefined"  :key="data.id">
      <v-btn @click="saveitem">{{ $t('Save') }}</v-btn>
      <v-text-field v-model="data.data.progress.title" :label="$t('tilte')"></v-text-field>
      <v-btn @click="add">{{ $t('add') }}</v-btn>
      <ul>
        <li v-for="(i,index) in data.data.progress.item"
           :key="index"
            class="mt-3"
        >
        <v-form>
          <v-row>
            <v-col cols="12" lg="4" md="4">
              <v-text-field  @change="changed" :label="$t('title')" v-model="data.data.progress.item[index]['title']"></v-text-field>

            </v-col>
            <v-col cols="12" lg="4" md="4">

            <v-text-field  @change="changed" :label="$t('value')" type="number" v-model="data.data.progress.item[index]['percent']"></v-text-field>

            </v-col>
            <v-col cols="12" lg="4" md="4">

            <v-color-picker
              :update="changed"
              v-model="data.data.progress.item[index]['color']"
              dot-size="19"
              mode="rgba"
              swatches-max-height="197"   ></v-color-picker>

            </v-col>
          </v-row>
      <div class="ma-2">
        <v-btn @click="changed" >{{ $t('update')}}</v-btn>
        <v-btn @click="deleteitem(index)" >{{ $t('delete')}}</v-btn>

      </div>
        </v-form>
          <v-progress-linear
            :color="i.color"
            height="20"
            :value="i.percent"
            striped
          >
            <template v-slot:default="{ value }">
              <strong>{{ Math.ceil(value) }}%  {{ $t(i.title)}} </strong>
            </template>

          </v-progress-linear>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "vprogressbar",
  props:['data'],
  methods:{
    changed(){
      this.$forceUpdate();
    },
     statusCounter(inputs) {

  return counter;
  },

add(){

      var add = {
        title:'',
        percent:'',
        color:'#333'
      };
  this.data.data.progress.item= this.data.data.progress.item.concat(add);

        this.$forceUpdate();
    },
    deleteitem(i){
        this.data.data.progress.item.splice(i,1);

    },
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
    if(this.data.data.progress===undefined){
      this.data.data.progress= {};
      if(this.data.data.progress.item===undefined){
        this.data.data.progress.item= [];
        //  this.$forceUpdate();
      };
      this.$forceUpdate();

    }
  }
}
</script>

<style scoped>

</style>
