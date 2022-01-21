<template>
    <div data-page="imbalances">
        <div v-for="(question, index) in questions"
            :key="question.id">
         <free-visit-symptoms-selection
                v-if="screen == index && !rating_screen"
                :selection="question.symptoms_des"
                :screen="screen"
                :token="token"
                :texts="{
                    title: question.titel,
                    body: question.question
                }"
                @update-screen="handleUpdate"
                @delete="deleteFromOriginal"
            ></free-visit-symptoms-selection>
            <free-visit-symptoms-rating :token="token"
                                        :texts="{
                                            title: question.titel
                                        }"
                                        :screen="screen"
                                        v-if="screen == index && rating_screen"
                                        @update-screen="handleUpdate"></free-visit-symptoms-rating>

        </div>

        <custom-progress :progress="progress"></custom-progress>
        
        
    </div>
</template>

<script>
import FreeVisitSymptomsSelection from './FreeVisitSymptomsSelection.vue';
import FreeVisitSymptomsRating from './FreeVisitSymptomsRating.vue';
const _ = require('lodash');
import $http from './../api.service';
import axios from 'axios';
export default {
    components: { FreeVisitSymptomsSelection, FreeVisitSymptomsRating },

    data () {
        return {
            selection: [],
            seconds: 5,
            token: '',
            questions: [],
            answers: [],
            api: {},
            screen : 0,
            selected: [],
            rating_screen: false,
        }
    },

    mounted () {
        this.authenticate();
        
    },

    methods: {

        handleUpdate (args) {
            this.rating_screen = args.rating_screen;
            this.screen = args.screen;

            if (this.screen == this.questions.length) {

                this.questions.forEach ( (item, index) => {
                    this.$store.commit('DELETE', `fv_${index}`);
                } )
                localStorage.setItem('fv_success', true);
                window.location.href = '/success';
            }
        },

        authenticate () {
            let urlSearchParams = new URLSearchParams(window.location.search);
            let params = Object.fromEntries(urlSearchParams.entries());
            localStorage.setItem('fv_success', false);

            if (params['client']) {
                let id = params['client'];
                $http.instance.get(`/v2/patient-phone-login/${id}`).then ( response => {
                    this.token = response.data.access;
                    
                    this.getCMSData();
                } );
            } else {
                window.location.href = '/';
            }

            
        },

        getCMSData () {
            Promise.all([
                this.getAnswers(),
                this.getQuestions()
            ]).then ( response => {
                this.answers = response[0].data;
                this.questions = _.orderBy(response[1].data, [ 'priority_disease' ]);

                this.screen = 0
                this.populateInitial();
            } )
        },

        getAnswers () {
            return $http.instance.get(`/v2/self-assessment-report-choices/`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
        },

        getQuestions () {
            return $http.instance.get(`/v2/disease-self-assessment/`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
        },

        populateInitial () {
            let found = {};
            let selectedFromApi = this.answers.selfAssessmentSymptomChoiceModel_owner;

            this.questions.forEach ( (item, questionIndex) => {
                item.symptoms_des.forEach ( (symptom, symptomIndex) => {
                    let isFound = _.find(selectedFromApi, [ 'symptom', symptom.id ]) || false;

                    
                    if (isFound) {
                        found[questionIndex] = found[questionIndex] || []
                        found[questionIndex].push({
                            titel: symptom.titel,
                            history_symptom: isFound['history_symptom'],
                            rating_symptom: isFound['rating_symptom'],
                            symptom: isFound.symptom
                        });
                    }
                });
            } );

            if (found) {
                Object.keys(found).forEach ( key => {
                    this.$store.commit('SET_LOCAL_DATA', {
                        key: `fv_${key}`,
                        data: found[key]
                    });
                } )
            }
        },

        populateSelected (screen, data) {
            // this.selected = this.$store.state[`fv_${this.screen}`]

            let selected = []

            this.questions.forEach ( (item, questionIndex) => {
                item.symptoms_des.forEach ( (symptom, symptomIndex) => {
                    let isFound = _.find(this.$store.state[`fv_${screen}`], [ 'symptom', symptom.id ]) || false;
                    if (isFound) {
                        selected.push({
                            titel: symptom.titel,
                            history_symptom: symptom.hi,
                        })
                    }
                });
            } );

            this.$store.commit('SET_LOCAL_DATA', {
                key: `fv_${screen}`,
                data: data
            })
        },

        deleteFromOriginal (symptom) {
            let isFound = _.find(this.answers.selfAssessmentSymptomChoiceModel_owner, [ 'symptom', parseInt(symptom) ]) || false;
            let slug = '';

            if (isFound) {

                this.questions.forEach ( (item) => {
                    item.symptoms_des.forEach ( (symptom) => {
                        if(symptom.id == isFound.symptom) {
                            slug = symptom.sasc_slug;
                        }
                    });
                });

                $http.instance.delete(`/v2/self-assessment-report-choices/${slug}/`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
            }


            
        }
    },

    computed: {
        progress () {
            let progress = 1;
            let portion = 100 / this.questions.length;
            let screen_number = this.screen + 1;

            return portion*screen_number;
        }
    }
}
</script>
