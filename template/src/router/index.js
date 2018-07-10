import Vue from 'vue'
import Router from 'vue-router'

import Store from '@/store'
import UserDashboard from '@/components/UserDashboard'
import UserSignin from '@/components/UserSignin'
import UserSignup from '@/components/UserSignup'
import UserPasswordReset from '@/components/UserPasswordReset'

Vue.use(Router)

const router = new Router({
	routes: [{
		path: '/login',
		name: 'UserSignin',
		component: UserSignin
	}, {
		path: '/register',
		name: 'UserSignup',
		component: UserSignup
	}, {
		path: '/reset-password',
		name: 'UserPasswordReset',
		component: UserPasswordReset
	}, {
		path: '/dashboard',
		name: 'UserDashboard',
		component: UserDashboard,
		meta: {
			auth: true
		}
	},
	{ path: '*', redirect: '/dashboard' }]
})

router.beforeEach((to, from, next) => {
	// Check for requiresAuth guard
	if (to.matched.some(record => record.meta.auth)) {
		if (!Store.getters.user) {
			Store.commit('setRouteAttempt', to.fullPath)
			next({
				path: '/login'
			})
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
