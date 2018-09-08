  <template>
    <v-app>
    <toolbar></toolbar>
        <v-content>
          <v-card>
                <v-card-title class="indigo darken-1">
                    <H2 class="white--text">Test Photos - jsonplaceholder.typicode.com/</H2>
                    <v-spacer></v-spacer>
                    <v-text-field
                        dark
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        v-model="search"
                    ></v-text-field>
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
                        
                        <td>{{props.item.id}}</td>
                        <td>
                            <v-img
                                :src=props.item.thumbnailUrl
                                :lazy-src=props.item.thumbnailUrl
                                aspect-ratio="1"
                                class="grey lighten-2"
                            ></v-img>
                            </td>
                        <td>{{props.item.title}}</td>
                    
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
        name: "testAPI",
        data: function () {
            return {
                search: '',
                headers: [
                    {
                        text: 'ID',
                        align: 'left',
                        value: 'id',
                    },
                    {
                        text: 'URL',
                        align: 'left',
                        value: 'thumbnailUrl'
                    },
                    {
                        text: 'Title',
                        align: 'left',
                        value: 'title'
                    },
                ],
                rows_per_page_items: [
                    10, 20, 50, { text: "All", value: -1 }
                ],
                items: []
                };
            },
        methods: {
            fetchDataList() {
                //fetch('https://jsonplaceholder.typicode.com/todos/1')
                //    .then(response => response.json())
                //    .then(json => console.log(json)
                Axios.get('https://jsonplaceholder.typicode.com/photos')
                    .then((response) => {
                        this.items = response.data;
                        console.log(response.data);
                    })
                        .catch(error => {
                        console.log(error);
                    });;
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
            this.fetchDataList();
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
