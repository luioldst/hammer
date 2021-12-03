<template>
    <div>
        <symptoms-selection
            :urls="urls"
            :selection="selection"
        ></symptoms-selection>
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
