<template>
    <div>
        <p>
            Menstrual Cycle
        </p>

        <h1>
            What best describes your period?
        </h1>

        <div class="three-col">
            <div class="form-group" v-for="item in choices">
                <label :for="`symptom-${item.slug}`">{{ item.name }}</label>
                <input v-model="selected" :value="item" :id="`symptom-${item.slug}`" name="period" type="radio">
            </div>
            
        </div>

        <button @click="setActiveScreen('birthday-female')" class="link">BACK</button>
        <button @click="proceed" class="link">NEXT</button>
    </div>
</template>
<script>

import $http from './../api.service';
import activeScreen from './../active-screen.service';

export default  {

    mixins: [ activeScreen ],

    data () {
        return {
            choices: [
                {
                    name: `It's regular`,
                    slug: 'regular'
                },

                {
                    name: `I am on Birth control`,
                    slug: 'birth'
                },

                {
                    name: `It's irregular`,
                    slug: 'irregular'
                },

                {
                    name: `Last period over A year ago`,
                    slug: 'over'
                },                
            ],
            selected: ''
        }
    },

    mounted () {
        this.populateLocalData();
    },

    computed: {
        back () {
            let back = 'thyroid-imbalance';
            if (this.$store.state.local['thyroid-imbalance']) {
                if (this.$store.state.local['thyroid-imbalance'].length) {
                    back = 'thyroid-imbalance-rating'
                }
            } 

            return back;
        }
    },

    methods: {
        proceed (data) {

            $http.instance.put(`/v1/fake-profile-update/${this.$store.state.username}/`, {
                period_choice_fake: this.selected.slug
            }).then ( response => {

                this.updateLocalData();

                if (this.selected.slug == 'regular') {
                    this.$store.commit('SET_SCREEN', 'period-date');
                } else {
                    this.$store.commit('SET_SCREEN', 'estrogen-imbalance');
                }

                
                this.updateLocalData(this.selected)
            })
        },

        populateLocalData () {
            if (this.$store.state.local['period']) {
                this.selected = this.$store.state.local['period'];
            }
        },

        updateLocalData (data) {
            let localUser = this.$store.state.local;
            localUser['period'] = this.selected;
            this.$store.commit('SET_LOCAL_USER', localUser);
        }
    }
}
</script>