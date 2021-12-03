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
                next_empty: 'progesterone-imbalance',
                next: 'progesterone-imbalance',
                previous: 'estrogen-imbalance',
                local_key: 'estrogen-imbalance',
                cms_slug: 'estrogen-imbalance'
            }
        }
    }
    
}
</script>
