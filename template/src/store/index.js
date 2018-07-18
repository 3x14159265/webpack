import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loading: false,
		routeAttempt: null,
		user: null
	},
	mutations: {
		setLoading (state, payload) {
			state.loading = payload
		},
		setRouteAttempt (state, payload) {
			state.routeAttempt = payload
		},
		setUser (state, payload) {
			state.user = payload
		}
	},
	getters: {
		isLoading: state => state.loading,
		routeAttempt: state => state.routeAttempt,
		user: state => state.user
	}
})
