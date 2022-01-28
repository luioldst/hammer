import axios from 'axios';
import $http from './api.service';

export const redirectMixin = {
    data () {
        return {
            logged_in: false
        }
    },

    methods: {
        login () {

            axios.create().post(`https://admin.thrivelab.com/api/token/`, {
                email: this.email,
                password: '12345678'
            }).then( response => {
                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'assessment',
                    data: 'done'
                })
                localStorage.setItem('access', response.data.access);
                this.logged_in = true;
                this.getExistingPatientProfile();
            }).catch(error => {
                this.createProfile();
            });
        },

        getExistingPatientProfile () {
            axios.get(`${$http.loggedInUrl}/v1/patient-profile/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
            }).then ( response => {
                localStorage.setItem('gender', response.data[0].gender);
                localStorage.setItem('phone', response.data[0].phone.phone);
                localStorage.setItem('xx', response.data[0].user_id);    
            })

        },

        redirectExisting (page) {

            if (page == 'free-visit') {
                window.location.href = `https://thrivelab.com/sa?client=${localStorage.getItem('phone')}`
            } else {
                let gender = localStorage.getItem('gender');
                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'screen',
                    data: 'result'
                });
                localStorage.setItem('assessment', 'done');

                let url = '';

                if (gender = 'male') {
                    url = '/recommendation-mens'
                } else {
                    url = '/recommendation-womens'
                }

                window.location.href = url;
            }

        }
    }
}