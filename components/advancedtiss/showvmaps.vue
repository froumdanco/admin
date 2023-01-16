<template>
    <div>
      <div v-if="data.data.map!==undefined">
          <l-map :zoom=13 :center="[47.413220, -1.219482]">
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
            <l-marker :lat-lng="[47.413220, -1.219482]"></l-marker>
          </l-map>

      </div>
    </div>
</template>

<script>
export default {
name: "showvmaps",
  props:['data'],
}
</script>

<style scoped>

</style>
