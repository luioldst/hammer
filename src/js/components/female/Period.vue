<template>
    <div>
        <div class="form-group" v-for="item in selection" :key="`selection-${item.slug}`">
            <label :for="`selection-${item.slug}`">{{ item.name }}</label>
            <input :id="`selection-${item.slug}`" type="radio" name="period" v-model="selected" :value="item">
            
        </div>

        <button @click="updateScreen('birthday-female')">Back</button>
        <button @click="store">Next</button>
    </div>
</template>

<script>
import $http from './../../api.service';
const _ = require('lodash');
export default {
    data () {
        return {
            selected: {
                name: `It's regular`,
                slug: 'regular'
            },
            selection: [
                {
                    name: `It's regular`,
                    slug: 'regular'
                },
                {
                    name: `I am on birth control`,
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
            urls: {
                next_empty: 'testosterone-imbalance',
                next: 'thyroid-imbalance-rating',
                previous: 'introduction',
                local_key: 'thyroid-imbalance',
                cms_slug: 'thyroid-imbalance'
            }
        }
    },

    mounted () {
        let period = this.$store.state.local['period'];

        this.selected = period ? period : {};
    },

    methods: {

        store () {
            $http.instance.put(`/v1/fake-profile-update/${this.$store.state.username}/`, {
                period_choice_fake: this.selected.slug
            }).then ( response => {

                let screen = this.selected.slug == 'regular' ? 'period-date' : 'estrogen-imbalance';

                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'screen',
                    data: screen
                });

                this.$store.state.local['period'] = this.selected;
                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'local',
                    data: this.$store.state.local
                })
            });
        },

        updateScreen (screen) {
            this.$store.commit('SET_LOCAL_DATA', {
                key: 'screen',
                data: screen
            })
        }

        
    }

    
    
}
</script>
