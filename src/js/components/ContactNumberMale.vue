<template>
    <div>
        
        <h1>Please provide your phone number so we can text you a link to your results.</h1>
        <div class="form-group" >
            <input maxlength="10" @keypress="isNumber($event)" placeholder="(XXX) XXXXXXX" type="text" v-model="phone">
            
        </div>

        <button @click="updateScreen('goals')">Back</button>
        <button @click="store">Next</button>
    </div>
</template>

<script>
const _ = require('lodash');
import $http from '../api.service';
export default {

    data () {
        return {
            phone: ''
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
                
                this.updateScreen('result');
            })
        }
        
    }
    
}
</script>
