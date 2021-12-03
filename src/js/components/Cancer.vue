<template>
    <div>
        
        <h1>Do you have a history of prostate cancer?</h1>
        <div class="form-group" >
            <label for="yes">Yes</label>
            <input id="yes" type="radio" :value="true" name="cancer" v-model="selected">
            
        </div>
        <div class="form-group" >
            <label for="no">No</label>
            <input id="no" type="radio" :value="false" name="cancer" v-model="selected">
            
        </div>

        <button @click="updateScreen('goals')">Back</button>
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
            selected: false
        }
    },

    created () {
        if (this.$store.state.local['cancer']) {
            this.selected = this.$store.state.local('cancer');
        }
        
    },

    methods: {

        updateScreen (screen) {
            this.$store.commit('SET_LOCAL_DATA', {
                key: 'screen',
                data: screen
            })
        },

        store () {

            $http.instance.put(`/v1/fake-profile-update/${this.$store.state.username}/`, {
                cancer: this.selected
            }).then ( response => {
                this.$store.state.local['cancer'] = this.selected;
                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'local',
                    data: this.$store.state.local
                });

                if (this.selected) {
                    this.updateScreen('sorry')
                } else {
                    this.updateScreen('birthday-male')
                }
            })
        }
        
    }
    
}
</script>
