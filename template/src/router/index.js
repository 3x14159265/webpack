import Vue from 'vue'
import Router from 'vue-router'
import LoadingScreen from '@/components/LoadingScreen'
import UserDashboard from '@/components/UserDashboard'
import UserRegister from '@/components/UserRegister'
import UserLogin from '@/components/UserLogin'
import UserResetPassword from '@/components/UserResetPassword'
import { firebase } from './../firebase'

Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/loading',
			name: 'LoadingScreen',
			component: LoadingScreen
		},
		{
			path: '/register',
			name: 'UserRegister',
			component: UserRegister
		},
		{
			path: '/login',
			name: 'UserLogin',
			component: UserLogin
		},
		{
			path: '/reset-password',
			name: 'UserResetPassword',
			component: UserResetPassword
		},
		{
			path: '/dashboard',
			name: 'UserDashboard',
			component: UserDashboard
		},
		{ path: '*', redirect: '/loading' }
	]
})

router.beforeEach((to, from, next) => {
	if(!firebase.auth().currentUser
		&& to.name != 'UserRegister'
		&& to.name != 'UserLogin'
		&& to.name != 'UserResetPassword'
		&& to.name != 'LoadingScreen') next({ path: '/loading'})
	else next()
})

export default router
