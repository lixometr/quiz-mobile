import Vue from 'vue'
import { QuizId } from '../constants'
import App from './App.vue'

import './assets/styles/css/tailwind.css'
import './assets/styles/sass/index.sass'

Vue.config.productionTip = false

const app = new Vue({
  render: h => h(App),
});

app.$mount(QuizId);
