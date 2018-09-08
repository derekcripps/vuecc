<template>
      <v-app>
      <toolbar></toolbar>
      <v-content>
        <v-container fluid>
          <!--<input type="text" name="username" v-model="credentials.username" placeholder="Username" />
          <input type="password" name="password" v-model="credentials.password" placeholder="Password" />-->
          <v-text-field box
            v-model='credentials.username'
            label="Enter your domain user ID">
          </v-text-field>

          <v-text-field v-model="credentials.password"
            name="password"
            label="Enter your password"
            hint="At least 8 characters"
            min="8"
            :type="'password'"
            counter>
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
      name: "login",
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
        required: value => !!value || 'Required.',
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
          login() {
            Axios.post('/login/', {
              username: this.credentials.username,
              password: this.credentials.password
            }).then(response => {
              this.$store.state.token = response.data.token;
              localStorage.setItem('id_token', response.data.token)
              //console.log(response)
              this.$router.push({name: "Main"})
            }).catch(error => {
              console.log("error logging in")
              console.log(error)
            })
            this.dialog=false
          }
      }
    }
</script>

<style scoped>
</style>