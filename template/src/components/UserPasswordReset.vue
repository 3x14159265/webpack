<template>
	<section class="section container">

		<div class="row">
			<div class="col-12 col-sm-6 offset-sm-3 m-auto">
				<b-form @submit="reset">

					<b-form-group label="Email" label-for="inputEmail">
						<b-form-input id="inputEmail" type="email" v-model="email" required placeholder="Enter email">
						</b-form-input>
					</b-form-group>

					<b-form-group v-if="error" class="text-danger">
						<small>{{ error }}</small>
					</b-form-group>

					<b-form-group v-if="success" class="text-success">
						<small>Email sent! Please follow the instructions in your email.</small>
					</b-form-group>

					<b-button type="submit" variant="primary" :disabled="$store.getters.isLoading">Request Instructions</b-button>
				</b-form>

			</div>
		</div>

	</section>
</template>

<script>
import { FirebaseApp } from '@/FirebaseApp'

export default {
	name: 'UserPasswordReset',
	data () {
		return {
			email: undefined,
			error: undefined,
			success: false
		}
	},
	methods: {
		async reset (event) {
			event.preventDefault()

			this.error = undefined
			this.success = false

			this.$store.commit('setLoading', true)
			let result = await FirebaseApp.resetPassword(this.email)
			this.$store.commit('setLoading', false)

			if (result.error) {
				this.error = result.message
			} else {
				this.success = true
			}
		}
	}
}
</script>
