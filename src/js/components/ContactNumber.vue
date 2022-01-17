<template>
    <div data-page="contact-number">
        <div class="heading">
            <h2 class="h2-md">
                ASSESSMENT COMPLETE!

            </h2>

            <h1 class="h1-lg heading-contact-number">Please provide your phone number so we can text you a link to your results.</h1>
        </div>

        <div class="form-container">
            <div class="form-group" >
                <input :class="{ error : phone_error }" maxlength="10" @keypress="isNumber($event)" placeholder="(XXX) XXXXXXX" type="text" v-model="phone">
                <p style="color: red" v-if="phone_error">{{ phone_error }}</p>
            </div>
        </div>


        <div class="actions">
            <button class="link form-btn form-btn-back" @click="updateScreen(previous)">Back</button>
            <button class="link form-btn" @click="validate">
                Final Step
            </button>
        </div>
    </div>
</template>

<script>
const _ = require('lodash');
import $http from '../api.service';
export default {
    
    props: {
        next: String,
        previous: String
    },

    data () {
        return {
            phone: '',
            phone_error: ''
        }
    },

    methods: {

        isNumber (event) {
            if (!/\d/.test(event.key)) return event.preventDefault();
        },

        updateScreen (screen) {
            this.$store.commit('SET_LOCAL_DATA', {
                key: 'screen',
                data: screen
            })
        },

        validate () {
            
            let valid = true;
            this.phone_error = '';

            


            if (!this.phone) {
                this.phone_error = 'Contact number is required';
                valid = false;
            }

            valid && this.store();
            
        },

        store () {

            let user = this.$store.state.user;

            $http.instance.post(`/v2/patient-register/`, {
                MPA: user.MPA.id,
                cancer: user.cancer,
                dateofbirth: user.dateofbirth,
                extra_slug: user.extra_slug,
                gender: user.gender,
                name: user.name,
                extra_slug: user.slug,
                patientprofile: {
                    email: user.user_fake_profile,
                    password: '12345678'
                },
                phone: this.phone,
                state: null
            }).then ( response => {

                localStorage.setItem('access', response.data.access);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('refresh', response.data.refresh);
                localStorage.setItem('xx', response.data.user_id);
            
                
                this.updateScreen(this.next);
            })
        },

        getPatientProfile () {
            
        }
        
    }
    
}
</script>
