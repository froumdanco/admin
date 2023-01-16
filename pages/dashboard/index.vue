<template>
    <div>
      <v-row>
        <v-col  sm="4" xs="12"  v-for="(item,index) in items" :key="index">
          <v-card class="text pa-4"  :to="item.to">


            <v-card-title>
              <v-icon class="ma-1">  {{  item.icon }}  </v-icon>  |
              {{ $t(item.title)  }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return{

      items: [

        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: this.localePath('/dashboard')
        },
        {
          icon: 'mdi-folder',
          title: 'Blog Group',
          to: this.localePath('/dashboard/BlogGroup')
        },
        {
          icon: 'mdi-file-word',
          title: 'Article List',
          to: this.localePath('/dashboard/Blog')
        },
        {
          icon: 'mdi-bookmark-plus',
          title: 'New Article',
          to: this.localePath('/dashboard/Blog/Edit')
        },
        {
          icon: 'mdi-folder-image',
          title: 'Gallery',
          to: this.localePath('/dashboard/Gallery')
        },
 
        {
          icon: 'mdi-tag',
          title: 'Tags',
          to: this.localePath('/dashboard/Tags')
        },
           {
          icon: 'mdi-tag',
          title: 'Colors',
          to: this.localePath('/dashboard/Colors')
        },
            {
          icon: 'mdi-tag',
          title: 'Styles',
          to: this.localePath('/dashboard/Styles')
        },
        {
          icon: 'mdi-folder-cog',
          title: 'Setting',
          to: this.localePath('/dashboard/Setting')
        },
 
    
        {
          icon: 'mdi-account',
          title: 'Users',
          to: this.localePath('/dashboard/Users')
        },
        {
          icon: 'mdi-logout',
          title: 'Logout',
          to: this.localePath('/dashboard/Logout')
        }
      ],
    }
  }
}
</script>

<style scoped>

</style>
