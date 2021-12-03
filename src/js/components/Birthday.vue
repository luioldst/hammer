<template>
    <div>
        
        <h1>What is your date of birth?</h1>
        <div class="form-group">
            <label for="month">Month</label>
            <select id="month" v-model="selected_month">
                <option v-for="month in months" :value="month" :key="`month-${month}`">{{ month }}</option>
            </select>
            
        </div>

        <div class="form-group" >
            <label for="day">Days</label>
            <select id="day" v-model="selected_day">
                <option v-for="day in days" :value="day" :key="`day-${day}`">{{ day }}</option>
            </select>
            
        </div>


        <div class="form-group" >
            <label for="year">Year</label>
            <select id="year" v-model="selected_year">
                <option v-for="year in years" :value="year" :key="`year-${year}`">{{ year }}</option>
            </select>
            
        </div>
        

        <button @click="updateScreen(previous)">Back</button>
        <button @click="store">Next</button>
    </div>
</template>

<script>
import moment from 'moment';
import $http from '../api.service';
export default {
    props: [
        'next', 'previous'
    ],

    data () {
        return {
            months: 12,
            years_end: 32,
            years_start: 91,
            selected_month: 1,
            selected_day: 1,
            selected_year: '',
        }
    },

    created () {
        if (this.$store.state.user['dateofbirth']) {
            this.parseBirthday(this.$store.state.user['dateofbirth']);
        } else {
            this.selected_year = this.years[0];
        }
        
    },

    computed: {
        years () {
            let start = 91 //current year minus 91 years
            let end = 32 //current year minus 32 years
            let current_year = parseInt(moment().format('YYYY'));

            let total_years = start - end;
            let years = [];

            for (var i = 0; i < total_years; i++) {
                years.push(current_year - 32 - i);
            }

            return years;
        },
        days () {
            let days = 31;

            switch(this.selected_month) {
                case 2:
                    days = 28;
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    days = 30;
                    break;
                default:
                    days = 31;
            }

            return days;
        }
    },

    methods: {

        parseBirthday (birthday) {
            let parsed = birthday.split('-');

            this.selected_year = parsed[0];
            this.selected_month = parsed[1];
            this.selected_day = parsed[2];
        },

        updateScreen (screen) {
            this.$store.commit('SET_LOCAL_DATA', {
                key: 'screen',
                data: screen
            })
        },

        store () {

            let bday = `${this.selected_year}-${this.selected_month}-${this.selected_day}`

            $http.instance.put(`/v1/fake-profile-update/${this.$store.state.username}/`, {
                dateofbirth: bday
            }).then ( () => {
                this.$store.state.user['dateofbirth'] = bday;
                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'user',
                    data: this.$store.state.user
                });
                this.updateScreen(this.next)
            })
        }
        
    }
    
}
</script>
