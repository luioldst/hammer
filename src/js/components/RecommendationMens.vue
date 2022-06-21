<template>
    <div class="recommendation-mens" style="max-width: 1920px">

        
        <div class="custom-column two-col" style="align-items: flex-start">
            <div style="max-width: 600px;">
                <p class="h1-md heading-1">Hi {{ user.name }},</p>

                <div class="text-recommendation">
                    <p>
                        We've analyzed your self-assessment responses and your personal health goals. It appears that {{ top_three.length ? `your ${listDown(top_three)} levels are` : 'none is' }}  significantly compromised.
                    </p>

                    <p>Your body needs help - to not only combat the symptoms you are experiencing, but to achieve your health goals. There is no reason for you to continue to suffer when evidence-based, natural hormone therapy is easily accessible from Thrivelab.
                    </p>
                    <a :href="link" target="_blank" class="link black-button black-button-black-hover">BOOK YOUR $45 CONSULTATION</a>
                </div>
            </div>

            <div style="max-width: 600px;" class="progress-recommendation">
                <p v-if="gender == 'male'">
                    Probability of testosterone and hormone imbalance that will negatively impact achieving your health goals.
                </p>

                <p v-else>
                    Probability of hormone imbalances which contribute to your symptoms
                </p>

                <div v-for="(rating, key) in ratings" :key="key" class="ratings-recommendation-bar">
                    <p class="bar__title">{{ key }}</p>
                    <div :style="{ width: `${ rating < 10 ? rating*10 : 99 }%`,
                        background: getBackground(rating) }"></div>

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
            if (localStorage.getItem('gender') == 'male') {
                return `https://www.trythrivelab.com/men?source=${localStorage.getItem('first_visit_url')}`;
            } else {
                return `https://www.trythrivelab.com/women?source=${localStorage.getItem('first_visit_url')}`;
            }
        }
    },

    methods: {

        getBackground (rating) {
            let background = '#FFC15F';
            if (rating > 5) {
                background = '#FC6E6E';
            } else if (rating == 1) {
                background = '#8BF0B4'
            }

            return background;
        },

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
