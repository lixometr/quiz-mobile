import Vue from 'vue'
import App from './App.vue'

import './assets/styles/css/tailwind.css'
import './assets/styles/sass/index.sass'

Vue.config.productionTip = false

const app = new Vue({
  render: h => h(App),
});

app.$mount('#apartment-quiz');
