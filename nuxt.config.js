import colors from 'vuetify/es5/util/colors'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ExSoof',
    title: 'ExSoof',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script: [
      // {
      //   src: "https://vrhouse.ir/vrhouse.embed.min.js",
      //   body: true,
      // },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },


      
    
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/config.js',
   
    '~/plugins/myplugin.js',
    {src:'~/plugins/ssr.js',ssr:false},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/i18n',


  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-socket-io',
    'nuxt-leaflet',

  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  i18n: {

    locales: [
      {
        code: 'fa',
        file: 'fa-IR.js',
        rtl: true,
        dir: 'rtl',

        localname:'فارسی'
      }
       ,
      {
        code: 'en',
        file: 'en-GB.js',
        rtl: false,
        dir: 'ltr',

        localname: 'English'
      },
      // {
      //   code: 'tr',
      //   file: 'tr-TR.js',
      //   rtl: false,
      //   localname: 'English'
      // }

    ],
    langDir: 'locales/',
    defaultLocale: 'en'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    rtl: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  // io: {
  //   sockets:[
  //     {
  //       name:'home',
  //       url:'https://socket.IRANnewscrypto.com',
  //       default:true
  //     }
  //   ]
  // },
  server:{
    port:3001,
   // host:'0.0.0.0'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
