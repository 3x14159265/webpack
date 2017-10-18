<template>
	<nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<a class="navbar-item" href="#">
				<img src="./../assets/logo.png">
				<strong>{{ appName }}</strong>
			</a>
			<div class="navbar-burger" data-target="navMenu">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		<div class="navbar-menu" v-if="user" id="navMenu">
			<div class="navbar-end has-dropdown">
				<div class="navbar-item has-dropdown is-hoverable">
					<div class="navbar-link">
						{{ user.displayName }}
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
import { firebase } from './../firebase'
import config from './../config/config'

export default {
	name: 'MainNavbar',
	data () {
		return {
			appName: config.appName
		}
	},
	computed: {
		user () {
			return this.$store.state.user
		}
	},
	methods: {
		logout () {
			firebase.auth().signOut()
		}
	}
}
</script>
