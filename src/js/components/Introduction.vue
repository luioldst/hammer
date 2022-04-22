<template>
<div class="a-container" >
    <div class="heading">
        <h2>
            OK, LET'S START YOUR FREE VISIT

        </h2>
        <h1 class="h1-lg h1-intro">
            Please, introduce Yourself.
        </h1>
    </div>

    <div class="form-container">
    <div class="form-group">
        <input placeholder="First Name" :class="{ error : name_error }" type="text" v-model="name">
        <p style="color: red" v-if="name_error">{{ name_error }}</p>
    </div>

    <div class="custom-column two-col" style="align-items: flex-start">
        <div class="form-group">
            <input placeholder="Email Address" type="email" :class="{ error : email_error }" v-model="email">
            <p style="color: red" v-if="email_error">
                <small>{{ email_error }}</small>
            </p>
        </div>

        <div class="form-group" style="position: relative; top: 4px;">
            <select v-model="MPA" :class="{ error : mpa_error }">
                <option value="Closest Metro" selected>Closest Metro</option>
                <option v-for="mpa in MPA_selection"  :key="`MPA-${mpa.id}`" :value="mpa.id">{{ mpa.city_name }}</option>
            </select>
            <p style="color: red" v-if="mpa_error">{{ mpa_error }}</p>
        </div>
    </div>
    
    
    <div class="form-group">
        <select v-model="gender" :class="{ error : gender_error }">
            <option value="--Gender--">--Gender--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
        <p style="color: red" v-if="gender_error">{{ gender_error }}</p>
    </div>

    <div class="form-group form-group-checkbox intro-checkbox">
        <input id="terms" type="checkbox" :true-value="true" v-model="agree">
        <label for="terms">I agree to the <a href="/terms" target="_blank">Terms and Conditions</a>, <a href="/privacy" target="_blank">Privacy Policy</a> and <a href="/telehealth" target="_blank">Telehealth Consent</a></label>
        <p style="color: red" v-if="terms_error">{{ terms_error }}</p>
    </div>

    <p class="note" style="margin-top: 15px;">Please note: email addresses are immediately processed once entered.
    </p> 

    </div>
    <div class="actions">
        <button v-if="!sending" class="link form-btn btn-long" @click="validate">Next</button>
        <button v-else disabled class="link form-btn btn-long">Submitting...</button>

        <p style="color: red; margin-top: 15px" v-if="$store.state.general_error" class="error">There has been an error processing your request.</p>
    </div>


    <div id="modalExistingAssessment" v-if="logged_in" style="position: fixed; display: flex; left: 0;" class="modal-assessment">
        <div class="modal-content">

            <div class="modal-body" style="padding-top: 45px; padding-bottom: 45px;">
                <h1 class="heading-13" style="padding-bottom: 30px;">You have already completed a self assessment.</h1>

                <p style="font-size: 20px; line-height: 30px;">Would you like to <a style="color: #98a481" @click="redirectExisting('recommendation')" href="#">view your recommendations</a> or <a href="#" @click="redirectExisting('free-visit')" style="color: #98a481">start a new self assessment</a>?</p>

            </div>
        </div>
    </div>


    

</div>
</template>

<script>
const _ = require('lodash');
import $http from './../api.service';
import axios from 'axios';

import { redirectMixin } from './../redirect.mixin'

const GENDER_DEFAULT = '--Gender--';
const MPA_DEFAULT = 'Closest Metro';

export default {

    mixins: [ redirectMixin ],

    data () {
        return {
            name: '',
            gender: GENDER_DEFAULT,
            MPA: MPA_DEFAULT,
            email: '',
            MPA_selection: [],
            agree: false,

            name_error: '',
            email_error: '',
            mpa_error: '',
            gender_error: '',
            terms_error: '',
            sending: false
        }
    },

    created () {
        this.getCMSData();

        window.addEventListener('offline', () => this.$store.state.general_error = false);
    },  

    methods: {
        getCMSData () {
            this.$store.state.general_error = false;
            $http.instance.get('/v1/router/mpa/').then (response => {
                this.MPA_selection = response.data;
                // this.populateLocally();
            }).catch(error => {
                this.$store.state.general_error = true;
            });

            if (this.$store.state.username) {
                $http.instance.get(`/v1/fake-profile/${this.$store.state.username}/`).then (response => {
                    this.$store.commit('SET_LOCAL_DATA', {
                        key: 'user',
                        data: response.data.user_data
                    });
                    // this.populateLocally();
                });

                
            }   
        },

        populateLocally () {
            if (this.$store.state.user) {
                this.name = this.$store.state.user['name'] || '';
                this.MPA = this.$store.state.user['MPA'] || '';
                this.gender = this.$store.state.user['gender'] || '';
                this.email = this.$store.state.user['user_fake_profile'] || '';
            }
            
        },

        validate () {
            
            let valid = true;
            this.name_error = '';
            this.mpa_error = '';
            this.gender_error = '';
            this.email_error = '';
            this.terms_error = '';


            if (!this.name) {
                this.name_error = 'Name is required';
                valid = false;
            }

            if (!this.MPA || this.MPA == MPA_DEFAULT) {
                this.mpa_error = 'Metro is required';
                valid = false;
            }

            if (!this.gender || this.gender == GENDER_DEFAULT) {
                this.gender_error = 'Gender is required';
                valid = false;
            }

            if (!this.email) {
                this.email_error = 'Email is required';
                valid = false;
            }

            if (!this.agree) {
                this.terms_error = 'You must agree with the terms and conditions';
                valid = false;
            }
            valid && this.login();
        },

        createProfile () {
            this.$store.state.general_error = false;
            $http.instance.post('/v1/fake-profile-create/', {
                Cache_id: '',
                MPA: this.MPA,
                Traffic_Source: '',
                gender: this.gender,
                name: this.name,
                user_fake_profile: this.email,
                url: `${localStorage.getItem('first_visit_url')}`
            }).then ( response => {
                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'screen',
                    data: this.gender == 'male' ? 'thyroid-imbalance' : 'birthday-female'
                });
                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'assessment',
                    data: 'ongoing'
                });

                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'username',
                    data: response.data.user_data.slug
                });

                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'user',
                    data: response.data.user_data
                });

                
            }).catch( error => {

                this.$store.state.general_error = true;
                
                let errors = error['response'];
                if (errors) {
                    _.forEach(errors.data, (item, key) => {

                        if (key == 'user_fake_profile') {
                            this.email_error = 'Email is not valid';
                            
                        }

                        if (key == 'email' && item[0] == 'Email Already exists, Kindly login.') {
                            this.email_error = 'Your email is already registered in the system. Please check your email for your recurring self assessment link.';
                            this.sendEmail()
                        }
                    })
                };

                
            } )
        },

        sendEmail () {
            axios.post(`https://ixn4rd4s84.execute-api.us-west-1.amazonaws.com/prod/email-recurring-self-assessment-link?em=${this.email}`).then ( response => {
                return;
            } ).catch( error => {
                this.$store.state.general_error = true;
            } )
        }
    }
    
}
</script>
