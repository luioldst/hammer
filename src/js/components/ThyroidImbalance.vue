<template>
    <div data-page="imbalances">
        <splash v-show="seconds > 0"></splash>
        <div v-show="seconds < 1">
            <div class="heading">
                <h2 class="h2-md">
                    YOUR ANSWERS ARE CRUCIAL TO GENERATE RECOMMENDATIONS!

                </h2>
                <h1 class="text-sans h1-md">
                    Do you ever experience any of the following?
                </h1>
            </div>


            
            <symptoms-selection
                :urls="urls"
                :selection="selection"
            ></symptoms-selection>

            <custom-progress :progress="19"></custom-progress>
        </div>
        
        
    </div>
</template>

<script>
import SymptomsSelection from './SymptomsSelection.vue';
import $http from './../api.service';
const _ = require('lodash');
export default {
    components: { SymptomsSelection },

    data () {
        return {
            selection: [],
            seconds: 5,
            urls: {
                next_empty: 'testosterone-imbalance',
                next: 'thyroid-imbalance-rating',
                previous: '',
                local_key: 'thyroid-imbalance',
                cms_slug: 'thyroid-imbalance'
            }
        }
    },

    mounted () {
        this.getCMSData();
        this.startTimer();

        this.urls.previous = `${location.protocol}//${location.hostname}`
    },
    methods: {
        startTimer () {
            const timer = setInterval ( () => {
                this.seconds = this.seconds - 1;
                if (this.seconds < 1) {
                    clearInterval(timer)
                }
            }, 1000)
        },

        getCMSData () {
            $http.instance.get('/v1/desease-read-only/male/').then ( response => {
                _.forEach(response.data, item => {
                    if (item.slug == this.urls['cms_slug']) {
                        this.selection = item.symptoms_des;
                    }
                })
            } )
        },

        
    }

    
    
}
</script>
