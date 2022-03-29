<template>
    <div>
        <p>
            Menstrual Cycle
        </p>

        <h1>
            First day of your last period?
        </h1>

        <div class="three-col">
            <div id="datepicker"></div>
            
        </div>

        <button @click="setActiveScreen('period')" class="link">BACK</button>
        <button @click="proceed" class="link">NEXT</button>
    </div>
</template>
<script>

import $http from './../api.service';
import activeScreen from './../active-screen.service';
import { Datepicker } from 'vanillajs-datepicker';
import moment from 'moment';

let DATEPICKER = '';


export default  {

    mixins: [ activeScreen ],

    data () {
        return {
            datepicker: '',
            selected: '',
            moment: ''
        }
    },

    created () {
        this.moment = moment;
    },

    mounted () {
        let self = this;
        const elem = document.getElementById('datepicker');
        const datepicker = new Datepicker(elem, {
            maxDate: new Date()
        });

        elem.addEventListener('changeDate', function (e, details) { 
           self.selected = moment(e.detail.date).format('YYYY-MM-DD');
        });

    },

    methods: {
        
        proceed () {

            $http.instance.put(`/v1/fake-profile-update/${this.$store.state.username}/`, {
                periodbirth: this.selected
            }).then ( response => {

                if (this.selected == 'regular') {
                    this.$store.commit('SET_SCREEN', 'period-date');
                } else {
                    this.$store.commit('SET_SCREEN', 'estrogen-imbalance');
                }

                
                this.updateLocalData(this.selected)
            })
        },

        populateLocalData () {
            if (this.$store.state.local['period-date']) {
                this.selected = this.$store.state.local['period-date'];
            }
        },

        updateLocalData (data) {
            let localUser = this.$store.state.local;
            localUser['period-date'] = data;
            this.$store.commit('SET_LOCAL_USER', localUser);
        }
    }
}
</script>

<style>


</style>