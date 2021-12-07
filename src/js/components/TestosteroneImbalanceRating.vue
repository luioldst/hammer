<template>
    <div>
        <div class="heading">
            <h2 class="h2-md">
                20 MILLION AMERICANS HAVE SOME FORM OF THYROID DEFICIENCY.

            </h2>
            <h1 class="text-sans h1-md">
                How often do you experience the following?
            </h1>
        </div>
        
        <symptoms-rating
            :urls="urls"
            local-key="thyroid-imbalance"
        ></symptoms-rating>

        <custom-progress :progress="29"></custom-progress>
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
                previous: 'testosterone-imbalance',
                local_key: 'testosterone-imbalance',
                cms_slug: 'testosterone-imbalance'
            }
        }
    }
    
}
</script>
