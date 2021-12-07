<template>
    <div>

        <div class="heading">
            <h2 class="h2-md">
                LOW TESTOSTERONE IMBALANCE

            </h2>
            <h1 class="text-sans h1-md">
                Tell us about your symptom severity.
            </h1>
        </div>
        
        <symptoms-rating
            :urls="urls"
            local-key="estrogen-imbalance"
        ></symptoms-rating>

        <custom-progress :progress="49"></custom-progress>
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
