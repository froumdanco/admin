<template>
  <div dir="ltr">
    <carousel items="1" v-if="data.data.image !== undefined" :key="data.id">
      <img
        v-for="(i, key) in data.data.image"
        :key="key"
        :src="$url + '/' + i"
        height="500"
      />
    </carousel>
  </div>
</template>

<script>
export default {
  name: "showvgallery.vue",
  props: ["data"],
};
</script>

<style scoped>
</style>
