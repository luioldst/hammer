<template>
    <div>
        <div class="heading">
            <h2 class="h2-md">
                HIGH TESTOSTERONE IMBALANCE

            </h2>
            <h1 class="text-sans h1-md">
                What are Your Symptoms?
            </h1>
        </div>

        <symptoms-selection
            :urls="urls"
            :selection="selection"
        ></symptoms-selection>

        <custom-progress :progress="59"></custom-progress>
    </div>
</template>

<script>
import SymptomsSelection from './../SymptomsSelection.vue';
import $http from '../../api.service';
const _ = require('lodash');
export default {
    components: { SymptomsSelection },

    data () {
        return {
            selection: [],
            urls: {
                next_empty: 'thyroid',
                next: 'testosterone-high-rating',
                previous: 'testosterone-low',
                local_key: 'testosterone-high',
                cms_slug: 'testosterone-high'
            }
        }
    },


    mounted () {
        this.getCMSData();
        
    },
    methods: {
        getCMSData () {
            $http.instance.get('/v1/desease-read-only/female/').then ( response => {
                _.forEach(response.data, item => {
                    if (item.slug == this.urls['cms_slug']) {
                        this.selection = item.symptoms_des;
                    }
                })
            } )
        },

        
    },

    

    
    
}
</script>
