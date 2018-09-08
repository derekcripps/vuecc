<template>
    <v-app>
    <toolbar></toolbar>
        <v-content>
          <v-card>
                <v-card-title class="indigo darken-1">
                    <H2 class="white--text">Companies</H2>
                    <v-spacer></v-spacer>
                    <v-text-field
                        dark
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        v-model="search"
                    ></v-text-field>
                    <v-btn flat @click= "companyAdd"><v-icon large color="white">add</v-icon></v-btn>
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
                        <tr @click = "companyEdit(props.item.id)">
                        <td>{{props.item.code}}</td>
                        <td>{{props.item.name}}</td>
                        <td>{{props.item.customer}}</td>
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
    //import api from '@/components/api'
    export default {
        name: "CompanyList",
        loading: false,
        data: function () {
            return {
                search: '',
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
                        text: 'Customer',
                        align: 'left',
                        value: 'customer'
                    },
                ],
                rows_per_page_items: [
                    10, 20, 50, { text: "All", value: -1 }
                ],
                items: []
                };
            },
        methods: {
            fetchCompanyList() {
                Axios.get('/company/', { headers: auth.getAuthHeader()})
                    .then((response) => {
                        this.items = response.data;
                        console.log(response.data);
                    });
            },
            // async companyList () {
            //     this.loading = true
            //     this.items = await api.listCompany()
            //     this.loading = false
            // },
            companyEdit(id_parm) {
              this.$router.push({name: "CompanyEdit", params: {id: id_parm} })
            },
            companyAdd(){
                this.$router.push({name: "CompanyAdd"})
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
            this.fetchCompanyList();
            //this.companyList();
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
