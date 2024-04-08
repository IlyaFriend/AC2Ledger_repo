export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      mongoConnectionString: process.env.MONGO_CONNECTION_STRING
    }
  },
  modules: ['../src/module.ts', '@formkit/nuxt'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  nitro: {
    plugins: ['~/server/index.ts']
  },
  build: {
    transpile: ['jsonwebtoken']
  },
  auth: {
    provider: {
      type: 'refresh',
      // refreshOnlyToken: true,
      endpoints: {
        getSession: { path: '/user' },
        refresh: { path: '/refresh', method: 'post' }
      },
      pages: {
        login: '/login',
        signup: '/signup'
      },
      token: {
        signInResponseTokenPointer: '/token/accessToken',
        maxAgeInSeconds: 60 * 5, // 5 min
        sameSiteAttribute: 'lax'
      },
      refreshToken: {
        signInResponseRefreshTokenPointer: '/token/refreshToken'
      }
    },
    globalAppMiddleware: {
      isEnabled: true
    }
  },
  formkit: {
    autoImport: true
  }
})
