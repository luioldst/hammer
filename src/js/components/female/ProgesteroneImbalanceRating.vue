<template>
    <div>

        <div class="heading">
            <h2 class="h2-md">
                PROGESTERONE IMBALANCE

            </h2>
            <h1 class="text-sans h1-md">
                Tell us about your symptom severity.
            </h1>
        </div>
        
        <symptoms-rating
            :urls="urls"
            local-key="estrogen-imbalance"
        ></symptoms-rating>

        <custom-progress :progress="39"></custom-progress>
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
