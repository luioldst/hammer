<template>
    <div class="recommendation-mens" style="max-width: 1920px">

        
        <div class="custom-column two-col">
            <div style="max-width: 440px;">
                <p class="h1-md heading-1">Hi {{ user.name }},</p>

                <div class="text-recommendation">
                    <p>
                        We've analyzed your self-assessment responses and your personal health goals.
                    </p>

                    <p class="text-lowercase">
                        It appears that your {{ top_three.join( ', ' ) }} levels are significantly compromised.
                    </p>

                    <p >
                        Based on your stated goals of <span class="text-lowercase"> {{ goals.length ? goals.join(', ') : '0' }}</span> we can guide you toward an evidence-based, natural solution that's customized to your needs.
                    </p>

                    <a href="https://thrivelab.zohobookings.com/#/customer/4079544000000970272" target="_blank" class="link black-button black-button-black-hover">Book your free consultation now</a>
                </div>
            </div>

            <div style="max-width: 440px;" class="progress-recommendation">
                <p>
                    PROBABILITY OF TESTOSTERONE AND HORMONE IMBALANCE THAT WILL NEGATIVELY IMPACT ACHIEVING YOUR HEALTH GOALS
                </p>

                <div v-for="(rating, key) in ratings" :key="key" class="ratings-recommendation-bar">
                    <p class="bar__title">{{ key }}</p>
                    <div :style="{ width: `${rating*10}px` }"></div>

                    <p class="bar__percentage">{{ rating*10 }}%</p>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>
import axios from 'axios';
import $http from './../api.service';
export default {

    data () {
        return {
            top_three: [],
            user: {},
            goals: [],
            ratings: {}
        }
    },

    mounted () {
        this.getUser();
        this.getTopThree();
        this.getRatings();
    },

    methods: {
        getUser () {
            axios.get(`${$http.loggedInUrl}/v1/patient-profile/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
            }).then ( response => {

                localStorage.setItem('vuex', '{}')

                this.user = response.data[0];

                if (this.user.user_goals !== 0) {
                    this.goals = this.user.user_goals.map ( item =>{
                        return item.goals_assig
                    })
                }
            }); 
        },

        getRatings () {
            axios.get(`${$http.loggedInUrl}/v2/Patient-top-three-symptoms/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
            }).then ( response => {
                this.ratings = response.data;
            });
        },

        getTopThree () {
            axios.get(`${$http.loggedInUrl}/v1/Patient-top-three-symptoms/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
            }).then ( response => {
                this.top_three = response.data.map ( item => {
                    return item.extra.disease;
                });
            }); 
        }
    }
    
}
</script>
