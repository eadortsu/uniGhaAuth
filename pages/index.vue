<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="10">
      <div class="text-center">
      <h1>Personal info</h1>
      <p>Basic info, like your name and photo</p>
      </div>
      <v-card v-if="user" outlined>
        <v-row  align="center" class="pa-4">
          <v-col cols="12" sm="8" md="8">
           <h3>Profile</h3>
            <p>Some info may be visible to other people
            </p>
          </v-col>
          <v-col  cols="12" sm="4" md="4" >
            <v-btn class="float-end" @click="$router.push({path: '/edit' })">Edit</v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="center" align="center" class="pa-3">
          <v-col cols="12" sm="5" md="5">
            <p class="text-mute">PHOTO
            </p>
          </v-col>
          <v-col cols="12" sm="7" md="7">
            <v-avatar
              color="brown"
              size="32"
            >
              <span class="white--text text-h6">{{ user.name? user.name[0] : user.email[0] }}</span>
            </v-avatar>
          </v-col>
        </v-row>
 <v-divider></v-divider>
        <v-row justify="center" align="center" class="pa-3">
          <v-col cols="12" sm="5" md="5">
            <p class="text-mute">NAME
            </p>
          </v-col>
          <v-col cols="12" sm="7" md="7">
           <p>{{user.name}}</p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="center" align="center" class="pa-3">
          <v-col cols="12" sm="5" md="5">
            <p class="text-mute">BIO
            </p>
          </v-col>
          <v-col cols="12" sm="7" md="7">
            <p class="text-mute">{{user.bio}}</p>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-row justify="center" align="center" class="pa-3">
          <v-col cols="12" sm="5" md="5">
            <p class="text-mute">PHONE
            </p>
          </v-col>
          <v-col cols="12" sm="7" md="7">
            <p>{{user.phone}}</p>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-row justify="center" align="center" class="pa-3">
          <v-col cols="12" sm="5" md="5">
            <p class="text-mute">EMAIL</p>
          </v-col>
          <v-col cols="12" sm="7" md="7">
            <p>{{user.email}}</p>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-row justify="center" align="center" class="pa-3">
          <v-col cols="12" sm="5" md="5">
            <p class="text-mute">PASSWORD
            </p>
          </v-col>
          <v-col cols="12" sm="7" md="7">
            <p>************</p>
          </v-col>
        </v-row>

      </v-card>
      <p class="mt-3">

      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      user: null
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
</script>
<style>
.text-mute{
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.035em;
  color: #BDBDBD;

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
