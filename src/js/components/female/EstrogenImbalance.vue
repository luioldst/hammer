<template>
    <div>
        <div class="heading">
            <h2 class="h2-md">
                ESTROGEN IMBALANCE

            </h2>
            <h1 class="text-sans h1-md">
                What are Your Symptoms?
            </h1>
        </div>
        <symptoms-selection
            :urls="urls"
            :selection="selection"
            :previous-static="true"
        ></symptoms-selection>

        <custom-progress :progress="29"></custom-progress>
    </div>
</template>

<script>
import SymptomsSelection from './../SymptomsSelection.vue';
import $http from './../../api.service';
const _ = require('lodash');
export default {
    components: { SymptomsSelection },

    data () {
        return {
            selection: [],
            urls: {
                next_empty: 'progesterone-imbalance',
                next: 'estrogen-imbalance-rating',
                previous: 'period',
                local_key: 'estrogen-imbalance',
                cms_slug: 'estrogen-imbalance'
            }
        }
    },

    created () {
        this.getPrevious();
    },

    mounted () {
        this.getCMSData();
        
    },
    methods: {
        getPrevious () {
            if (this.$store.state.local['period-date']) {
                this.urls.previous = 'period-date';
            }
        },

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
