<template>
    <div>
         <p>
            {{ title }}
        </p>

        <h1>
            {{ question }}
        </h1>

        <div v-for="(item, index) in list">

            <div class="two-col">
                <div>Symptom: {{ item.name }}</div>
                <div></div>
                
            </div>
            <div class="two-col">
                <div>Severity</div>
                <div>
                    <div v-for="severity in 5">
                        <label :for="severity">{{ severity }}</label>
                        <input v-model="list[index]['rating_symptom']" :id="severity" type="radio" :value="severity">
                    </div>
                </div>

                <p style="color: red" class="error" v-if="item.error_rating_symptom">Severity is required.</p>
                
            </div>
            <div class="two-col">
                <div>History</div>
                <div>
                    <select v-model="list[index]['history_symptom']">
                        <option v-for="item in history" :value="item.id">{{ item.history }}</option>
                    </select>
                </div>

                <p style="color: red" class="error" v-if="item.error_history_symptom">History is required.</p>
                
            </div>

            <br></br>
        </div>

        <button @click="setActiveScreen(previous)" class="link">BACK</button>
        <button @click="validate" class="link">NEXT</button>
        
    </div>
</template>
<script>

import $http from './../api.service';
import activeScreen from './../active-screen.service';

export default  {

    mixins: [ activeScreen ],

    props: {
        title: {
            type: String,
            required: true
        },

        question: {
            type: String,
            required: true
        },

        stored: {
            type: Array
        },

        next: {
            type: String
        },

        previous: {
            type: String
        },

    },

    data () {
        return {
            list: [],
            history: []
        }
    },

    created () {
        this.list = this.stored || [];
    },

    mounted () {
        this.getCMSContent();
    },

    methods: {
        getCMSContent () {
            $http.instance.get('/v1/router/history/').then (response => {
                this.history = response.data;
            })
        },
        proceed () {
            this.$emit('store', this.list)
        },

        validate () {
            this.valid = true;
            this.list.forEach ( (item, index) => {
                this.list[index]['error_rating_symptom'] = false;
                this.list[index]['error_history_symptom'] = false;
                

                if (!item.rating_symptom) {
                    this.list[index]['error_rating_symptom'] = true;
                    this.valid = false;
                }
                if (!item.history_symptom) {
                    this.list[index]['error_history_symptom'] = true;
                    this.valid = false;
                }

            
                
            });

            let data_holder = JSON.stringify(this.list);
            this.list = JSON.parse(data_holder);


            if (this.valid) {
                
                this.proceed();
            } 
        },
    }
}
</script>