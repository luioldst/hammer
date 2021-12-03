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
                next_empty: 'testosterone-imbalance',
                next: 'testosterone-imbalance',
                previous: 'thyroid-imbalance',
                local_key: 'thyroid-imbalance',
                cms_slug: 'thyroid-imbalance'
            }
        }
    }
    
}
</script>
