<template>
    <div>
        <symptoms-selection
            :urls="urls"
            :selection="selection"
            :previous-static="true"
        ></symptoms-selection>
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
