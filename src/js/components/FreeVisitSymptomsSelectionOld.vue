<template>
    <div class="form-container-inner form-container">    
        <div>

            <p>{{ texts['title'] || '' }}</p>
            <h1>{{ texts['question'] || '' }}</h1>

            <div class="custom-column four-col min-two-col">
                <div v-for="item in selection_parsed" :key="`selection-${item.id}`">
                    <div class="form-group btn-selection" >
                        <input :id="`selection-${item.id}`" type="checkbox" v-model="selected" :value="item">
                        <label :for="`selection-${item.id}`">{{ item.titel }}</label>

                    </div>
                </div>
            </div>
            <div class="actions">
                <button v-if="screen != 0" class="link form-btn form-btn-back" @click="goBack()">Back</button>
                <button @click="store" class="link form-btn">Next</button>
            </div>
        </div>
    </div>
</template>

<script>
const _ = require('lodash');
import $http from './../api.service';
export default {
    props: {
        screen: '',

        selection: {
            type: Array,
            default: []
        },

        previousStatic: {
            type: Boolean,
            default: false
        },
        texts: {
            type: Object,
            deafult: {
                title: '',
                question: ''
            }
        },
        selectedSymptoms: {
            type: Array,
            default: []
        }
    },

    watch: {
        selection: {
            deep: true,
            handler: function (data) {
                console.log('SELECTED', data)
            }
        }
    },

    data () {
        return {
            selection_parsed: [],
            selected: []
        }
    },

    mounted () {

        this.selected = this.$store.state[`fv_${this.screen}`];

        if (this.selection.length) {
            this.parseRawSelection() ;
        }

        
    },

    methods: {

        parseRawSelection () {
            let selected = [];
             this.selection.forEach( item => {

                if (!this.selected.length) {
                    
                    if (item['history_symptom'] || item['rating_symptom'] ) {
                        selected.push ({
                            titel: item.titel,
                            id: item.id,
                            history_symptom: item['history_symptom'],
                            rating_symptom: item['rating_symptom']
                        });
                    }
                }

                this.selection_parsed.push({
                    titel: item.titel,
                    id: item.id,
                    history_symptom: item['history_symptom'] || '',
                    rating_symptom: item['rating_symptom'] || ''
                });
            });

            if (selected.length) {
                this.selected = selected;
            }
        },

        store () {
            this.$emit('on-select', this.selected);
        },

        updateData () {

            $http.instance.post(`/v1/fake-profile-symptoms/${this.$store.state.username}/`, []).then ( () => {
                this.$emit('store', this.selected);
                // this.updateScreen(this.urls.next_empty);
            });
        },


        updateScreen (screen) {
            this.$store.commit('SET_LOCAL_DATA', {
                key: 'screen',
                data: screen
            })
        },

        goBack () {
            this.$emit('go-back')
        }
    }
}
</script>
