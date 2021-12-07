<template>
    <div>
        <div class="heading">
            <h2 class="h2-md">
                ESTROGEN IMBALANCE

            </h2>
            <h1 class="text-sans h1-md">
                Tell us about your symptom severity.
            </h1>
        </div>
        <symptoms-rating
            :urls="urls"
            local-key="estrogen-imbalance"
        ></symptoms-rating>

        <custom-progress :progress="29"></custom-progress>
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
