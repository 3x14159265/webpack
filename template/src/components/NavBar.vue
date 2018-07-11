<template>

	<b-navbar toggleable="md" type="light" variant="light">
		<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

		<b-navbar-brand to="/">
			<img src="@/assets/logo.svg" class="logo">
		</b-navbar-brand>

		<b-collapse is-nav id="nav_collapse">
			<!-- Right aligned nav items -->
			<b-navbar-nav class="ml-auto">
				<b-nav-item-dropdown right v-if="user">
					<!-- Using button-content slot -->
					<template slot="button-content">
						\{{ user.email }}
					</template>
					<b-dropdown-item @click="logout">Log out</b-dropdown-item>
				</b-nav-item-dropdown>
			</b-navbar-nav>

		</b-collapse>
	</b-navbar>

</template>

<script>
import { FirebaseApp } from '@/FirebaseApp'

export default {
	name: 'NavBar',
	computed: {
		user () {
			return this.$store.getters.user
		}
	},
	methods: {
		async logout () {
			await FirebaseApp.signout()
			this.$router.push('/login')
		}
	}
}

</script>

<style scoped>

</style>
