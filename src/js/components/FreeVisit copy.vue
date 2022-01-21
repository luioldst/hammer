<template>
    <div data-page="imbalances">
        <div v-for="(question, index) in questions"
            :key="question.id">
         <free-visit-symptoms-selection
                v-if="screen == index && !rating_screen"
                :selection="question.symptoms_des"
                :screen="screen"
                :texts="{
                    question: question.question,
                    title: question.titel
                }"
                @update-screen="handleUpdate"
                @on-select="handleSelection"
                @go-back="handleSelectionBack"
            ></free-visit-symptoms-selection>
            <free-visit-symptoms-rating :token="token"
                                        :selection="selected" v-if="screen == index && rating_screen"
                                        @on-submit="handleRatings"
                                        @go-back="handleRatingsBack"></free-visit-symptoms-rating>

        </div>

        <custom-progress :progress="19"></custom-progress>
        
        
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
            screen : '',
            selected: [],
            rating_screen: false
        }
    },

    mounted () {
        this.authenticate();
        
    },

    methods: {

        handleUpdate (args) {
            this.rating_screen = args.rating_screen;
            this.screen = args.screen;
        },

        handleSelection (data) {
            this.$store.commit('SET_LOCAL_DATA', {
                key: `fv_${this.screen}`,
                data: data
            });
            this.populateSelected(this.$store.state[`fv_${this.screen}`]);

            this.selected = data;
            if (this.selected.length) {
                this.rating_screen = true;
            } else {
                this.screen++;
            }
            
        },

        handleRatings (data) {
            this.$store.commit('SET_LOCAL_DATA', {
                key: `fv_${this.screen}`,
                data: data
            });

            this.populateSelected(this.$store.state[`fv_${this.screen}`]);

            this.screen++;
            this.rating_screen = false;
        
        },

        handleRatingsBack () {
            this.rating_screen = false;
            this.populateSelected(this.selected);
        },

        handleSelectionBack () {
            this.screen = this.screen - 1;
            
            let newData = this.questions[this.screen].symptoms_des;
            
            newData.forEach ( item => {
                if (item['history_symptom'] || item['rating_symptom']) {
                    this.rating_screen = true;
                    
                    return;
                }

                this.rating_screen = false;
            });
        },

        authenticate () {
            let url = 'https://www.thrivelab.com/free-visit/2817048360';
            let id = url.split('/');
            $http.instance.get(`/v2/patient-phone-login/${id[id.length - 1]}`).then ( response => {
                this.token = response.data.access;
                this.getCMSData();
            } );
        },

        

        getCMSData () {

            Promise.all([
                this.getAnswers(),
                this.getQuestions()
            ]).then ( response => {
                this.answers = response[0].data;
                this.questions = _.orderBy(response[1].data, [ 'priority_disease' ]);

                this.screen = 0

                this.populateSelected(this.answers.selfAssessmentSymptomChoiceModel_owner);
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

        populateSelected (screen, data) {
            // this.selected = this.$store.state[`fv_${this.screen}`]

            let selected = []

            this.questions.forEach ( (item, questionIndex) => {
                item.symptoms_des.forEach ( (symptom, symptomIndex) => {
                    let isFound = _.find(this.$store.state[`fv_${screen}`], [ 'symptom', symptom.id ]) || false;
                    if (isFound) {
                        selected.push({
                            titel: symptom.titel,
                            history_symptom: this.$store.state[`fv_${screen}`],
                        })
                    }
                });
            } );

            this.$store.commit('SET_LOCAL_DATA', {
                key: `fv_${screen}`,
                data: data
            })
        }
    }
}
</script>
