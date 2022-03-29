
import $http from './api.service';
export default {

    data() {
        return {
            selected: []
        }
    },
    methods: {
        populateLocalData() {
            if (this.$store.state.local[this.LOCAL_KEY]) {
                this.selected = this.$store.state.local[this.LOCAL_KEY];
            }
        },


        store(data) {

            let params = data.map(item => {
                return {
                    symptom: item.symptom,
                    rating_symptom: item.rating_symptom,
                    history_symptom: item.history_symptom
                }
            });

            $http.instance.post(`/v1/fake-profile-symptoms/${this.$store.state.username}/`, params).then(response => {
                this.updateLocalData(data)
                this.$store.commit('SET_SCREEN', this.NEXT);

            });
        },

        updateLocalData(data) {

            let parsed = _.map(data, item => {
                return {
                    name: item.name,
                    symptom: item.symptom,
                    history_symptom: item.history_symptom,
                    rating_symptom: item.rating_symptom,
                }
            })
            let localUser = this.$store.state.local;
            localUser[this.LOCAL_KEY] = parsed;
            this.$store.commit('SET_LOCAL_USER', localUser);
        }
    }
}