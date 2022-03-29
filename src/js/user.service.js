import $http from './api.service';
export default {
    data() {
        return {
            user: {}
        }
    },

    created() {
        this.getUser()
    },
    methods: {
        getUser() {
            if (this.$store.state['username']) {
                $http.instance.get(`/v1/fake-profile/${this.$store.state.username}`).then(response => {
                    this.$store.commit('SET_USER', response.data);
                    this.user = response.data;

                    this.populate(response.data)
                })
            }

        },
    }
}