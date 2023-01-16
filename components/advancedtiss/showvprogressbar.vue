<template>
  <div>
    <div v-if="data.data.progress!==undefined"  :key="data.id">
      <v-card
        class="mx-auto"

      >
        <v-card-text>
          <p class="text-h4 text--primary">
            {{ data.data.progress.title }}
          </p>
          <div class="text--primary">
                <template v-for="(i,index) in data.data.progress.item">
                  <v-progress-linear
                    class="mt-2"
                    :color="i.color"
                    height="20"
                    :value="i.percent"
                    striped
                    :indeterminate="false"
                    :query="true"

                  >
                    <template v-slot:default="{ value }">
                      <strong>{{ Math.ceil(value) }}%  {{ $t(i.title)}} </strong>
                    </template>

                  </v-progress-linear>
                </template>
          </div>
        </v-card-text>

      </v-card>
    </div>
    </div>
</template>

<script>
export default {

    name: "showvprogressbar",
    props:['data'],

}
</script>

<style scoped>

</style>
