import router from '@/router'
import Axios from 'axios'

const API_URL = 'http://localhost:8000/main';
const LOGIN_URL = API_URL + '/login';

export default {

user: {
    authenticated: false
},

  // Send a request to the login URL and save the returned JWT
  login(context, creds, redirect) {
    Axios.post('/login', {
        username: creds.username,
        password: creds.password}
    )
    .then(response => {
      localStorage.setItem('id_token', response.data.token);
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('username', creds.username);
      this.user.authenticated = true;
      router.push({name: "Main"})
    })
    .catch(error => {
        localStorage.setItem('isAuthenticated', false);
        console.log(error)
        context.error = error
    })
  },

// To log out, we just need to remove the token
    logout() {
        localStorage.removeItem('id_token')
        localStorage.setItem('isAuthenticated', false);
        this.user.authenticated = false
     },

    checkAuth() {
        var jwt = localStorage.getItem('id_token')
        if(jwt) {
           this.user.authenticated = true
        }
        else {
           this.user.authenticated = false      
        }
    },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Token ' + localStorage.getItem('id_token')
    }
  },
  getIsAuthenticated() {
      return {
          'isAuthenticated': localStorage.getItem('isAuthenticated')
      }
  }
}