<template>
    <div>
        
        <symptoms-rating
            :urls="urls"
            local-key="estrogen-imbalance"
        ></symptoms-rating>
    </div>
</template>

<script>
import SymptomsRating from './../SymptomsRating.vue';
const _ = require('lodash');
export default {
    components: { SymptomsRating },

    data () {
        return {
            urls: {
                next_empty: 'thyroid',
                next: 'thyroid',
                previous: 'testosterone-high',
                local_key: 'testosterone-high',
                cms_slug: 'testosterone-high'
            }
        }
    }
    
}
</script>
