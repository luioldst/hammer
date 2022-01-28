<template>
    <div class="app">


        <template v-if="page == 'free-visit'">
            <free-visit></free-visit>
        </template>
        <template v-if="page == 'recommendation'">
             <recommendation-mens></recommendation-mens>
        </template>
        <template v-if="page == 'assessment'">

        <introduction v-if="$store.state.screen == 'introduction'"></introduction>
        <thyroid-imbalance v-if="$store.state.screen == 'thyroid-imbalance'"></thyroid-imbalance>
        <thyroid-imbalance-rating v-if="$store.state.screen == 'thyroid-imbalance-rating'"></thyroid-imbalance-rating>
        <testosterone-imbalance v-if="$store.state.screen == 'testosterone-imbalance'"></testosterone-imbalance>
        <testosterone-imbalance-rating v-if="$store.state.screen == 'testosterone-imbalance-rating'"></testosterone-imbalance-rating>
        <goals v-if="$store.state.screen == 'goals'"></goals>
        <cancer v-if="$store.state.screen == 'cancer'"></cancer>
        <birthday-male v-if="$store.state.screen == 'birthday-male'"></birthday-male>
        <contact-number-male v-if="$store.state.screen == 'contact-number-male'"></contact-number-male>
        <contact-number-female v-if="$store.state.screen == 'contact-number-female'"></contact-number-female>
        <result v-if="$store.state.screen == 'result'"></result>
        <sorry v-if="$store.state.screen == 'sorry'"></sorry>

        <birthday-female v-if="$store.state.screen == 'birthday-female'"></birthday-female>
        <period v-if="$store.state.screen == 'period'"></period>
        <period-date v-if="$store.state.screen == 'period-date'"></period-date>
        <estrogen-imbalance v-if="$store.state.screen == 'estrogen-imbalance'"></estrogen-imbalance>
        <estrogen-imbalance-rating v-if="$store.state.screen == 'estrogen-imbalance-rating'"></estrogen-imbalance-rating>

        <testosterone-low v-if="$store.state.screen == 'testosterone-low'"></testosterone-low>
        <testosterone-low-rating v-if="$store.state.screen == 'testosterone-low-rating'"></testosterone-low-rating>

        <testosterone-high v-if="$store.state.screen == 'testosterone-high'"></testosterone-high>
        <testosterone-high-rating v-if="$store.state.screen == 'testosterone-high-rating'"></testosterone-high-rating>

        <progesterone-imbalance v-if="$store.state.screen == 'progesterone-imbalance'"></progesterone-imbalance>
        <progesterone-imbalance-rating v-if="$store.state.screen == 'progesterone-imbalance-rating'"></progesterone-imbalance-rating>

        <thyroid v-if="$store.state.screen == 'thyroid'"></thyroid>
        <thyroid-rating v-if="$store.state.screen == 'thyroid-rating'"></thyroid-rating>
        </template>

        
    </div>
</template>

<script>
export default {

    mounted () {
        // this.redirectUSer();
        // alert('HERE!!!!');
    },

    methods: {
        redirectUSer () {
            // if (localStorage.getItem('access') && this.page !== 'recommendation') {
            //     let gender = localStorage.getItem('gender');
            //     if (gender == 'male') {
            //         window.location.href = `${location.protocol}//${location.hostname}/recommendation-mens`;
            //     } else {
            //         window.location.href = `${location.protocol}//${location.hostname}/recommendation-womens`;
            //     }
            // } else {

            // }
            
        }
    },

    computed: {
        page () {
            let page = '';

            if (window.location.href.indexOf('recommendation') !== -1) {
                page = 'recommendation'
            } else if (window.location.href.indexOf('hormone-assessment') !== -1) {
                page = 'assessment';
            } else {
                page = 'free-visit'
            }

            return page;
        }
    },

    watch: {
        // '$store.state.screen' (value) {
        //     if (value == '/') {
        //         window.location.replace(`${location.protocol}://${location.hostname}`);
        //     }
        // }
    }
    
}
</script>
