<template>
	<section class="section">

		<b-container>
			<b-row>
				<b-col cols="12" sm="6" offset-sm="3" class="m-auto">
					<b-form @submit="signup">

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

						<b-button type="submit" variant="primary" :disabled="$store.getters.isLoading">Sign up</b-button>
					</b-form>
				</b-col>
			</b-row>

			<b-row>
				<b-col cols="12" sm="6" offset-sm="3" class="m-auto">
					<b-link to="/login">
						<small>Already have an account?</small>
					</b-link>
				</b-col>
			</b-row>
		</b-container>

	</section>
</template>

<script>
import { FirebaseApp } from '@/FirebaseApp'

export default {
	name: 'UserSignup',
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
		async signup (event) {
			event.preventDefault()

			this.error = undefined

			this.$store.commit('setLoading', true)
			let result = await FirebaseApp.signup(this.email, this.password)
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
