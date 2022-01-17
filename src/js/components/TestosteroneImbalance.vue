<template>
    <div>

        <div class="heading" data-page="imbalances">
            <h2 class="h2-md">
                HAIR LOSS AND FATIGUE ARE LINKED TO THYROID DYSFUNCTION.

            </h2>
            <h1 class="text-sans h1-md">
                Ever experience any of the following?
            </h1>
        </div>
        
        <symptoms-selection
            :urls="urls"
            :selection="selection"
        ></symptoms-selection>

        <custom-progress :progress="29"></custom-progress>
    </div>
</template>

<script>
import SymptomsSelection from './SymptomsSelection.vue';
import $http from '../api.service';
const _ = require('lodash');
export default {
    components: { SymptomsSelection },

    data () {
        return {
            selection: [],
            urls: {
                next_empty: 'goals',
                next: 'testosterone-imbalance-rating',
                previous: 'thyroid-imbalance',
                local_key: 'testosterone-imbalance',
                cms_slug: 'testosterone-imbalance'
            }
        }
    },

    mounted () {
        this.getCMSData();
        
    },
    methods: {
        getCMSData () {
            $http.instance.get('/v1/desease-read-only/male/').then ( response => {
                _.forEach(response.data, item => {
                    if (item.slug == this.urls['cms_slug']) {
                        this.selection = item.symptoms_des;
                    }
                })
            } )
        },

        
    }

    
    
}
</script>
