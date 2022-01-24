<template>
    <div class="recommendation-mens" style="max-width: 1920px">

        
        <div class="custom-column two-col">
            <div style="max-width: 600px;">
                <p class="h1-md heading-1">Hi {{ user.name }},</p>

                <div class="text-recommendation">
                    <p>
                        We've analyzed your self-assessment responses and your personal health goals.
                    </p>

                    <p class="text-lowercase">
                        It appears that {{ top_three.length ? `your ${listDown(top_three)} levels are` : 'none is' }}  significantly compromised.
                    </p>

                    <p v-if="gender == 'male'">
                        Based on your stated goals of <span class="text-lowercase"> {{ goals.length ? listDown(goals) : '0' }}</span> we can guide you toward an evidence-based, natural solution that's customized to your needs.
                    </p>

                    <p v-else>
                        There is absolutely no reason for you to continue suffering with {{ symptoms.length ? listDown(symptoms) : '0' }} when you have the best evidence-based natural hormone therapy available to you.
                    </p>

                    <a :href="link" target="_blank" class="link black-button black-button-black-hover">Book your free consultation now</a>
                </div>
            </div>

            <div style="max-width: 600px;" class="progress-recommendation">
                <p>
                    PROBABILITY OF TESTOSTERONE AND HORMONE IMBALANCE THAT WILL NEGATIVELY IMPACT ACHIEVING YOUR HEALTH GOALS
                </p>

                <div v-for="(rating, key) in ratings" :key="key" class="ratings-recommendation-bar">
                    <p class="bar__title">{{ key }}</p>
                    <div :style="{ width: `${ rating < 10 ? rating*10 : 99 }%` }"></div>

                    <p class="bar__percentage">{{ rating < 10 ? rating*10 : 99 }}%</p>
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
            ratings: {},
            symptoms: [],
            gender: localStorage.getItem('gender')
        }
    },

    mounted () {
        this.validateRoute();
    },

    computed: {
        link () {
            if (this.$store.state.gender == 'male') {
                return `https://www.trythrivelab.com/men?source=${localStorage.getItem('first_visit_url')}`;
            } else {
                return `https://www.trythrivelab.com/women?source=${localStorage.getItem('first_visit_url')}`;
            }
        }
    },

    methods: {

        validateRoute () {
            if (!localStorage.getItem('access')) {
                window.location.href = '/free-hormone-assessment'
            } else {
                this.getUser();
                this.getTopThree();
                this.getRatings();
            }
        },

        listDown (arr = []) {
            return new Intl.ListFormat('en').format(arr);
        },

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

                Object.keys(response.data).forEach ( (item, key) => {
                    this.symptoms.push(item)
                } )
            });
        },

        getTopThree () {
            axios.get(`${$http.loggedInUrl}/v1/Patient-top-three-symptoms/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
            }).then ( response => {
                response.data.forEach ( item => {
                    if (this.top_three.indexOf(item.extra.disease) == -1) {
                        this.top_three.push(item.extra.disease)
                        
                    }
                });
            }); 
        }
    }
    
}
</script>
