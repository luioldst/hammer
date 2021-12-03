<template>
    <div>
        
        
        <div class="form-group" v-for="item in selection" :key="`selection-${item.id}`">
            <label :for="`selection-${item.id}`">{{ item.titel }}</label>
            <input :id="`selection-${item.id}`" type="checkbox" v-model="selected" :value="item">
            
        </div>

        <button @click="updateScreen(previous)">Back</button>
        <button @click="store">Next</button>
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
            this.selected = this.$store.state.local('goals');
        }

        this.getCMSData();
        
    },

    computed: {
        previous () {
            console.log(this.$store.state.local['testosterone-imbalance'].length);
            return this.$store.state.local['testosterone-imbalance'].length ? 'testosterone-imbalance-rating' : 'testosterone-imbalance';
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

                this.updateScreen('cancer')
            })
        }
        
    }
    
}
</script>
