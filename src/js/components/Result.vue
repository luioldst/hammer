<template>
    <div>
        Success! User details:
        <pre>{{ user }}</pre>
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
            console.log(this.headers);
            axios.get(`${$http.loggedInUrl}/v1/patient-profile/`, { 
                headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
            }).then ( response => {
                let patient = response.data[0];
                this.user = response.data[0];
                localStorage.setItem('email', patient.user_email);
                localStorage.setItem('name', patient.name);
            })
        }
    }
}
</script>