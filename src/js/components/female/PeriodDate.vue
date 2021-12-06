<template>
    <div>
        <div class="heading">
            <h2 class="h2-md">
                MENSTRUAL CYCLE

            </h2>
            <h1 class="text-sans h1-md">
                First day of your last period?
            </h1>
        </div>

        <div class="form-container">
            <div id="datepicker"></div>
        </div>

        <div class="actions">
            <button class="link form-btn form-btn-back" @click="updateScreen('period')">Back</button>
            <button class="link form-btn btn-long" @click="store">Next</button>
        </div>
        
        
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
                maxDate: new Date(),
                nextArrow: '&#8250;',
                prevArrow: '&#8249;',
                defaultViewDate: new Date()
                // todayHighlight: true
            // ...options
            });

            datepicker.setDate(new Date());

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
