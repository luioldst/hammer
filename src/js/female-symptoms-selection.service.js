import activeScreen from './active-screen.service';
import $http from './api.service';

export default {

    mixins: [activeScreen],

    data() {
        return {
            symptoms: [],
            selected: []
        }
    },

    created() {

        this.getCMSContent();
        this.populateLocalData();
    },

    computed: {
        previousRoute() {
            let previous = this.PREVIOUS;

            if (this.$store.state.local[this.PREVIOUS].length) {
                previous = `${this.PREVIOUS}-rating`
            }

            return previous;
        }
    },

    methods: {

        populateLocalData() {
            if (this.$store.state.local[this.LOCAL_KEY]) {
                this.selected = this.$store.state.local[this.LOCAL_KEY];
            }
        },

        getCMSContent() {
            $http.instance.get(`/v1/desease-read-only/female/`).then(response => {

                response.data.forEach(item => {
                    let symptoms = [];
                    if (item.slug == this.CMS_KEY) {
                        this.symptoms = item.symptoms_des;
                    }
                });



                this.symptoms = this.symptoms.map(item => {
                    return {
                        name: item.titel,
                        symptom: item.id,
                        rating_symptom: '',
                        history_symptom: ''
                    }
                })
            })
        },
        store(data) {

            if (data.length) {
                this.updateLocalData(data, this.LOCAL_KEY)
                this.$store.commit('SET_SCREEN', this.NEXT);
            } else {
                this.saveEmpty();

            }
        },

        updateLocalData(data, key) {
            let localUser = this.$store.state.local;
            localUser[key] = data;

            this.$store.commit('SET_LOCAL_USER', localUser);
        },

        saveEmpty() {
            $http.instance.post(`/v1/fake-profile-symptoms/${this.$store.state.username}/`, []).then(response => {
                this.updateLocalData([], this.LOCAL_KEY)
                this.$store.commit('SET_SCREEN', this.NEXT_EMPTY);


            });
        }
    }
}