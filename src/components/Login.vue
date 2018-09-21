<template>
      <v-app>
      <toolbar></toolbar>
      <v-content>
        <v-container fluid>
          <v-text-field box
            v-model='credentials.username'
            label="Enter your domain user ID">
          </v-text-field>

          <v-text-field @keyup.enter="submit()" v-model="credentials.password"
              :append-icon="show1 ? 'visibility_off' : 'visibility'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="password"
              label="Enter password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1">
          </v-text-field>
          <v-flex xs4>
            <v-btn color="primary" @click="submit()">Login</v-btn>
          </v-flex>
        </v-container>
      </v-content>
      </v-app>
</template>

<script>
    //import Axios from 'axios'
    import auth from './auth'
    export default {
      name: "Login",
      data: function () {
          return {
                credentials: {
                  username: '',
                  password: ''
                },
                error:'',
          show1: false,
          show2: true,
          show3: false,
          show4: false,
          rules: {      
            min: v => v.length >= 8 || 'Min 8 characters',
            emailMatch: () => ('The email and password you entered don\'t match')
          }
        }
      },
      methods: {
        submit() {
          var credentials = {
              username: this.credentials.username,
              password: this.credentials.password
          }
        auth.login(this, credentials, 'Main')
        },
      }
    }
</script>

<style scoped>
</style>