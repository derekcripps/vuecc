<template>
    <v-app>
        <toolbar></toolbar>
        <v-content>
          <v-card-title class="indigo darken-1">
              <H2 class="white--text">Company - New</H2>
          </v-card-title>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-container grid-list-xl fluid>
                <v-layout wrap>
                   <v-flex xs12 sm6>
                        <v-text-field label =" Code" v-model="companyCode" :rules="codeRules" required ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label ="Name" v-model="companyName" :rules="nameRules" required ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-select :items="customers" item-text="name" item-value="id" 
                            v-model="companyCustomer" label="Customer" class="input-group--focused" :rules="customerRules">
                        </v-select>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-btn outline color="success" @click="companySave">Save</v-btn>
            <v-btn outline color="warning" @click="cancel">Cancel</v-btn>
        
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
            </v-dialog>                                                 <!-- Error Dialog Box End -->

            </v-form>
        </v-content>
    </v-app>
</template>

<script>
    import Axios from 'axios'
    import auth from '@/components/auth'
    export default {
        name: "CompanyAdd",
        data: function () {
            return {
                valid: true,
                companyName: '',
                companyCode: '',
                companyCustomer: 0,
                customers: [],
                nameRules: [
                    (v) => !!v || 'Name is required'
                ],
                codeRules: [
                    (v) => !!v || 'Company Code is required'
                ],
                customerRules: [
                    (v) => !!v || 'Customer is required'
                ],
                error_message:'',
                errorDialog: false
            }
        },
        methods: {
            companySave() { 
                if(this.$refs.form.validate()) {
                    Axios.post('company/', {code: this.companyCode, name: this.companyName, customer: this.companyCustomer},
                        { headers: auth.getAuthHeader()})
                    .then(response => {
                        console.log(response);
                        this.$router.push({ name: "CompanyList" })
                    })
                    .catch(error => {
                        this.error_message = error;
                        this.errorDialog = true;
                        console.log(this.company_name);
                        console.log(error);
                    })
                }
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
            this.fetchCustomers();
        },
        
    }
</script>

<style scoped>
</style>