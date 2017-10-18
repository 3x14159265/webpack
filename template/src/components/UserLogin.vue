<template>
	<section class="section">
		<div class="container is-fluid">

			<div class="columns">
				<div class="column is-half is-offset-one-quarter">

					<div class="field">
						<label class="label is-medium">Email</label>
						<div class="control">
							<input v-model.trim="email" class="input is-medium"
								type="email" placeholder="Enter your email"
								@blur="$v.email.$touch()" required>
						</div>
					</div>

					<div class="field">
						<label class="label is-medium">Password</label>
						<div class="control">
							<input v-model.trim="password" class="input is-medium"
								type="password" placeholder="Enter your password"
								required>
						</div>
					</div>

					<div class="field">
						<div class="control has-text-centered">
							<button v-on:click="login" :disabled="$v.$invalid"
								v-bind:class="{'is-loading': loading}"
								type="submit" class="button is-link is-medium">Login</button>
						</div>
					</div>

				</div>
			</div>

			<div class="columns">
				<div class="column has-text-centered is-size-7">
					<p>Don't have an account? <router-link to="/register">Sign up here</router-link></p>
					<p><router-link to="/reset-password">Forgot password?</router-link></p>
				</div>
			</div>

		</div>
	</section>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { firebase } from './../firebase'

export default {
	name: 'UserLogin',
	mixins: [validationMixin],
	created () {
		// if user is logged in already, rediret to main user page
		if(firebase.auth().currentUser) this.$router.push('/dashboard')
	},
	data () {
		return {
			email: undefined,
			password: undefined,
			loading: undefined,
			error: undefined
		}
	},
	validations: {
		email: {
			required,
			email
		},
		password: {
			required
		}
	},
	methods: {
		login () {
			this.error = undefined
			this.loading = true
			firebase.auth().signInWithEmailAndPassword(this.email, this.password)
				.catch((error) => {
					console.log(error)
					this.error = error.message
				})
		}
	}
}
</script>
