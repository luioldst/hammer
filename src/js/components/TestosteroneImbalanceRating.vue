<template>
    <div>
        
        <symptoms-rating
            :urls="urls"
            local-key="thyroid-imbalance"
        ></symptoms-rating>
    </div>
</template>

<script>
import SymptomsRating from './SymptomsRating.vue';
const _ = require('lodash');
export default {
    components: { SymptomsRating },

    data () {
        return {
            urls: {
                next_empty: 'goals',
                next: 'goals',
                previous: 'thyroid-imbalance',
                local_key: 'testosterone-imbalance',
                cms_slug: 'testosterone-imbalance'
            }
        }
    }
    
}
</script>
