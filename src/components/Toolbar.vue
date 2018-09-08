<template>
<div>
    <v-navigation-drawer
        persistent
        clipped
        fixed
        v-model="drawer"
        app
        class="grey darken-3"
        dark
    >
        <v-list dense >
           <v-list-group>
              <v-list-tile slot="activator" >
                <v-list-tile-action>
                  <v-icon>settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Settings</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile @click="settingsMenu">
                <v-list-tile-content>
                  <v-list-tile-title>SETTINGS MENU</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>menu</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              

              <v-list-tile @click="companyList">
                <v-list-tile-content>
                  <v-list-tile-title>Companies</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>domain</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              

              <v-list-tile @click="warehouseList">
                <v-list-tile-content>
                  <v-list-tile-title>Warehouses</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>location_city</v-icon>
                </v-list-tile-action>
              </v-list-tile>


            </v-list-group>

            <v-list-tile @click="home">
                <v-list-tile-action>
                    <v-icon>account_box</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Home</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="testAPI">
                <v-list-tile-action>
                    <v-icon>code</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Test API</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>


  
    </v-navigation-drawer>
    <v-toolbar app fixed dark color="indigo darken-4" flat clipped-left>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>SikuCC</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn v-if="isAuthorized ==='true'" flat @click="logout">Logout</v-btn>
      <v-btn v-else flat @click="login">Login</v-btn>
    </v-toolbar-items>
    </v-toolbar>
</div>
</template>
<script>
import auth from '@/components/auth'
export default {
  name: "toolbar",
  data: () => ({
    drawer: null,
    items: [],
    isAuthorized: localStorage.getItem('isAuthenticated'),
  }),
  props: {
    source: String
  },
  methods: {
    home() {
      this.$router.push({ name: "Home" });
    },
    quotesMenu() {
      this.$router.push({ name: "QuotesList" });
    },
    settingsMenu() {
      this.$router.push({ name: "SettingsMenu" });
    },
    companyList() {
      this.$router.push({ name: "CompanyList" });
    },
    warehouseList() {
      this.$router.push({ name: "WarehouseList" });
    },
    testAPI() {
      this.$router.push({ name: "testAPI" });
    },
    logout(){
        auth.logout();
        this.isAuthorized=localStorage.getItem('isAuthenticated')
        console.log("Logging out"+ this.isAuthorized)
       this.$router.push({ name: "Login" });
    }
  },
  mounted(){
    this.isAuthorized=localStorage.getItem('isAuthenticated')
  }
};
</script>

<style scoped>
</style>