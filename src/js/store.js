import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        screen: 'introduction',
        local: {},
        username: '',
        user: {
            name: ''
        }
    },
    plugins: [
        createPersistedState()
    ],

    mutations: {
        SET_LOCAL_DATA (state, value) {
            state[value.key] = value.data;
        },

        DELETE (state, value) {
            state[value] && delete state[value]
        }
    }
})