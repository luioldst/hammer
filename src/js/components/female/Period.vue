<template>
    <div>

        <div class="heading">
            <h2 class="h2-md">
                MENSTRUAL CYCLE

            </h2>
            <h1 class="text-sans h1-md">
                What best describes your period?
            </h1>
        </div>


        <div class="form-container-inner form-container container-period">    
            <div class="custom-column two-col min-two-col">
                <div v-for="item in selection" :key="`selection-${item.slug}`">
                    <div class="form-group btn-selection" >
                        
                        <input :id="`selection-${item.slug}`" type="radio" name="period" v-model="selected" :value="item">
                        <label :for="`selection-${item.slug}`">{{ item.name }}</label>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="actions">
            <button class="link form-btn form-btn-back btn-wide" @click="updateScreen('birthday-female')">Back</button>
            <button class="link form-btn" @click="store">Next</button>

            <p style="color: red; margin-top: 15px" v-if="$store.state.general_error" class="error">There has been an error processing your request.</p>
        </div>

        <custom-progress :progress="20"></custom-progress>
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
        this.$store.state.general_error = false;

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
            }).catch( error => {
                this.$store.state.general_error = true;
            } );
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
