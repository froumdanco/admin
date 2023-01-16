<template>
  <div>
    <div
      class="wall pa-3"
      v-bind:style="{
        backgroundImage:
          typeof data.wallpaper != 'undefined' && data.wallpaper != null
            ? `url('${$storage + data.wallpaper.url}')`
            : 'url()',
      }"
      v-html="data.data.text"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  name: "showvtexteditor",
  mounted() {
    if (this.$lang != this.$route.params.lang) {
      if (typeof this.data[this.$route.params.lang] !== "undefined") {
        this.data.data.text = this.data[this.$route.params.lang]["text"];
        this.$forceUpdate();
      }
    }
  },
};
</script>

<style scoped>
.wall{
  background-position: right;
  background-size: contain;
}
</style>
