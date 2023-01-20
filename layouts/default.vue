<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title >
        <img src="/logo.png" alt="Logo">
      </v-toolbar-title>
      <v-spacer />
      <v-menu
v-if="user"
        bottom
        min-width="200px"
        rounded
        offset-y
      >
        <template #activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
          >
            <v-avatar
              color="brown"
              size="32"
            >
              <span class="white--text text-h6">{{ user.name? user.name[0] : user.email[0] }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto">
              <v-btn
                depressed
                rounded
                text
                block
                @click="$router.push({path: '/' })"
              >
                <v-icon>mdi-account-circle </v-icon>
                My Profile
              </v-btn>
              <v-btn
                depressed
                rounded
                text
                block
              >
                <v-icon> mdi-account-supervisor</v-icon>
               Group Chat
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                block
                @click="logout"
              >
                <v-icon> mdi-logout-variant</v-icon>
                  Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span class="created"> <span>created by <a href="https://eadortsu.com" target="_blank">eadortsu</a> </span>  &copy; UniGhana  {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: "authentication",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      title: 'Vuetify.js',
      user: null
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
  },
  methods: {
    async logout() {
      await this.$apolloHelpers.onLogout()
      await localStorage.removeItem('user');
      await localStorage.removeItem('token');
      await this.$router.push({
        path: "/login",
      });
    }
  }
}
</script>
