<template>
    <div>
        <h1>
            First day of your
last period?
        </h1>
        <div id="datepicker"></div>
        <button @click="updateScreen('period')">Back</button>
        <button @click="store">Next</button>
    </div>
</template>

<script>
import $http from '../../api.service';
const _ = require('lodash');
import { Datepicker } from 'vanillajs-datepicker';
import moment from 'moment';
export default {
    data () {
        return {
            selected: moment().format('YYYY-MM-DD')
        }
    },

    mounted () {    
        this.initDatepicker();
    },
    
    methods: {

        initDatepicker () {
            const elem = document.getElementById('datepicker');
            const datepicker = new Datepicker(elem, {
                maxDate: new Date()
            // ...options
            });

            elem.addEventListener('changeDate', event => {
                this.selected = moment(event.detail.date).format('YYYY-MM-DD');
            }) 
        },

        store () {
            $http.instance.put(`/v1/fake-profile-update/${this.$store.state.username}/`, {
                periodbirth: this.selected
            }).then ( response => {

                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'screen',
                    data: 'estrogen-imbalance'
                });

                this.$store.state.local['period-date'] = this.selected;
                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'local',
                    data: this.$store.state.local
                });
            });
        },

        updateScreen (screen) {
            this.$store.commit('SET_LOCAL_DATA', {
                key: 'screen',
                data: screen
            })
        }

        
    }

    
    
}
</script>
