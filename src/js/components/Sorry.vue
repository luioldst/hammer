<template>
    <div class="a-container">
        <div class="heading">
            <h2>
                WE'RE SORRY

            </h2>
            <h1 class="h1-lg h1-intro">
                Unfortunately, we are currently unable to treat you.
            </h1>
        </div>

        <p style="margin: 60px 0 30px; font-size: 16px; text-align: center; line-height: 1.5;">
            Our current model has some exclusions based on age and history of conditions. We are working on providing treatments for current exclusions.
        </p>

        <div class="form-group form-group-checkbox intro-checkbox" style="width: 100%; padding: 0;">
            <input id="terms" type="checkbox" :true-value="true" v-model="contact">
            <label for="terms">Please contact me when you are able to offer treatment.</label>
        </div>

        <div class="actions">
            <button class="link form-btn form-btn-back" @click="updateScreen('cancer')">Back</button>
            <button class="link form-btn btn-long" @click="store">Finish</button>

            <p style="color: red; margin-top: 15px" v-if="$store.state.general_error" class="error">There has been an error processing your request.</p>
        </div>
    </div>
</template>

<script>
import $http from '../api.service';
export default {
    mounted () {
        this.getUser();
    },

    data () {
        return {
            user: {},
            contact: false
        }
    },

    mounted () {
        this.contact = this.$store.state.local['cancer_future'] || false;
    },
    

    methods: {

        updateScreen (screen) {
            this.$store.commit('SET_LOCAL_DATA', {
                key: 'screen',
                data: 'cancer'
            });
        },

        store () {
            $http.instance.put(`/v1/fake-profile-update/${this.$store.state.username}/`, {
                cancer_future: this.contact
            }).then ( response => {
                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'screen',
                    data: 'contact-number-male'
                });

                let local = this.$store.state.local;
                local['cancer_future'] = this.contact;

                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'local',
                    data: local
                });

                this.$store.commit('SET_LOCAL_DATA', {
                    key: 'screen',
                    data: 'contact-number-male'
                });
            }).catch( error => {
                this.$store.state.general_form = true;
            } );
        }
    }
}
</script>