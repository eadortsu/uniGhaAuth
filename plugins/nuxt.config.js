require('dotenv').config()
const fs = require('fs')

export default {
 // loading: "~/components/Loading.vue",
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  /*mode: "spa",*/
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  loading: { color: '#ffc904', height: '5px' },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title:  "Creator's Dashboard",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      {
        name: 'author',
        hid: 'author',
        content: "Heny",
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: "Creator's Dashboard",
      },
      {
        hid: 'fb:app_id',
        property: 'fb:app_id',
        content: '276056836975605',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@HenyApp',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',

      },
    ],
    link: [
      {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons"}
    ],
    script: [
      { hid:'map', src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDb1YzwR4cWj2-fAO7EOEFe9AqTC5ed7N8&libraries=places', body: true},
      {
        hid: 'segment',
        src: `/assets/js/segment.js`,
        defer: true,
        body: false,
      },
    ]
  },
  router: {
    // linkExactActiveClass: 'active'
  },
  /*
   ** Global CSS
   */
  css: ["~/assets/scss/app.scss","vue-loading-overlay/dist/vue-loading.css"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/index.js',
    '~/plugins/i18n.js',
    "~/plugins/simplebar.js",
    "~/plugins/vue-click-outside.js",
    "~/plugins/vue-apexcharts.js",
    "~/plugins/vuelidate.js",
    "~/plugins/vue-slidebar.js",
    "~/plugins/vue-lightbox.js",
    "~/plugins/vue-chartist.js",
    "~/plugins/vue-mask.js",
    "~/plugins/vue-googlemap.js",
    "~/plugins/utils.js",
    '~/plugins/apollo-overrides.js',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/components',
    '@nuxtjs/moment',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    // Doc: https://github.com/nuxt/content
    "@nuxt/content",
    "@nuxtjs/apollo",
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxtjs/firebase',
    'cookie-universal-nuxt',
    '@nuxtjs/axios'
  ],
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  env: {...process.env},
  apollo: {
    tokenName: 'apollo-token', // optional, default: apollo-token
    cookieAttributes: {
      /**
       * Define when the cookie will be removed. Value can be a Number
       * which will be interpreted as days from time of creation or a
       * Date instance. If omitted, the cookie becomes a session cookie.
       */
      expires: 7, // optional, default: 7 (days)

      /**
       * Define the path where the cookie is available. Defaults to '/'
       */
      //  path: '/', // optional
      /**
       * Define the domain where the cookie is available. Defaults to
       * the domain of the page where the cookie was created.
       */
     /* domain: 'heny.app',*/ // optional

      /**
       * A Boolean indicating if the cookie transmission requires a
       * secure protocol (https). Defaults to false.
       */
      secure: false,
    },
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: 'Bearer', // optional, default: 'Bearer'
    // (Optional) Default 'apollo' definition
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'no-cache',
      },
    },
    // optional
    watchLoading: '~/plugins/apollo-watch-loading-handler.js',
    // optional
    errorHandler: '~/plugins/apollo-error-handler.js',
    // required
    clientConfigs: {
      default: {
        // required
        httpEndpoint: process.env.GRAPHQL_URL,
        // optional
        // override HTTP endpoint in browser only
        browserHttpEndpoint: process.env.GRAPHQL_URL,
        // optional
        // See https://www.apollographql.com/docs/link/links/http.html#options
        httpLinkOptions: {
          credentials: 'same-origin',
          headers: {
            xorigin: 'creator',
          },
        },
        // You can use `wss` for secure connection (recommended in production)
        // Use `null` to disable subscriptions
        // 'wss://ws-eu.pusher.com:443/app/1e2822af723fe764306a?client=js&version=5.1&protocol=5
        wsEndpoint: null, // optional
        // LocalStorage token
        tokenName: 'apollo-token', // optional
        // Enable Automatic Query persisting with Apollo Engine
        persisting: false, // Optional
        // Use websockets for everything (no HTTP)
        // You need to pass a `wsEndpoint` for this to work
        websocketsOnly: false, // Optional,
        inMemoryCacheOptions: {
          addTypename: false,
        },
      },
      test: {
        httpEndpoint: process.env.GRAPHQL_URL,
        wsEndpoint: null,
        tokenName: 'apollo-token',
      },
      // alternative: user path to config which returns exact same config options
      test2: '~/plugins/my-alternative-apollo-config.js',
    },
  },
  pwa: {
    workbox: {
      manifest: {
        name: 'Heny Creator',
        short_name: 'Heny Creator',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffc200',
        background_color: '#000000',
        orientation: 'portrait',
        status_bar: '#000000',
        lang: 'English',
        description: 'Heny Creator Portal',
      },

      importScripts: [
        '/firebase-messaging-sw.js'
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: false
    }
  },
  firebase: {
    // options
    config: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      databaseURL: process.env.databaseURL,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId
    },
    customEnv: false,
    onFirebaseHosting: true,
    services: {
      auth: false,
      firestore: false,
      functions: true,
      storage: true,
      realtimeDb: false,
      performance: true,
      analytics: {
        collectionEnabled: true
      },
      remoteConfig: {
        settings: {
          fetchTimeoutMillis: 60000, // Default
          minimumFetchIntervalMillis: 43200000 // Default
        },
        defaultConfig: {
          welcome_message: 'Welcome'
        }
      },
      messaging: {
        createServiceWorker: true,
        actions: [
          {
            action: 'Open',
            url: 'https://admin.heny.app'
          }
        ],
        fcmPublicVapidKey: process.env.VAPID, // OPTIONAL : Sets vapid key for FCM after initialization
        inject: fs.readFileSync('./plugins/fcm.js', 'utf8'),
      }
    }
  },
};
