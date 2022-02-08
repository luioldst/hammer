<template>
    <div>

        <table class="table-symptoms">
            <thead>
                <tr>
                    <th width="33%">Symptom</th>
                    <th width="33%">Severity*</th>
                    <th width="25%">History*</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(symptom, index) in symptoms" :key="`symptom-${symptom.id}`">
                    <td><div><span class="symptoms-table-th-mobile">Symptom*</span>{{ symptom.titel }}</div></td>
                    <td>
                        <div>
                        <span class="symptoms-table-th-mobile">Severity*</span>
                        
                        <div class="rating-selection" style="">
                            <div v-for="rating in rating_max" :key="`rating-${rating}`">
                                <div class="form-group btn-selection btn-circle" >
                                    <input :id="`rating-${symptom.id}-${rating}-severity`" type="radio" :name="`severity-${symptom.id}`" v-model="symptoms[index]['rating_symptom']" :value="rating">
                                    <label :for="`rating-${symptom.id}-${rating}-severity`">{{ rating }}</label>

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
            <button class="link form-btn form-btn-back" @click="updateScreen(urls.previous)">Back</button>
            <button class="link form-btn btn-long" @click="validate">Next</button>
        </div>
    </div>
</template>

<script>
const _ = require('lodash');
import $http from './../api.service';
export default {
    props: {
        urls: {
            type: Object,
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
        this.symptoms = this.$store.state.local[this.urls.local_key];
        this.getCMSData();
    },

    mounted () {
        this.$store.state.general_error = false;
    },

    computed: {
        previous () {
            let previous = this.urls.previous;
            if (this.$store.state.local[this.urls.previous]) {
                if (this.$store.state.local[this.urls.previous].length ) {
                    previous = `${this.urls.previous}-rating`;
                }
            }

            return previous;
        }
    },

    methods: {
        getCMSData () {
            $http.instance.get('/v1/router/history/').then ( response => {
                this.history = response.data
            } )
        },

        updateScreen (screen) {
            this.$store.commit('SET_LOCAL_DATA', {
                key: 'screen',
                data: screen
            })
        },

        

        store () {
            let data = _.map(this.symptoms, item => {
                return {
                    symptom: item.id,
                    rating_symptom: item.rating_symptom,
                    history_symptom: item.history_symptom,
                }
            })

            $http.instance.post(`/v1/fake-profile-symptoms/${this.$store.state.username}/`, [...data]).then ( () => {
                this.$emit('store', this.symptoms);
                this.storeLocally(this.symptoms);
                this.updateScreen(this.urls.next);
            });
        },

        storeLocally (data = []) {

            data.forEach ( (item, index) => {
                delete data[index].history_error;
                delete data[index].rating_error;
            });

            let local = this.$store.state.local;
            local[this.urls.local_key] = data;
            this.$store.commit('SET_LOCAL_DATA', {
                key: 'local',
                data: local
            });

            this.updateScreen(this.urls.next);

            
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
