<template>
	<div id="app">
		<navbar-main></navbar-main>
		<router-view/>
	</div>
</template>

<script>
import Vue from 'vue'
import NavbarMain from '@/components/NavbarMain'
import { firebase } from '@/firebase'

// add main-navbar as component
Vue.component('navbar-main', NavbarMain)

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
