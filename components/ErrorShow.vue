<template>
    <div>
      <template v-if="err!=null">
        <template v-if="err.status=='422'">
        <template v-if="err.data.message.errors">
            <template v-for="i in err.data.message.errors">
             <template v-if="i.name='ValidatorError'">
                  <pre>{{ $t(i.message) }}</pre>
             </template>

            </template>

        </template>
          <template v-else>

            <pre>{{ $t(err.data.message) }}</pre>

          </template>

        </template>
      </template>
    </div>
</template>

<script>
export default {
  name: "ErrorShow",
  props:['err']
}
</script>

<style scoped>

</style>
