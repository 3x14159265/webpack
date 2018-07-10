// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import firebase from 'firebase'

import App from '@/App'
import router from '@/router'
import store from '@/store'
import NavBar from '@/components/NavBar'

import '@/FirebaseApp'

import '@/assets/scss/style.scss'

Vue.use(BootstrapVue)
Vue.component('nav-bar', NavBar)

Vue.config.productionTip = process.env.NODE_ENV === 'production'

let app

firebase.auth().onAuthStateChanged(user => {
	if (!app) {
		console.log('init Vue app: ' + process.env.NODE_ENV)
		/* eslint-disable no-new */
		app = new Vue({
			el: '#app',
			router,
			store,
			components: {
				App
			},
			template: '<App/>'
		})
	}
	store.commit('setUser', user)
	console.log('auth changed', user)
})
