<template>
    <div>
      <carousel v-if="data.data.image!==undefined"  :key="data.id">

        <img v-for="(i,key) in data.data.image"  :key="key" :src="$domainsale+i" height="300">


      </carousel>
    </div>
</template>

<script>
export default {
  name: "showvgallery.vue",
  props:['data'],

}
</script>

<style scoped>

</style>
