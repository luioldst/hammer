import Vue from 'vue';
import store from './store';
import App from './components/App.vue';
import Sorry from './components/Sorry.vue';
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
import ContactNumberFemale from './components/female/ContactNumberFemale.vue';
import Result from './components/Result.vue';
import Period from './components/female/Period.vue';
import PeriodDate from './components/female/PeriodDate.vue';
import EstrogenImbalance from './components/female/EstrogenImbalance.vue';
import EstrogenImbalanceRating from './components/female/EstrogenImbalanceRating.vue';
import ProgesteroneImbalance from './components/female/ProgesteroneImbalance.vue';
import ProgesteroneImbalanceRating from './components/female/ProgesteroneImbalanceRating.vue';
import TestosteroneLow from './components/female/TestosteroneLow.vue';
import TestosteroneLowRating from './components/female/TestosteroneLowRating.vue';
import TestosteroneHigh from './components/female/TestosteroneHigh.vue';
import TestosteroneHighRating from './components/female/TestosteroneHighRating.vue';
import RecommendationMens from './components/RecommendationMens.vue';
import FreeVisit from './components/FreeVisit.vue';

import Thyroid from './components/female/Thyroid.vue';
import ThyroidRating from './components/female/ThyroidRating.vue';
import Progress from './components/Progress.vue';
import Splash from './components/Splash.vue';


// Components / female
Vue.component('birthday-female', BirthdayFemale);
Vue.component('period', Period);
Vue.component('period-date', PeriodDate);
Vue.component('estrogen-imbalance', EstrogenImbalance);
Vue.component('estrogen-imbalance-rating', EstrogenImbalanceRating);
Vue.component('progesterone-imbalance', ProgesteroneImbalance);
Vue.component('progesterone-imbalance-rating', ProgesteroneImbalanceRating);
Vue.component('testosterone-low', TestosteroneLow);
Vue.component('testosterone-low-rating', TestosteroneLowRating);
Vue.component('testosterone-high', TestosteroneHigh);
Vue.component('testosterone-high-rating', TestosteroneHighRating);
Vue.component('thyroid', Thyroid);
Vue.component('thyroid-rating', ThyroidRating);
Vue.component('contact-number-female', ContactNumberFemale);

// Components / male
Vue.component('introduction', Introduction);
Vue.component('thyroid-imbalance', ThyroidImbalance);
Vue.component('thyroid-imbalance-rating', ThyroidImbalanceRating);
Vue.component('testosterone-imbalance', TestosteroneImbalance);
Vue.component('testosterone-imbalance-rating', TestosteroneImbalanceRating);
Vue.component('recommendation-mens', RecommendationMens);
Vue.component('goals', Goals);
Vue.component('cancer', Cancer);
Vue.component('birthday-male', BirthdayMale);
Vue.component('contact-number-male', ContactNumberMale);

// General
Vue.component('result', Result);
Vue.component('custom-progress', Progress);
Vue.component('sorry', Sorry);
Vue.component('splash', Splash);
Vue.component('free-visit', FreeVisit);

new Vue({
  el: '#app',
  store: store,
  render(h) { 
      return h(App) 
    }
})