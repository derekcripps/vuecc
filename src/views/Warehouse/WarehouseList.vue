<template>
    <v-app>
    <toolbar></toolbar>
        <v-content>
          <v-card>
                <v-card-title class="indigo darken-1">
                    <H2 class="white--text">Warehouses</H2>
                    <v-spacer></v-spacer>
                    <v-text-field
                        dark
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        v-model="search"
                    ></v-text-field>
                    <div v-if="authAddWarehouse === true">
                        <v-btn flat @click= "warehouseAdd"><v-icon large color="white">add</v-icon></v-btn>
                    </div>
                </v-card-title>
                <v-data-table
                    v-bind:headers="headers"
                    v-bind:items="items"
                    v-bind:search="search"
                    v-bind:custom-filter="customFilter"
                    v-bind:rows-per-page-items="rows_per_page_items"
                    class="elevation-1"
                    >
                    <template slot="items" slot-scope="props">
                        <tr @click = "warehouseEdit(props.item.id)">
                        <td>{{props.item.code}}</td>
                        <td>{{props.item.name}}</td>
                        <td>{{props.item.company}}</td>
                        </tr>
                    </template>
                </v-data-table>
          </v-card>
        </v-content>
    </v-app>
</template>
<script>
   import Axios from 'axios'
    import auth from '@/components/auth'
    export default {
        name: "WarehouseList",
        data: function () {
            return {
                search: '',
                permissions: [],
                authAddWarehouse: false,
                authViewWarehouse: false,
                headers: [
                    {
                        text: 'Code',
                        align: 'left',
                        value: 'code',
                    },
                    {
                        text: 'Name',
                        align: 'left',
                        value: 'name'
                    },
                    {
                        text: 'Company',
                        align: 'left',
                        value: 'company'
                    },
                ],
                rows_per_page_items: [
                    10, 20, 50, { text: "All", value: -1 }
                ],
                items: []
                };
            },
        methods: {
            fetchWarehouseList() {
                Axios.get('/warehouse/', { headers: auth.getAuthHeader()})
                    .then((response) => {
                        this.items = response.data;
                        console.log(response.data);
                    });
            },
            warehouseEdit(id_parm) {
              this.$router.push({name: "WarehouseEdit", params: {id: id_parm} })
            },
            warehouseAdd(){
                this.$router.push({name: "WarehouseAdd"})
            },
            getPermissions() {
                this.permissions = auth.getPermissions();
                console.log(this.permissions);
                if (this.permissions.indexOf("main.add_warehouse") != -1) {
                   this.authAddWarehouse = true; 
                };
                if (this.permissions.indexOf("main.view_warehouse") != -1) {
                   this.authViewWarehouse = true; 
                };                
            },
            customFilter(items, search, filter) {
                //this custom filter will do a multi-match separated by a space.
                //e.g
                if (!search) { return items } //if the search is empty just return all the items
                function  new_filter (val, search) {
                    return val !== null &&
                        ['undefined', 'boolean'].indexOf(typeof val) === -1 &&
                        val.toString().toLowerCase().replace(/[^0-9a-zA-Z]+/g,"").indexOf(search) !== -1
                }
                let needleAry = search.toString().toLowerCase().split(" ").filter(x => x);
                //whenever we encounter a space in our search we will filter for both the first and second word (or third word)
                return items.filter(row => needleAry.every(needle => Object.keys(row).some(key => new_filter(row[key],needle))));
                //foreach needle in our array cycle through the data (row[key]) in the current row looking for a match.
                // .some will return true and exit the loop if it finds one it will return false if it doesnt
                // .every will exit the loop if we dont find a match but will return true if all needles match
                // .filter the rows on each match
            }
        },
        mounted() {
            this.fetchWarehouseList();
            this.getPermissions();
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
