export const STORE_MUTATIONS = {
    SET_SCREEN(state, data) {
        state.screen = data;
    },

    SET_USERNAME(state, data) {
        state.username = data;
    },

    SET_USER(state, data) {
        state.user = data;
    },

    SET_LOCAL_USER(state, data) {
        state.local = data;
    },

    SET_MALE_DATA(state, data) {
        state.male_data = data;
    }
}