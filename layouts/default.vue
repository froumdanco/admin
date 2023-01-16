<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      :right="$i18n.locales.filter(i => i.code == this.$i18n.locale)[0].rtl"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t(item.title)" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-toolbar-title v-text="$t(title)" />
      <v-spacer />

    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      Select Language
      <template v-for="(lang,index) in this.$i18n.locales">
        <a class="v-btn btn" small :href="switchLocalePath(lang.code)" :key="index">
          {{ lang.code }}</a>
      </template>

      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  data () {
    return {
      setting:null,
      clipped: false,
      drawer: true,
      fixed: false,
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
          icon: 'mdi-folder-outline',
          title: 'Froum',
          to: this.localePath('/dashboard/Froum')
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
          icon: 'mdi-book-alphabet',
          title: 'Album',
          to: this.localePath('/dashboard/Album')
        },
    
       {
          icon: 'mdi-account',
          title: 'customers',
          to: this.localePath('/dashboard/customer')
        },
        {
          icon: 'mdi-folder-outline',
          title: 'Menus',
          to: this.localePath('/dashboard/Menus')
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
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Admin Tiss Express 1.0'
    }
  },

  mounted() {
    this.$vuetify.lang.current =this.$i18n.locale;
   this.$vuetify.rtl =this.$i18n.locales.filter(i => i.code == this.$i18n.locale)[0].rtl;
  }
}
</script>
<style>
.btn{
  color: #fff !important;
  font-size: 14px;
  padding-left: 15px;
  padding-right: 15px;
}
@font-face {
  font-family: IRANSans;
  font-style: normal;
  font-weight: normal;
  src: url('/fonts/normal/IRANSansWeb.eot');
  src: url('/fonts/normal/IRANSansWeb.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
  url('/fonts/normal/IRANSansWeb.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
  url('/fonts/normal/IRANSansWeb.woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
  url('/fonts/normal/IRANSansWeb.ttf') format('truetype');
}
html *{ font-family: IRANSans;}
</style>
