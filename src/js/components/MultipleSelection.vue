<template>
    <div>
        <p>
            {{ title }}
        </p>

        <h1>
            {{ question }}
        </h1>

        <div class="three-col">
            <div class="form-group" :key="item.symptom" v-for="item in choices">
                <label :for="`symptom-${item.symptom}`">{{ item.titel ? item.titel : item.name }}</label>
                <input v-model="selected_symptoms" :value="item" :id="`symptom-${item.symptom}`" type="checkbox">
            </div>
            
        </div>

        <button @click="setActiveScreen(previous)" class="link">BACK</button>
        <button @click="proceed" class="link">NEXT</button>
        
    </div>
</template>
<script>
import activeScreen from './../active-screen.service';
const HISTORY_KEY = 'history_symptom';
const RATING_KEY = 'rating_symptom';
const _ = require('lodash');
export default  {

    mixins: [activeScreen],

    props: {
        title: {
            type: String,
            required: true
        },

        question: {
            type: String,
            required: true
        },

        choices: {
            type: Array
        },

        stored: {
            type: Array
        },

        next: {
            type: String
        },

        previous: {
            type: String
        },

        vuexKey: {
            type: String
        }

    },

    data () {
        return {
            selected_symptoms: []
        }
    },

    watch: {
        choices (value)  {
            this.selected_symptoms = this.stored || [];
            this.symptoms = this.choices;
            this.updateChoices();
        }
    },

    methods: {
        proceed () {

            
            
            
            this.$emit('store', this.selected_symptoms)
        },

        updateChoices () {
            _.forEach(this.symptoms, (item, index) => {
                let choiceFound = _.find(this.selected_symptoms, { name: item.name } );
                if(choiceFound) {
                    this.symptoms[index][HISTORY_KEY] = choiceFound[HISTORY_KEY]
                    this.symptoms[index][RATING_KEY] = choiceFound[RATING_KEY]
                } 
            });
        },
    }
}
</script>