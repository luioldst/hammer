export default {
    methods: {
        setActiveScreen(screen) {
            this.$store.commit('SET_SCREEN', screen)
        }
    }
}