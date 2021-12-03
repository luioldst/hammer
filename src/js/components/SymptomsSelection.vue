<template>
    <div>
        
        
        <div class="form-group" v-for="item in selection_parsed" :key="`selection-${item.id}`">
            <label :for="`selection-${item.id}`">{{ item.titel }}</label>
            <input :id="`selection-${item.id}`" type="checkbox" v-model="selected" :value="item">
            
        </div>

        <button @click="updateScreen(previous)">Back</button>
        <button @click="store">Next</button>
    </div>
</template>

<script>
const _ = require('lodash');
import $http from './../api.service';
export default {
    props: {
        urls: {
            type: Object,
            required: true
        },

        selection: {
            type: Array
        }
    },

    data () {
        return {
            selection_parsed: [],
            selected: []
        }
    },

    created () {
        if (this.$store.state.local[this.urls.local_key]) {
            this.selected = this.$store.state.local[this.urls.local_key];
        }
        
    },

    watch: {
        selection (data) {
            
            data.length && this.parseRawSelection();
        },
    },

    methods: {
        parseRawSelection () {
            this.selection_parsed = _.map(this.selection, item => {
                return {
                    titel: item.titel,
                    id: item.id,
                    history_symptom: '',
                    rating_symptom: ''
                }
            });


            if (this.$store.state.local[this.urls.local_key]) {
                this.mergeLocalData();
            }
        },

        mergeLocalData () {

            this.selection_parsed.forEach ( (item, index) => {
                
                let isFound = _.find(this.$store.state.local[this.urls.local_key], [ 'id', item.id ]);

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

            $http.instance.post(`/v1/fake-profile-symptoms/${this.$store.state.username}/`, []).then ( () => {
                this.$emit('store', this.selected);
                this.storeLocally();
                this.updateScreen(this.urls.next_empty);
            });
        },

        storeLocally (data = []) {
            let local = this.$store.state.local;
            local[this.urls.local_key] = data;
            this.$store.commit('SET_LOCAL_DATA', {
                key: 'local',
                data: local
            });

            this.updateScreen(this.urls.next);

            
        },

        updateScreen (screen) {
            this.$store.commit('SET_LOCAL_DATA', {
                key: 'screen',
                data: screen
            })
        }
    },

    computed: {
        previous () {
            let previousComponent = this.urls['previous'];

            if (previousComponent !== 'introduction') {
                return this.$store.state.local[previousComponent].length ? `${this.urls['previous']}-rating` : this.urls['previous'];
            } else {
                return previousComponent;
            }

            
        }
    }
    
}
</script>
