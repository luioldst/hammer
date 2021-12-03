<template>
<div>
    <div class="form-group">
        <input placeholder="First Name" :class="{ error : name_error }" type="text" v-model="name">
        <p style="color: red" v-if="name_error">{{ name_error }}</p>
    </div>
    <div class="form-group">
        <input placeholder="Email Address" type="email" :class="{ error : email_error }" v-model="email">
        <p style="color: red" v-if="email_error">{{ email_error }}</p>
    </div>
    <div class="form-group">
        <select v-model="MPA" :class="{ error : mpa_error }">
            <option>Closest Metro</option>
            <option v-for="mpa in MPA_selection"  :key="`MPA-${mpa.id}`" :value="mpa.id">{{ mpa.city_name }}</option>
        </select>
        <p style="color: red" v-if="mpa_error">{{ mpa_error }}</p>
    </div>
    <div class="form-group">
        <select v-model="gender" :class="{ error : gender_error }">
            <option>--Gender--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
        <p style="color: red" v-if="gender_error">{{ gender_error }}</p>
    </div>

    <div class="form-group">
        <input id="terms" type="checkbox" :true-value="true" v-model="agree">
        <label for="terms">I agree to the <a href="/terms" target="_blank">Terms and Conditions</a>, <a href="/privacy" target="_blank">Privacy Policy</a> and <a href="/telehealth" target="_blank">Telehealth Consent</a></label>
        <p style="color: red" v-if="terms_error">{{ terms_error }}</p>
    </div>

    <button class="link" @click="validate">Submit</button>


    

</div>
</template>

<script>
const _ = require('lodash');
import $http from './../api.service';
export default {
    data () {
        return {
            name: '',
            gender: 'male',
            MPA: '',
            email: '',
            MPA_selection: [],
            agree: false,

            name_error: '',
            email_error: '',
            mpa_error: '',
            gender_error: '',
            terms_error: ''
        }
    },

    created () {
        this.getCMSData();
        
    },  

    methods: {
        getCMSData () {
            $http.instance.get('/v1/router/mpa/').then (response => {
                this.MPA_selection = response.data;
                this.populateLocally();
            });

            if (this.$store.state.username) {
                $http.instance.get(`/v1/fake-profile/${this.$store.state.username}/`).then (response => {
                    this.$store.commit('SET_LOCAL_DATA', {
                        key: 'user',
                        data: response.data.user_data
                    });
                    this.populateLocally();
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

            if (!this.MPA) {
                this.mpa_error = 'Metro is required';
                valid = false;
            }

            if (!this.gender) {
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

            valid && this.createProfile();
            
        },

        createProfile () {
            $http.instance.post('/v1/fake-profile-create/', {
                Cache_id: '',
                MPA: this.MPA,
                Traffic_Source: '',
                gender: this.gender,
                name: this.name,
                user_fake_profile: this.email
            }).then ( response => {
                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'screen',
                    data: this.gender == 'male' ? 'thyroid-imbalance' : 'birthday-female'
                });

                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'username',
                    data: response.data.user_data.slug
                });

                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'user',
                    data: response.data.user_data
                })
            }).catch( error => {

                let errors = error.response.data;

                

                if (errors) {
                    _.forEach(errors, (item, key) => {

                        if (key == 'user_fake_profile') {
                            this.email_error = 'Email is not valid'
                        }
                    })
                }
            } )
        }
    }
    
}
</script>
