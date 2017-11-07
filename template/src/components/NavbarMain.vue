<template>
	<nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<router-link class="navbar-item" to="/">
				<img src="./../assets/logo.png">
				<strong>\{{ appName }}</strong>
			</router-link>
			<div class="navbar-burger" v-bind:class="{'is-active': showMenu}" data-target="navMenu" v-on:click="toggleMenu">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<div class="navbar-menu" v-bind:class="{'is-active': showMenu}" v-if="user" id="navMenu">
			<div class="navbar-end has-dropdown">
				<div class="navbar-item has-dropdown is-hoverable">
					<div class="navbar-link">
						\{{ user.displayName }}
					</div>
					<div class="navbar-dropdown">
						<a v-on:click="logout" class="navbar-item">Logout</a>
					</div>
				</div>

			</div>
		</div>
	</nav>
</template>

<script>
import { firebase } from '@/firebase'
import config from '@/config'

export default {
	name: 'NavbarMain',
	data () {
		return {
			appName: config.appName,
			showMenu: false
		}
	},
	computed: {
		user () {
			return this.$store.state.user
		}
	},
	methods: {
		toggleMenu () {
			this.showMenu = !this.showMenu
		},
		logout () {
			this.showMenu = false
			firebase.auth().signOut()
		}
	}
}
</script>

<style scoped>
nav.navbar {
	margin-bottom: 1rem;
}
</style>
