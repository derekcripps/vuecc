<template>
    <v-app>
        <toolbar></toolbar>
        <v-content>
          <v-card-title class="indigo darken-1">
              <H2 class="white--text">Warehouse - Maintenance</H2>
          </v-card-title>
            <v-form v-model="valid" ref="form" >
                 <v-container grid-list-xl fluid>
                <v-layout wrap>
                    <v-flex xs12 sm6>
                        <v-text-field label ="Code" v-model="warehouse.code" required :rules="nameRules"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label ="Name" v-model="warehouse.name" required :rules="nameRules"></v-text-field>
                    </v-flex>
                    <v-flex md3>
                        <v-select :items="companies" item-text="name" item-value="id" 
                            v-model="warehouse.company" label="Company" class="input-group--focused" :rules="companyRules">
                        </v-select>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-btn outline color="success" @click="warehouseSave">Save</v-btn>
            <v-btn outline color="warning" @click="cancel">Cancel</v-btn>
            <v-btn outline color="error" @click.stop="deleteDialog = true">Delete</v-btn>

            <v-dialog v-model="deleteDialog" max-width="500px">   <!--Delete Dialog Box-->
                <v-card>
                    <v-card-title>
                        <span>Are you sure you want to delete this warehouse?</span>
                    </v-card-title>
                    <v-card-actions>
                    <v-btn color="primary" flat @click.stop="deleteDialog=false">Cancel</v-btn>
                    <v-btn color="error" flat @click="warehouseDelete">Delete</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
            
            <v-dialog v-model="errorDialog" max-width="500px">         <!-- Error Dialog Box Start -->
                <v-card>
                    <v-card-title>
                        <v-card-text>
                            <H3>There was an error saving your request.</H3>
                            <H5>Technical Details:</H5>
                            <p>{{error_message}}</p>
                            </v-card-text>
                    </v-card-title>
                    <v-card-actions>
                    <v-btn color="primary" flat @click.stop="errorDialog=false">Close</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>                                                <!-- Error Dialog Box End -->

            </v-form>
        </v-content>
    </v-app>
</template>

<script>
    import Axios from 'axios'
    import auth from '@/components/auth'
    export default {
        name: "WarehouseEdit",
        data: function () {
            return {
                valid: true,
                id: this.$route.params.id,
                warehouse: '',
                companies: [],
                deleteDialog: false,
                errorDialog: false,
                error_message: '',
                nameRules: [
                    (v) => !!v || 'This is a required field.'
                ],
                companyRules: [
                (v) => !!v || 'Company is required'
                ],
            }
        },
        methods: {
            fetchWarehouseDetails() {
              console.log(this.id)
                Axios.get('warehouse/' + this.id + '/' , { headers: auth.getAuthHeader()})
                    .then((response) => {
                        this.warehouse = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            warehouseSave() {
                if(this.$refs.form.validate()) {
                    Axios.put('warehouse/'+this.id+'/', 
                        {code: this.warehouse.code, name: this.warehouse.name, company: this.warehouse.company}, 
                        { headers: auth.getAuthHeader()})
                    .then(response => {
                        console.log(response);
                        this.$router.push({ name: "WarehouseList" })
                    })
                    .catch(error => {
                        this.error_message = error;
                        this.errorDialog = true;
                        console.log(this.errorDialog);
                    })
                }
            },
            warehouseDelete() {
                Axios.delete("warehouse/" + this.id + "/", { headers: auth.getAuthHeader()})
                .then(response => {
                    console.log(response);
                    this.$router.push({ name: "WarehouseList" });
                })
                .catch(error => {
                    console.log(error);
                });
            },
            cancel() {
              this.$router.push({ name: "WarehouseList" })
            },
            fetchCompanies() {
                Axios.get("company/", {
                    headers: auth.getAuthHeader()
                })
                .then(response => {
                    this.companies = response.data;
                });
            },
        },
        mounted() {
            this.fetchWarehouseDetails();
            this.fetchCompanies();
        }
    }
</script>

<style scoped>
</style>