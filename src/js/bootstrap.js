import $http from './api.service';
const fakeUserName = localStorage.getItem('username');

export default {
    mounted() {
        if (fakeUserName) {

        }
    },

    methods: {
        getFakeProfile() {
            $http.instance.get(`/v1/fake-profile/${fakeUserName}`).then(response => {

            });
        }
    }
}