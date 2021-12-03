import Vue from 'vue';
import store from './store';
import App from './components/App.vue';
import Introduction from './components/Introduction.vue';
import ThyroidImbalance from './components/ThyroidImbalance.vue';
import ThyroidImbalanceRating from './components/ThyroidImbalanceRating.vue';
import TestosteroneImbalance from './components/TestosteroneImbalance.vue';
import TestosteroneImbalanceRating from './components/TestosteroneImbalanceRating.vue';
import Goals from './components/Goals.vue';
import Cancer from './components/Cancer.vue';
import BirthdayMale from './components/BirthdayMale.vue';
import BirthdayFemale from './components/BirthdayFemale.vue';
import ContactNumberMale from './components/ContactNumberMale.vue';
import Result from './components/Result.vue';


// Components / female
Vue.component('birthday-female', BirthdayFemale);

// Components / male
Vue.component('introduction', Introduction);
Vue.component('thyroid-imbalance', ThyroidImbalance);
Vue.component('thyroid-imbalance-rating', ThyroidImbalanceRating);
Vue.component('testosterone-imbalance', TestosteroneImbalance);
Vue.component('testosterone-imbalance-rating', TestosteroneImbalanceRating);
Vue.component('goals', Goals);
Vue.component('cancer', Cancer);
Vue.component('birthday-male', BirthdayMale);
Vue.component('contact-number-male', ContactNumberMale);
Vue.component('result', Result);

new Vue({
  el: '#app',
  store: store,
  render(h) { 
      return h(App) 
    }
})