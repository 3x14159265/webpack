<template>
	<section class="section container">

		<div class="row align-items-center">
			<div class="col-12 col-sm-6 offset-sm-3 m-auto">
				<b-form @submit="signin">

					<b-form-group label="Email" label-for="inputEmail">
						<b-form-input id="inputEmail" type="email" v-model="email" required placeholder="Enter email">
						</b-form-input>
					</b-form-group>

					<b-form-group label="Password" label-for="inputPassword">
						<b-form-input id="inputPassword" type="password" v-model="password" required placeholder="Password">
						</b-form-input>
					</b-form-group>

					<b-form-group v-if="error" class="text-danger">
						<small>\{{ error }}</small>
					</b-form-group>

					<b-button type="submit" variant="primary" :disabled="$store.getters.isLoading">Log in</b-button>
				</b-form>
			</div>
		</div>

		<div class="row mt-4">
			<div class="col-12 col-sm-6 offset-sm-3 m-auto my-auto">
				<router-link to="/reset-password">
					<small>Forgot Password?</small>
				</router-link>
				<span><small>•</small></span>
				<router-link to="/register">
					<small>Register</small>
				</router-link>
			</div>
		</div>

	</section>
</template>

<script>
import {
	FirebaseApp
} from '@/FirebaseApp'

export default {
	name: 'UserSignin',
	data () {
		return {
			email: undefined,
			password: undefined,
			error: undefined
		}
	},
	computed: {
		user () {
			return this.$store.getters.user
		}
	},
	watch: {
		user (value) {
			if (value !== null && value !== undefined) {
				this.$router.push('/')
			}
		}
	},
	methods: {
		async signin (event) {
			event.preventDefault()

			this.error = undefined

			this.$store.commit('setLoading', true)
			let result = await FirebaseApp.signin(this.email, this.password)
			this.$store.commit('setLoading', false)

			if (result.error) {
				this.error = result.message
			} else {
				let route = this.$store.getters.routeAttempt || '/'
				this.$store.commit('setRouteAttempt', null)
				this.$router.push(route)
			}
		}
	}
}

</script>

<style scoped>

</style>
