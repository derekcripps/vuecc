<template>
      <v-app>
          <toolbar></toolbar>
          <v-content>
        <v-flex xs12>
          <v-card color="blue-grey darken-2" class="white--text">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs7>
                  <div>
                    <div class="headline">SikuCC</div>
                    <div>Use the menu to the left to navigate the system.</div>
                  </div>
                </v-flex>
                <v-flex xs5>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
          </v-content>
      </v-app>
</template>

<script>
    export default {
        name: "mainmenu"
    }
</script>

<style scoped>
</style>