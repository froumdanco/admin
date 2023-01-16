<template>
  <div>

    <div v-if="data.data.movie!==undefined"  :key="data.id">
        <template v-if="data.data.movie.model=='aparat'">
          <client-only>
            <div :id="data.data.id" v-if="data.data.movie.aparat!=null">
              <div class="h_iframe-aparat_embed_frame"><span style="display: block;padding-top: 57%"></span><iframe
                :src="'https://www.aparat.com/video/video/embed/videohash/'+data.data.movie.aparat.split('/').pop() +'/vt/frame'"
                                                                                                                                                                                                                                                                                                                                                        allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe></div>
            </div>
          </client-only>

        </template>
      <template v-if="data.data.movie.model=='youtube'">
          <client-only>

            <iframe width="100%" height="500"
                    v-if="data.data.movie.youtube!=null"
                    :src="'https://www.youtube.com/embed/'+data.data.movie.youtube.split('/').pop()"
                    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </client-only>

        </template>


  </div>
  </div>


</template>

<script>
export default {
name: "showmovieplayer",
  props:['data'],
  mounted() {
    if(this.$lang!=this.$route.params.lang){

      if(typeof this.data[this.$route.params.lang] !== 'undefined'){

        this.data.data.movie=this.data[this.$route.params.lang]['text'];
        this.$forceUpdate();
      }
    }

  }
}
</script>

<style scoped>
.h_iframe-aparat_embed_frame{position:relative;}.h_iframe-aparat_embed_frame .ratio{display:block;width:100%;height:auto;}.h_iframe-aparat_embed_frame iframe{position:absolute;top:0;left:0;width:100%;height:100%;}
</style>
