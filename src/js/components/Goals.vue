<template>
    <div data-page="goals">
        <div class="heading">
            <h2 class="h2-md">
                YOU'RE AT THE BEST PART NOW!
            </h2>
            <h1 class="text-sans h1-md">
                Help us understand your goals for the future.
            </h1>
        </div>
        <div class="form-container-inner form-container">    
            <div class="custom-column four-col min-two-col">
                <div v-for="item in selection" :key="`selection-${item.id}`">
                    <div class="form-group btn-selection" >
                        <input :id="`selection-${item.id}`" type="checkbox" v-model="selected" :value="item">
                        <label :for="`selection-${item.id}`">{{ item.titel }}</label>

                    </div>
                </div>
            </div>
        </div>
        <div class="actions">
            <button @click="updateScreen(previous)" class="link form-btn form-btn-back">Back</button>
            <button @click="store" class="link form-btn btn-long">Next</button>
            <p style="color: red; margin-top: 15px" v-if="$store.state.general_error" class="error">There has been an error processing your request.</p>
        </div>

        <custom-progress :progress="$store.state.user.gender == 'male' ? 60 : 75"></custom-progress>
    </div>
</template>

<script>
const _ = require('lodash');
import $http from '../api.service';
export default {

    data () {
        return {
            selection: [],
            selected: []
        }
    },

    created () {
        if (this.$store.state.local['goals']) {
            this.selected = this.$store.state.local['goals'];
        }

        this.getCMSData();
        
    },

    mounted () {
        this.$store.state.general_error = false;
    },

    computed: {
        previous () {

            if (this.$store.state.user.gender == 'male') {
                return this.$store.state.local['testosterone-imbalance'].length ? 'testosterone-imbalance-rating' : 'testosterone-imbalance';
            } else {
                return 'thyroid'
            }
            
        }
    },

    methods: {
        getCMSData () {

            $http.instance.get(`/v1/goals/${this.$store.state.user.gender}/`).then ( response => {
                this.selection = response.data.map ( item => {
                    return {
                        titel: item.titel,
                        id: item.id
                    }
                } )
            })

            $http.instance.get(`/v1/fake-profile/${this.$store.state.username}/`).then ( response => {
                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'user',
                    data: response.data
                });
            } )
        },

        updateScreen (screen) {
            this.$store.commit('SET_LOCAL_DATA', {
                key: 'screen',
                data: screen
            })
        },

        store () {

            let data = this.selected.map( item => {
                return {
                    goals_assig: item.id
                }
            } )

            $http.instance.post(`/v1/fake-profile-goals/${this.$store.state.username}/`, data).then ( response => {
                this.$store.state.local['goals'] = this.selected;
                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'local',
                    data: this.$store.state.local
                });

                if (this.$store.state.user.gender == 'male') {
                    this.updateScreen('cancer')
                } else {
                    this.updateScreen('contact-number-female')
                }

                
            }).catch ( error => {
                this.$store.state.general_error = true;
            } )
        }
        
    }
    
}
</script>
