<template>
    <div>

         <div class="heading" style="margin-bottom: 1.5rem;">
            <h2 class="h2-md">
                {{ texts.title }}

            </h2>

            <h1 class="text-sans h1-md">
                Tell us about your <br />
                symptom severity.
            </h1>
        </div>

        <table class="table-symptoms">
            <thead>
                <tr>
                    <th width="33%">Symptom</th>
                    <th width="33%">Severity*</th>
                    <th width="25%">History*</th>
                </tr>
            </thead>

            <tbody>
                
                <tr v-for="(symptom, index) in symptoms" :key="`symptom-${symptom.symptom}`">
                    <td><div><span class="symptoms-table-th-mobile">Symptom*</span>{{ symptom.titel }}</div></td>
                    <td>
                        <div>
                        <span class="symptoms-table-th-mobile">Severity*</span>
                        
                        <div class="rating-selection" style="">
                            <div v-for="rating in rating_max" :key="`rating-${rating}`">
                                <div class="form-group btn-selection btn-circle" >
                                    <input :id="`rating-${symptom.symptom}-${rating}-severity`" type="radio" :name="`severity-${symptom.symptom}`" v-model="symptoms[index]['rating_symptom']" :value="rating">
                                    <label :for="`rating-${symptom.symptom}-${rating}-severity`">{{ rating }}</label>

                                </div>
                            </div>
                        </div>
                        </div>

                        <p class="error" v-if="symptoms[index].rating_error" style="color: red">Rating is required.</p>
                    </td>
                    <td>
                        
                        <div>
                            <span class="symptoms-table-th-mobile">History*</span>
                            <select v-model="symptoms[index].history_symptom" >
                                <option :value="item.id" v-for="item in history" :key="item.cms_slug">{{ item.history }}</option>
                            </select>
                        </div>


                        <p class="error" v-if="symptoms[index].history_error" style="color: red">History is required.</p>

                    </td>
                </tr>
            </tbody>
        </table>

  
        <div class="actions">
            <button class="link form-btn form-btn-back" @click="handlePrevious()">Back</button>
            <button class="link form-btn btn-long" @click="validate">Next</button>
        </div>
    </div>
</template>

<script>
const _ = require('lodash');
import $http from './../api.service';
export default {
    props: {
        texts: {
            type: Object,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        screen: {
            type: Number,
            required: true
        }
    },

    data () {
        return {
            symptoms: [],
            history: [],
            rating_max: 5,
            valid: true
        }
    },

    created () {
        this.symptoms = this.$store.state[`fv_${this.screen}`];
        this.getCMSData();
    },

    methods: {
        handlePrevious() {
            this.updateScreen(this.screen, false);

        },
        getCMSData () {
            $http.instance.get('/v1/router/history/').then ( response => {
                this.history = response.data
            } )
        },

        updateScreen (screen, rating_screen) {
            this.$emit('update-screen', {
                screen: screen,
                rating_screen: rating_screen
            })
        },

        

        store () {
            let data = _.map(this.symptoms, item => {
                return {
                    symptom: item.symptom,
                    rating_symptom: item.rating_symptom,
                    history_symptom: item.history_symptom,
                }
            })

            $http.instance.post(`/v2/self-assessment-report-choices/`, [...data], {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }).then ( () => {
                this.$emit('store', this.symptoms);
                this.storeLocally(this.symptoms);

                let screen = parseInt(this.screen.toString()) + 1;
                this.updateScreen(screen, false);
            });
        },

        storeLocally (data = []) {

            data.forEach ( (item, index) => {
                delete data[index].history_error;
                delete data[index].rating_error;
            });

            let local = this.$store.state[`fv_${this.screen}`];
            local = data;
            this.$store.commit('SET_LOCAL_DATA', {
                key: `fv_${this.screen}`,
                data: local
            });      
        },

        validate () {
            this.valid = true;
            this.symptoms.forEach ( (item, index) => {
                if (!item.history_symptom) {
                    this.symptoms[index]['history_error'] = true;
                    this.valid = false;
                } else {
                    this.symptoms[index]['history_error'] = false;
                }

                if (!item.rating_symptom) {
                    this.symptoms[index]['rating_error'] = true;
                    this.valid = false;
                } else {
                    this.symptoms[index]['rating_error'] = false;
                }
            });

            let symptoms = JSON.stringify(this.symptoms);
            this.symptoms = [];
            this.symptoms = JSON.parse(symptoms);

            if (this.valid) {
                this.store();
            }

            
        },
    },

    computed: {
        
    }
    
}
</script>
