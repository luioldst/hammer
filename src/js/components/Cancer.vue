<template>
    <div>
        
        <div class="heading">
            <h2 class="">
                ONE LAST THING

            </h2>
            <h1 class="text-sans h1-md">
                Do you have a history of prostate cancer?
            </h1>
        </div>

        <div class="form-container-inner form-container">    
            <div class="" style="display: flex; justify-content: center">
                <div style="margin-right: 15px;">
                    <div class="form-group btn-selection" >
                        <input id="yes" type="radio" :value="true" name="cancer" v-model="selected">
                        <label for="yes">Yes</label>
                    </div>
                </div>
                <div>
                    <div class="form-group btn-selection" >
                        <input id="no" type="radio" :value="false" name="cancer" v-model="selected">
                        <label for="no">No</label>
                        
                        
                    </div>
                </div>
            </div>
        </div>

        <div class="actions">
            <button @click="updateScreen('goals')" class="link form-btn form-btn-back">Back</button>
            <button @click="store" class="link form-btn">Next</button>
        </div>

        
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
