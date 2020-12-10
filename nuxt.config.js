export default {
  env: {
    auth: process.env.VUE_APP_DEFAULT_AUTH,
    apikey: process.env.VUE_APP_APIKEY
  },
  loading: "~/components/Loading.vue",
  router: {
    //base: './',
    mode: 'hash',
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: "teams",
          path: "/",
          component: "~/pages/dashboard/teams/index.vue",
        },
        {
          name: 'team',
          path: '/team/:id',
          component: "~/pages/calendar/TeamCalendar.vue",
          props: true
        },
        {
          name: 'auth',
          path: '/auth',
          component: "~/pages/account/login.vue"
        },
        {
          name: 'register',
          path: '/register',
          component: "~/pages/account/register.vue"
        },
        {
          name: 'forgot-password',
          path: '/forgot-password',
          component: "~/pages/account/forgot-password.vue"
        },
        {
          path: '*',
          redirect: '/'
        }
      );
    }
  },
  babel: {
    compact: true
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static', // default is 'server'
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Global CSS
  */
  css: ["~/assets/scss/app.scss", 'quill/dist/quill.core.css', 'quill/dist/quill.snow.css', 'quill/dist/quill.bubble.css'],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    "~/plugins/fireauth.js",
    "~/plugins/fakeauth.js",
    "~/plugins/simplebar.js",
    "~/plugins/vue-click-outside.js",
    "~/plugins/vuelidate.js",
    "~/plugins/draggable.js",
    "~/plugins/vue-slidebar.js",
    "~/plugins/tour.js",
    "~/plugins/vue-lightbox.js",
    "~/plugins/mask.js",
    "~/plugins/quill-editor.js",
    "~/plugins/chartist.js",
    "~/plugins/vue-googlemap.js",
    "~/plugins/string-filter"
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    'nuxt-i18n',
    '@nuxtjs/axios',
    '@nuxtjs/toast'
  ],
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'pt',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./locales/en.json'),
        pt: require('./locales/pt.json'),
      }
    }
  },

  axios: {
    baseURL: 'http://localhost:8080/api',
    // proxy: true
  },

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    babel: {
      compact: true
    }
  },

  toast: {
    iconPack: 'fontawesome',
    duration: 4000,
    position: 'top-center',
    keepOnHover: true,
    fullWidth: false,
    fitToScreen: false,
  //  theme: 'outline',
    register: [
      {
        name: 'defaultSuccess',
        message: (payload) => {
          return !payload.msg ? 'Operação realidada com sucesso!' : payload.msg
        },
        options: {
          type: 'success',
          icon: 'check'
        }
      },
      {
        name: 'defaultError',
        message: (payload) => {
          return !payload.msg ? 'Oops.. Erro inesperado.' : payload.msg
        },
        options: {
          type: 'error',
          icon: 'times'
        }
      }
    ]
  },
  showError(e) {
    if (e && e.response && e.response.data) {
      this.$toast.global.defaultError({msg: e.response.data})
    } else if (typeof e === 'string') {
      this.$toast.global.defaultError({msg: e})
    } else {
      this.$toast.global.defaultError()
    }
  }
}
