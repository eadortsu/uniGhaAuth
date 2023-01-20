<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="10">
      <div class="">
     <a  @click="$router.push({path: '/' })"><v-icon>mdi-chevron-left</v-icon>  Back</a>
      </div>
      <v-card v-if="user" outlined>
        <v-row  align="center" class="pa-4">
          <v-col cols="12" sm="8" md="8">
            <h3>Change Info</h3>
            <p>Changes will be reflected to every services</p>
          </v-col>
        </v-row>
        <v-row  align="center" class="pa-4">
          <v-col cols="12" sm="8" md="8">
        <v-form ref="form" v-model='valid' class="text-center">
          <v-text-field
            ref="name"
            v-model="user.name"
            outlined
            label="Name"
            hint="Enter your name..."
            placeholder="Enter your name..."
            type="text"
            :rules="[() => !!user.name || 'This field is required']"
          ></v-text-field>
          <v-textarea
            ref="bio"
            v-model="user.name"
            outlined
            label="Bio"
            hint="Enter your bio..."
            placeholder="Enter your bio..."
            type="text"
          ></v-textarea>
          <v-text-field
            ref="phone"
            v-model="user.phone"
            outlined
            label="Phone"
            hint="enter your phone..."
            placeholder="enter your phone..."
            type="tel"
          ></v-text-field>
          <v-text-field
            ref="email"
            v-model="user.email"
            outlined
            label="Email"
            hint="Enter your email..."
            placeholder="Enter your email..."
            type="email"
            :rules="[() => !!user.email || 'This field is required']"
          ></v-text-field>
        <v-text-field
            ref='password'
            v-model='user.password'
            label='Password'
            outlined
            hint="Leave blank to keep old password"
            :type="showPass ? 'text' : 'password'"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPass = !showPass"
          >
          </v-text-field>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn
              color='primary' :loading="isLoading" :disabled="isLoading"
              @click='save()' >Save</v-btn>
          </v-card-actions>
          <v-card-text style="color: red">{{errMsg}}</v-card-text>
          <v-spacer></v-spacer>
        </v-form>
          </v-col>
        </v-row>

      </v-card>
      <p class="mt-3">
        <span class="created">created by <a href="https://eadortsu.com" target="_blank">eadortsu</a></span>
        <span class="devChallenges">devChallenges.io</span>
      </p>
    </v-col>
  </v-row>
</template>

<script>
import updateProfileGql from "~/gql/auth/updateProfile.gql";

export default {
  name: 'IndexPage',
  data() {
    return {
      user: null,
      valid: true,
      errMsg: '',
      isLoading: false
    }
  },
  computed: {
    form () {
      return {
        name: this.user.name,
        email: this.user.email,
      }
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.user.password = null
  },

  methods: {
    async save() {
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true
        this.$refs[f].validate(true)
      })
      // stop here if form is invalid
      if (!this.formHasErrors) {
        this.isLoading = true;
        try {
         const {token, ...user} =  this.user
          const res = await this.$apollo
            .mutate({
              mutation: updateProfileGql,
              variables: {
                updateUserInput: user
              }
            })
            .then(({data}) => data && data.updateUser);
          // login successful if there's a jwt token in the response
          // console.log(res);
          if (res) {
            await localStorage.setItem('user', JSON.stringify(res));
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
  }
}
</script>
<style>
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
