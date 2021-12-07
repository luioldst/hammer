<template>
    <div>

        <div class="heading">
            <h2 class="h2-md">
                LOW T AFFECTS ABOUT 4 TO 5 MILLION MEN IN THE US.

            </h2>
            <h1 class="text-sans h1-md">
                How often do you experience the following?
            </h1>
        </div>
        
        <symptoms-rating
            :urls="urls"
            local-key="thyroid-imbalance"
        ></symptoms-rating>

        <custom-progress :progress="19"></custom-progress>
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
