// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import router from './router'
import MainNavbar from './components/MainNavbar'
import App from './App'
import store from './store'

Vue.config.productionTip = false
Vue.use(Vuelidate)

// add main-navbar as global component
Vue.component('main-navbar', MainNavbar)

new Vue({
	el: '#app',
	store,
	router,
	template: '<App/>',
	components: { App }
})
