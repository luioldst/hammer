<template>
    <div>
        <rating-selection
            title="20 MILLION AMERICANS HAVE SOME FORM OF THYROID DEFICIENCY."
            question="Tell us about your symptom severity."
            :stored="$store.state.local[LOCAL_KEY]"
            :next="NEXT_EMPTY"
            :previous="PREVIOUS"
            @store="store"
        ></rating-selection>
    </div>
</template>
<script>

import femaleSelectionRating from './../female-symptoms-rating.service';
export default  {

    mixins: [ femaleSelectionRating ],

    data () {
        return {
            LOCAL_KEY: 'estrogen-imbalance',
            CMS_KEY: 'estrogen-imbalance',
            NEXT: 'progesterone-imbalance',
            NEXT_EMPTY: 'progesterone-imbalance',
            PREVIOUS: 'estrogen-imbalance',
        }
    }
}
</script>