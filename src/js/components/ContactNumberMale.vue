<template>
    <div>
        <contact-number next="result" :previous="$store.state.local['cancer_future'] ? 'sorry' : 'birthday-male'"></contact-number>
    </div>
</template>

<script>
const _ = require('lodash');
import $http from '../api.service';
import ContactNumber from './ContactNumber.vue';
export default {

    components: {
        ContactNumber
    },

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
