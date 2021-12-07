<template>
    <div>
        <div class="heading">
            <h2 class="h2-md">
                PROGESTERONE IMBALANCE

            </h2>
            <h1 class="text-sans h1-md">
                What are Your Symptoms?
            </h1>
        </div>
        <symptoms-selection
            :urls="urls"
            :selection="selection"
        ></symptoms-selection>

        <custom-progress :progress="39"></custom-progress>
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
                next_empty: 'testosterone-low',
                next: 'progesterone-imbalance-rating',
                previous: 'estrogen-imbalance',
                local_key: 'progesterone-imbalance',
                cms_slug: 'progesterone-imbalance'
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
