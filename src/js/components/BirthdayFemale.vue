<template>
    <div>

      <splash v-if="seconds > 0"></splash>
      <template v-else>
        <birthday 
        
          next="period"
          :previous="url"
        ></birthday>

        <custom-progress :progress="10"></custom-progress>
      </template>
    </div>
</template>

<script>
import Birthday from './Birthday.vue';
export default {
  components: { Birthday },

  data () {
    return {
      url: '',
      seconds: 5
    }
  },

  mounted () {
    this.url = `${location.protocol}//${location.host}`;

    this.startTimer();
    this.$store.state.general_error = false;
  },

  methods: {
    startTimer () {
        const timer = setInterval ( () => {
            this.seconds = this.seconds - 1;
            if (this.seconds < 1) {
                clearInterval(timer)
            }
        }, 1000)
    }
  }
    
}
</script>
