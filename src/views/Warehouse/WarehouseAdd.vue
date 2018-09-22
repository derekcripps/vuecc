<template>
    <v-app>
        <toolbar></toolbar>
        <v-content>
          <v-card-title class="indigo darken-1">
              <H2 class="white--text">Warehouse - New</H2>
          </v-card-title>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-container grid-list-xl fluid>
                <v-layout wrap>
                   <v-flex xs12 sm6>
                        <v-text-field label =" Code" v-model="warehouseCode" :rules="codeRules" required ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-text-field label ="Name" v-model="warehouseName" :rules="nameRules" required ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-select :items="companies" item-text="name" item-value="id"
                            v-model="warehouseCompany" label="Company" class="input-group--focused" :rules="companyRules">
                        </v-select>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-btn outline color="success" @click="warehouseSave">Save</v-btn>
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
        name: "WarehouseAdd",
        data: function () {
            return {
                valid: true,
                warehouseName: '',
                warehouseCode: '',
                warehouseCompany: 0,
                companies: [],
                nameRules: [
                    (v) => !!v || 'Name is required'
                ],
                codeRules: [
                    (v) => !!v || 'Warehouse Code is required'
                ],
                companyRules: [
                    (v) => !!v || 'Company is required'
                ],
                error_message:'',
                errorDialog: false
            }
        },
        methods: {
            warehouseSave() {
                if(this.$refs.form.validate()) {
                    Axios.post('warehouse/', {code: this.warehouseCode, name: this.warehouseName, company: this.warehouseCompany},
                        { headers: auth.getAuthHeader()})
                    .then(response => {
                        console.log(response);
                        this.$router.push({ name: "WarehouseList" })
                    })
                    .catch(error => {
                        this.error_message = error;
                        this.errorDialog = true;
                        console.log(this.warehouseName);
                        console.log(error);
                    })
                }
            },
            cancel() {
              this.$router.push({ name: "WarehouseList" })
            },
            fetchCompanies() {
                Axios.get("company/", {
                    headers: auth.getAuthHeader()
                })
                .then(response => {
                    this.companies= response.data;
                });
            },
        },
        mounted() {
            this.fetchCompanies();
        },

    }
</script>

<style scoped>
</style>
