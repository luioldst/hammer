<template>
    <div class="form-container-inner form-container">    
        <div class="heading" style="margin-bottom: 1.5rem;">
            <h2 class="h2-md">
                {{ texts.title }}

            </h2>

             <h1 class="text-sans h1-md">
                {{ texts.body }}
            </h1>
        </div>
        <div class="custom-column four-col min-two-col">
            <div v-for="item in selection_parsed" :key="`selection-${item.symptom}`">
                
                <div class="form-group btn-selection" >
                    <input @change="handleChange($event)" :id="`selection-${item.symptom}`" type="checkbox" v-model="selected" :value="item">
                    <label :for="`selection-${item.symptom}`">{{ item.titel }}</label>

                </div>
            </div>
        </div>
        <div class="actions">
            <button v-if="screen > 0" @click="handlePrevious" class="link form-btn form-btn-back">Back</button>
            <button @click="store" class="link form-btn">Next</button>
        </div>
    </div>
</template>

<script>
const _ = require('lodash');
import $http from '../api.service';
export default {
    props: {
        texts: {
            type: Object,
            required: true,
            default: {
                title: '',
                body: ''
            }
        },
        screen: {
            type: Number,
            required: true
        },

        selection: {
            type: Array
        },

        previousStatic: {
            type: Boolean,
            default: false
        },
        token: {
            required: true
        }
    },

    data () {
        return {
            selection_parsed: [],
            selected: []
        }
    },

    created () {
        if (this.$store.state[`fv_${this.screen}`]) {
            this.selected = this.$store.state[`fv_${this.screen}`];
        }

        if (this.selection.length) {
            this.parseRawSelection()
        }
    },

    watch: {
        selection (data) {
            data.length && this.parseRawSelection();
        },

        selected: {
            handler (newData, oldData) {
                
            },
            deep: true
        }
    },

    computed: {
        
        screenLocal () {
            return this.screen;
        }
    },

    methods: {

        handleChange (event) {
            if (!event.target.checked) {
                
                this.$emit('delete', event.target.id.split('-')[1]);
            }
        },

        handlePrevious () {
            if (this.screen > 0) {
                let screen = parseInt(this.screen.toString()) - 1
                this.updateScreen(screen, this.$store.state[`fv_${screen}`].length ? true : false);
            }
        },


        parseRawSelection () {
            this.selection_parsed = _.map(this.selection, item => {
                return {
                    titel: item.titel,
                    symptom: item.id,
                    history_symptom: '',
                    rating_symptom: ''
                }
            });


            if (this.$store.state[`fv_${this.screen}`]) {
                this.mergeLocalData();
            }
        },

        mergeLocalData () {

            this.selection_parsed.forEach ( (item, index) => {
                
                
                let isFound = _.find(this.$store.state[`fv_${this.screen}`], [ 'symptom', item.symptom ]);

                if (isFound) {
                    this.selection_parsed[index].history_symptom = isFound.history_symptom;
                    this.selection_parsed[index].rating_symptom = isFound.rating_symptom;
                }
            });  
        },

        store () {

            if (!this.selected.length) {
                this.updateData();
            } else {
                this.storeLocally(this.selected)
            }
        },

        updateData () {

            this.$emit('loading', true)

            $http.instance.post(`/v2/self-assessment-report-choices/`, [], {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then ( () => {
                let screen = parseInt(this.screen.toString());
                this.storeLocally([]);
                this.$emit('loading', false)

                
            });
        },

        storeLocally (data = []) {
            let local = this.$store.state[`fv_${this.screen}`]
            local = data;
            this.$store.commit('SET_LOCAL_DATA', {
                key: `fv_${this.screen}`,
                data: local
            });

            let screen = parseInt(this.screen.toString());
            let rating_screen = true;

            if (data.length) {
                screen = this.screen;
                rating_screen = true;
            } else {
                screen++
                rating_screen = false;
            }   

            this.updateScreen(screen, rating_screen);
        },

        updateScreen (screen, rating_screen) {

            this.$emit('update-screen', {
                screen: screen,
                rating_screen: rating_screen
            })
        },
        
    }
}
</script>
