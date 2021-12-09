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
            user: {},
            cookies: []
        }
    },
    

    methods: {

        breakdownCookie () {
            let cookies = document.cookies.split('; ');

            if (cookies.length > 1) {
                cookies.forEach( (item, index) => {

                    if(index > 0) {
                        let value = item.split('=');

                        this.cookies.push([value[0], value[1]]);
                    }
                    
                })
            }

            console.log(this.cookies);
        },

        getUser () {
            let self = this;
            axios.get(`${$http.loggedInUrl}/v1/patient-profile/`, { 
                headers: { Authorization: `Bearer ${document.getItem('access')}` }
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