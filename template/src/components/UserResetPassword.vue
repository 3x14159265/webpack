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

					<div class="field has-text-centered has-text-danger" v-if="error">
						{{ error }}
					</div>
					<div class="field has-text-centered has-text-success" v-if="success">
						An email with further instructions has been sent
					</div>

					<div class="field">
						<div class="control has-text-centered">
							<button v-on:click="reset" :disabled="$v.$invalid"
								v-bind:class="{'is-loading': loading}"
								type="submit" class="button is-link is-medium">Reset password</button>
						</div>
					</div>
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
	name: 'UserResetPassword',
	mixins: [validationMixin],
	data () {
		return {
			email: undefined,
			loading: false,
			success: undefined,
			error: undefined
		}
	},
	validations: {
		email: {
			required,
			email
		}
	},
	methods: {
		reset () {
			this.success = undefined
			this.error = undefined
			this.loading = true
			firebase.auth().sendPasswordResetEmail(this.email)
				.then(() => {
					console.log('Password Reset Email Sent!')
					this.success = true
					this.loading = false
				})
				.catch((error) => {
					console.log(error)
					this.error = error.message
					this.loading = false
				})
		}
	}
}
</script>
