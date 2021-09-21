import Vue from 'vue'
import App from './App.vue'
import './assets/styles/sass/index.sass'
import 'tailwindcss/dist/tailwind.min.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#apartment-quiz')
