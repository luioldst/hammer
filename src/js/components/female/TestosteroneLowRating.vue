<template>
    <div>
        
        <symptoms-rating
            :urls="urls"
            local-key="estrogen-imbalance"
        ></symptoms-rating>
    </div>
</template>

<script>
import SymptomsRating from '../SymptomsRating.vue';
const _ = require('lodash');
export default {
    components: { SymptomsRating },

    data () {
        return {
            urls: {
                next_empty: 'testeosterone-high',
                next: 'testosterone-high',
                previous: 'progesterone-imbalance',
                local_key: 'testosterone-low',
                cms_slug: 'testosterone-low'
            }
        }
    }
    
}
</script>
