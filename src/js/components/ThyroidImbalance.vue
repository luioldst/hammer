<template>
    <div>

        <div class="heading">
            <h2 class="h2-md">
                YOUR ANSWERS ARE CRUCIAL TO GENERATE RECOMMENDATIONS!

            </h2>
            <h1 class="text-sans h1-md">
                Do you ever experience any of the following?
            </h1>
        </div>

        
        <symptoms-selection
            :urls="urls"
            :selection="selection"
        ></symptoms-selection>
        
        
    </div>
</template>

<script>
import SymptomsSelection from './SymptomsSelection.vue';
import $http from './../api.service';
const _ = require('lodash');
export default {
    components: { SymptomsSelection },

    data () {
        return {
            selection: [],
            urls: {
                next_empty: 'testosterone-imbalance',
                next: 'thyroid-imbalance-rating',
                previous: 'introduction',
                local_key: 'thyroid-imbalance',
                cms_slug: 'thyroid-imbalance'
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
