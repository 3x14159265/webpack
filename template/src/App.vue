<template>
	<div id="app">
		<main-navbar></main-navbar>
		<router-view/>
	</div>
</template>

<script>
import MainNavbar from './components/MainNavbar'
import { firebase } from './firebase'

export default {
	name: 'app',
	created () {
		// listen to auth changes
		// if user is logged in, redirect to main page for user
		// otherwise force login
		firebase.auth().onAuthStateChanged((user) => {
			this.$store.commit('setUser', user)
			if(user) {
				this.$router.push('/dashboard')
			} else {
				this.$router.push('/login')
			}
		})
	}
}
</script>

<style>
	@import './../node_modules/bulma/css/bulma.css'
</style>
<style>
	@import './assets/app.css'
</style>
<style>
	@import 'https://fonts.googleapis.com/css?family=Lato'
</style>
