<template>
    <div>
      <birthday 
        next="contact-number-male"
        previous="cancer"
      ></birthday>
    </div>
</template>

<script>
const _ = require('lodash');
import Birthday from './Birthday.vue';
export default {
  components: { Birthday },

  mounted () {
    this.$store.state.general_error = false;
  }
    
}
</script>
