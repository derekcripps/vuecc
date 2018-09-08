<template>
    <v-app>
        <toolbar></toolbar>
        <v-content>
          <v-card-title class="indigo darken-1">
              <H2 class="white--text">Company - Maintenance</H2>
          </v-card-title>
            <v-form v-model="valid" ref="form" >
                 <v-container grid-list-xl fluid>
                <v-layout wrap>
                    <v-flex xs12 sm6>
                        <v-text-field label ="Code" v-model="company.code" required :rules="nameRules"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label ="Name" v-model="company.name" required :rules="nameRules"></v-text-field>
                    </v-flex>
                    <v-flex md3>
                        <v-select :items="customers" item-text="name" item-value="id" 
                            v-model="company.customer" label="Customer" class="input-group--focused" :rules="customerRules">
                        </v-select>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-btn outline color="success" @click="companySave">Save</v-btn>
            <v-btn outline color="warning" @click="cancel">Cancel</v-btn>
            <v-btn outline color="error" @click.stop="deleteDialog = true">Delete</v-btn>

            <v-dialog v-model="deleteDialog" max-width="500px">   <!--Delete Dialog Box-->
                <v-card>
                    <v-card-title>
                        <span>Are you sure you want to delete this Company?</span>
                    </v-card-title>
                    <v-card-actions>
                    <v-btn color="primary" flat @click.stop="deleteDialog=false">Cancel</v-btn>
                    <v-btn color="error" flat @click="companyDelete">Delete</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
            
            <v-dialog v-model="errorDialog" max-width="500px">          <!-- Error Dialog Box Start -->
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
            </v-dialog>                                                 <!-- Error Dialog Box End -->

            </v-form>
        </v-content>
    </v-app>
</template>

<script>
    import Axios from 'axios'
    import auth from '@/components/auth'
    //import api from '@/components/api'
    export default {
        name: "CompanyEdit",
        data: function () {
            return {
                valid: true,
                id: this.$route.params.id,
                company: '',
                customers: [],
                deleteDialog: false,
                errorDialog: false,
                error_message: '',
                nameRules: [
                    (v) => !!v || 'This is a required field.'
                ],
                customerRules: [
                (v) => !!v || 'Customer is required'
                ],
            }
        },
        methods: {
            fetchCompanyDetails() {
              console.log(this.id)
                Axios.get('company/' + this.id + '/' , { headers: auth.getAuthHeader()})
                    .then((response) => {
                        this.company = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            companySave() {
                if(this.$refs.form.validate()) {
                    Axios.put('company/'+this.id+'/', 
                        {code: this.company.code, name: this.company.name, customer: this.company.customer}, 
                        { headers: auth.getAuthHeader()})
                    .then(response => {
                        console.log(response);
                        this.$router.push({ name: "CompanyList" })
                    })
                    .catch(error => {
                        this.error_message = error;
                        this.errorDialog = true;
                        console.log(this.errorDialog);
                    })
                }
            },
            companyDelete() {
                Axios.delete("company/" + this.id + "/", { headers: auth.getAuthHeader()})
                .then(response => {
                    console.log(response);
                    this.$router.push({ name: "CompanyList" });
                })
                .catch(error => {
                    console.log(error);
                });
            },
            cancel() {
              this.$router.push({ name: "CompanyList" })
            },
            fetchCustomers() {
                Axios.get("customer/", {
                    headers: auth.getAuthHeader()
                })
                .then(response => {
                    this.customers = response.data;
                });
            },
        },
        mounted() {
            this.fetchCompanyDetails();
            //this.companyDetails();
            this.fetchCustomers();
        }
    }
</script>

<style scoped>
</style>