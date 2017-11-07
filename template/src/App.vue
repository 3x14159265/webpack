<template>
	<div id="app">
		<main-navbar></main-navbar>
		<router-view/>
	</div>
</template>

<script>
import Vue from 'vue'
import MainNavbar from './components/MainNavbar'
import { firebase } from './firebase'

// add main-navbar as component
Vue.component('main-navbar', MainNavbar)

export default {
	name: 'app',
	created () {
		// listen to auth changes
		// if user is logged in, redirect to main page for user
		// otherwise force login
		firebase.auth().onAuthStateChanged((user) => {
			if(user && user.displayName) {
				this.$store.commit('setUser', firebase.auth().currentUser)
				this.$router.push('/dashboard')
			} else if(!user) {
				this.$router.push('/login')
			}
		})
	}
}
</script>

<style>
	@import './../node_modules/bulma/css/bulma.css';
</style>
