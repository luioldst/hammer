<template>
    <div>
        <multiple-selection
            title="HAIR LOSS AND FATIGUE ARE LINKED TO THYROID DYSFUNCTION."
            question="Ever experience any of the following?"
            :choices="symptoms"
            next=""
            :previous="previousRoute"
            vue-key="estrogen-imbalance"
            :stored="$store.state.local[LOCAL_KEY]"

            @store="store"
        ></multiple-selection>
    </div>
</template>

<script>
import femaleSelection from './../female-symptoms-selection.service';
export default  {

    mixins: [ femaleSelection ],

    data () {
        return {
            LOCAL_KEY: 'testosterone-low',
            CMS_KEY: 'testosterone-low',
            NEXT: 'testosterone-low-rating',
            NEXT_EMPTY: 'testosterone-high',
            PREVIOUS: 'progesterone-imbalance',
        }
    },

    
}
</script>