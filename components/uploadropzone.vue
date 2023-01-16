<template>
    <div>
      <dropzone :key="key" id="foo" ref="el" :options="options"  v-on:vdropzone-success="aftertime" :destroyDropzone="true"></dropzone>
      <div v-if="video!=null" >
      <div v-if="video.message!=null" >
        <video  :key="key"  width="640" controls>
          <source :src="$storage+video.message.name" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      </div>


    </div>
</template>

<script>
export default {
name: "uploadropzone",
  props:['id','component'],
  data(){

  return{
    key:1,
    video:null,
   // my:null,
    options: {
      scrollable:true,
      width:'100%',
      minWidth:'100%',
      height:'20px',
      minHeight:'20px',
      resizable:true,
      acceptedFiles: ".mp4",
      chunking: true,
      chunkSize: 5000000,

      url: this.$url+'v1/dashboard/chunkfileuploader',
      maxFilesize: 1000.0,
      params:{
        chunking:true,
        uploadId:this.id,

      },

      dictDefaultMessage:this.$t('uploadyourfile'),
      headers: {
        Authorization:localStorage.token
      }
    }
    }
  },
  methods:{
    loaditem(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/chunkfileuploader',{
        params:{
          id:this.id
        },
        headers: {
          Authorization:localStorage.token
        }
      })  .then(function (res){
        that.video=res.data;
      });
    },
    aftertime(){
      let that=this;
      this.$axios.get(this.$url+'v1/dashboard/chunkfileuploader/'+this.id,{
        params:{
          component:this.component
        },
        headers: {
          Authorization:localStorage.token
        }
      })
      .then(function (res){
          that.key=that.key+1;
          that.loaditem();
      });
    }
  },
  mounted() {
   // this.my = this.$refs.el.dropzone
    this.loaditem();
  }
}
</script>

<style scoped>

</style>
