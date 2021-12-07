<template>
    <div>
       
    </div>
</template>

<script>

import axios from 'axios';
import $http from './../api.service';
export default {
    mounted () {
        this.getUser();
    },

    data () {
        return {
            user: {}
        }
    },
    

    methods: {
        getUser () {
            let self = this;
            axios.get(`${$http.loggedInUrl}/v1/patient-profile/`, { 
                headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
            }).then ( response => {
                let patient = response.data[0];
                this.user = response.data[0];
                localStorage.setItem('email', patient.user_email);
                localStorage.setItem('name', patient.name);
                localStorage.setItem('gender', patient.gender);

                localStorage.removeItem('vuex');

                this.redirectUSer();
            })
        },

        redirectUSer () {
            let gender = localStorage.getItem('gender');
            if (gender == 'male') {
                window.location.href = `${location.protocol}//${location.hostname}/recommendation-mens`;
            } else {
                window.location.href = `${location.protocol}//${location.hostname}/recommendation-womens`;
            }
        }
    }
}
</script>