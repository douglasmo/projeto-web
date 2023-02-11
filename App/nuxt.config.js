import colors from 'vuetify/es5/util/colors'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  // buildDir: 'nuxt-dist',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s ',
    title: 'Fluxo de caixa fácil',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/-favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  // plugins: ['~plugins/vuetify.js'],
   plugins: [
     { src: '~/plugins/firebase.js',  ssr: false },
     { src: '~/plugins/vue-chart.js', ssr: false },
     { src: '~/plugins/vue-mask.js',   ssr: false },
     { src: '~/plugins/v-money.js',   ssr: false },
     { src: '~plugins/ga.js', mode: 'client' },
    // '~/plugins/firebase.js',
    // '~/plugins/vue-chart.js',
    // '~/plugins/vue-mask.js',
    // '~/plugins/vuetify-money.js',
    // { src: '~/plugins/vuetify-money.js', mode: 'client' },
    { src: '~/plugins/localStorage.js',  ssr: false }
   ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://www.npmjs.com/package/@nuxtjs/toast
    '@nuxtjs/toast',
    'vue-currency-input/nuxt',
    ['v-currency-field/nuxt', {
      locale: 'pt-BR',
      decimalLength: 2,
      autoDecimalMode: true,
      min: null,
      max: null,
      defaultValue: 0,
      valueAsInteger: false,
      allowNegative: true
    }]
    // '@nuxtjs/auth',
  ],

  // auth: {
  //   // Options
  // },
  env: {
    apiKey: "AIzaSyD-OM1rbQGvHRm-4qb2QAwh6nXRVhQ-pM0",
    authDomain: "fluxocaixafacil.firebaseapp.com",
    databaseURL: "https://fluxocaixafacil.firebaseio.com",
    projectId: "fluxocaixafacil",
    storageBucket: "fluxocaixafacil.appspot.com",
    messagingSenderId: "1068625883866",
    appId: "1:1068625883866:web:049aa3e188a84fe4312be3",
    measurementId: "G-TW603NY4ZD"
  },
  router: {
    // middleware: ['auth']
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    
  },


  // https://www.npmjs.com/package/@nuxtjs/toast
  toast: {
    position: 'top-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...alguma coisa deu errado!',
        options: {
          type: 'error'
        }
      },
      {
        name: 'my-success',
        message: 'Operação realizada com sucesso!',
        options: {
          type: 'success'
        }
      }

    ]
  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
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

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // friendlyErrors: false,
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  }
}
