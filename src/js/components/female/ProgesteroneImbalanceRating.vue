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
                next_empty: 'testosterone-low',
                next: 'testosterone-low',
                previous: 'estrogen-imbalance',
                local_key: 'progesterone-imbalance',
                cms_slug: 'progesterone-imbalance'
            }
        }
    }
    
}
</script>
