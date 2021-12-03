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
import $http from './../../api.service';
const _ = require('lodash');
export default {
    components: { SymptomsSelection },

    data () {
        return {
            selection: [],
            urls: {
                next_empty: 'goals',
                next: 'thyroid-rating',
                previous: 'testosterone-high',
                local_key: 'thyroid',
                cms_slug: 'thyroid'
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
