<template>
  <v-container fuild fill-height>
    <v-layout justify-center>
      <v-flex xs12 sm8 md6>
        <!-- login view -->
        <v-card class="auth-card" outlined>

          <v-card-text class="logo">
           <img src="/logo.png" alt="Logo">
          </v-card-text>
          <v-card-text class="header">
           Login
          </v-card-text>
          <v-card-text>
            <!-- login form -->
            <v-form ref="form" v-model='valid' class="text-center">
              <v-text-field
                ref="email"
                v-model="email"
                outlined
                label="Email"
                hint="youremail@example.com"
                type="email"
                prepend-inner-icon="mdi-email"
                :rules="[() => !!email || 'This field is required']"
              ></v-text-field>
              <v-text-field
                ref='password'
                v-model='password'
                label='Password'
                outlined
                prepend-inner-icon="mdi-lock"
                hint="your secrete password"
                required
                :rules="[
              () => !!password || 'This field is required',
              () => !!password && password.length >= 6 || 'Password must be more than 6 characters',

      ]"
                :type="showPass ? 'text' : 'password'"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPass = !showPass"
              >
              </v-text-field>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-btn
color='primary' block :loading="isLoading" :disabled="isLoading"
                       @click='login()' >Login</v-btn>
              </v-card-actions>
              <v-card-text style="color: red">{{errMsg}}</v-card-text>
              <v-spacer></v-spacer>
              <v-card-text class="or-social">
                or continue with these social profile
              </v-card-text>
              <div class="text-center">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  outlined
                >
                  <v-icon dark>
                    mdi-google
                  </v-icon>
                </v-btn>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  outlined
                >
                  <v-icon dark>
                    mdi-facebook
                  </v-icon>
                </v-btn>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  outlined
                >
                  <v-icon dark>
                    mdi-twitter
                  </v-icon>
                </v-btn>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  outlined
                >
                  <v-icon dark>
                    mdi-github
                  </v-icon>
                </v-btn>
              </div>
              <v-card-text class="or-social">
                Don't have an account?
                <router-link v-slot="{ navigate }" to="/register" custom>
                  <a role="link" @click="navigate" @keypress.enter="navigate">Register</a>
                </router-link>
              </v-card-text>
            </v-form>
            <!-- login form -->
          </v-card-text>
        </v-card>
        <p class="mt-3">
        <span class="created">created by <a href="https://eadortsu.com" target="_blank">eadortsu</a></span>
        <span class="devChallenges">&copy; UniGhana 2023</span>
        </p>
        <!-- end login view -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import loginGql from "~/gql/auth/login.gql";

export default {
  name: 'LoginPage',
  layout: "auth",
  data: () => ({
    valid: true,
    email: null,
    password: null,
    showPass: false,
    errMsg: '',
    formHasErrors: false,
    isLoading: false,
  }),
  computed: {
    form () {
      return {
        email: this.email,
        password: this.password,
      }
    },
  },

  methods: {
    async login() {
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true
        this.$refs[f].validate(true)
      })
      if (this.password && this.password.length < 6) this.formHasErrors = true
      // stop here if form is invalid
      if (!this.formHasErrors) {
        this.isLoading = true;
        try {
          const res = await this.$apollo
            .mutate({
              mutation: loginGql,
              variables: {
                user: {
                  email: this.email,
                  password: this.password
                }
              }
            })
            .then(({data}) => data && data.login);
          // login successful if there's a jwt token in the response
          // console.log(res);
          if (res && res.token) {
            await this.$apolloHelpers.onLogin(res.token)
            await localStorage.setItem('user', JSON.stringify(res));
            await localStorage.setItem('token', res.token);
            window.location.href = "/"
          } else {
            this.isLoading = false;
            this.errMsg = "Sorry, An Error occurred, Please try again"
          }
          return res;
        } catch (e) {
          this.errMsg = e.message.replace("GraphQL error:", "");
          if (this.errMsg.trim() === 'Email is already in use') {
            this.errMsg += ',  Login to continue'
          }
          this.isLoading = false;
        }
      }

    },
  },
}
</script>

<style>
.auth-card {
  border: 1px solid #BDBDBD;
  box-sizing: border-box;
  border-radius: 24px !important;
  padding: 18px;
}

.auth-card .header {

  font-family: 'Noto Sans', serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: -0.035em;
  color: #E0E0E0;
}

.auth-card .sub-header {
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.035em;

  color: #E0E0E0;
}

.auth-card .or-social {
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height */

  letter-spacing: -0.035em;

  color: #828282;
}

.created{
  float: left;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height */

  letter-spacing: -0.035em;

  color: #828282;
}

.devChallenges{
  float: right;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height */

  letter-spacing: -0.035em;

  color: #828282;
}
</style>
