<template>
	<section class="section">
		<div class="container is-fluid">

			<div class="columns">
				<div class="column is-one-third is-offset-one-third">
					<div class="field">
						<div class="control has-text-centered">
							<button class="button is-facebook"
								v-on:click="signupWith('facebook')">
								<i class="typcn typcn-social-facebook"></i>
								<span>Sign in with Facebook</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div class="columns">
				<div class="column is-one-third is-offset-one-third">
					<div class="field">
						<div class="control has-text-centered">
							<button class="button is-github"
								v-on:click="signupWith('github')">
								<i class="typcn typcn-social-github"></i>
								<span>Sign in with Github</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div class="columns">
				<div class="column is-one-third is-offset-one-third">
					<div class="field">
						<div class="control has-text-centered">
							<button class="button is-google"
								v-on:click="signupWith('google')">
								<i class="typcn typcn-social-google"></i>
								<span>Sign in with Google</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div class="columns">
				<div class="column is-one-third is-offset-one-third">
					<div class="field">
						<div class="control has-text-centered">
							<button class="button is-google"
								v-on:click="signupWith('twitter')">
								<i class="typcn typcn-social-twitter"></i>
								<span>Sign in with Twitter</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div class="columns">
				<div class="column is-one-third is-offset-one-third has-text-centered">
					<hr>
				</div>
			</div>

			<div class="columns">

				<div class="column is-half is-offset-one-quarter">

					<div class="field">
						<label class="label is-medium">Name</label>
						<div class="control">
							<input v-model.trim="name" class="input is-medium"
								type="text" placeholder="Enter your name"
								@blur="$v.name.$touch()" required>
						</div>
						<p v-if="!$v.name.required && $v.name.$dirty" class="help is-danger">This field is required</p>
					</div>

					<div class="field">
						<label class="label is-medium">Email</label>
						<div class="control">
							<input v-model.trim="email" class="input is-medium"
								type="email" placeholder="Enter your email"
								@blur="$v.email.$touch()" required>
						</div>
						<p v-if="!$v.email.required && $v.email.$dirty" class="help is-danger">This field is required</p>
						<p v-if="!$v.email.email && $v.email.$dirty" class="help is-danger">This email is invalid</p>
					</div>

					<div class="field">
						<label class="label is-medium">Password</label>
						<div class="control">
							<input v-model.trim="password" class="input is-medium"
								type="password" placeholder="Enter your password"
								@blur="$v.password.$touch()" required>
						</div>
						<p v-if="!$v.password.required && $v.password.$dirty" class="help is-danger">This field is required</p>
						<p class="help">Minimum 6 characters</p>
					</div>

					<div class="field has-text-centered has-text-danger" v-if="error">
						{{ error }}
					</div>

					<div class="field">
						<div class="control has-text-centered">
							<button v-on:click="signup" :disabled="$v.$invalid"
								v-bind:class="{'is-loading': loading}"
								type="submit" class="button is-link is-medium">Get started for free</button>
						</div>
					</div>

				</div>
			</div>

			<div class="columns">
				<div class="column has-text-centered is-size-7">
					Already have an account? <router-link to="/login">Login here</router-link>
				</div>
			</div>

		</div>
	</section>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
import Firebase from 'firebase'
import { firebase } from './../firebase'

export default {
	name: 'UserRegister',
	mixins: [validationMixin],
	created () {
		// if user is logged in already, rediret to main user page
		if(firebase.auth().currentUser) this.$router.push('/dashboard')
	},
	data () {
		return {
			name: undefined,
			email: undefined,
			password: undefined,
			loading: undefined,
			error: undefined,
		}
	},
	validations: {
		name: {
			required
		},
		email: {
			required,
			email
		},
		password: {
			required,
			minLength: minLength(6)
		}
	},
	methods: {
		signup () {
			this.error = undefined
			this.loading = true

			firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
				.then((user) => {
					// set name for user, after registration is successful
					if(user) {
						user.updateProfile({
							displayName: this.name,
						})
						// send email verification for this user
						user.sendEmailVerification()
					}
				})
				.catch((error) => {
					console.log(error)
					this.loading = false
					this.error = error.message
				})
		},
		signupWith (platform) {
			let provider
			switch(platform) {
				case 'facebook':
					provider = new Firebase.auth.FacebookAuthProvider()
					// provider.addScope('user_birthday')
					break
				case 'google':	
					provider = new Firebase.auth.GoogleAuthProvider()
					break
				case 'twitter':	
					provider = new Firebase.auth.TwitterAuthProvider()
					break	
				case 'github':	
					provider = new Firebase.auth.GithubAuthProvider()
					break		
			}
			
			return firebase.auth().signInWithPopup(provider)
				.then((result) => {
					// store firebase current user
					return store.commit('setUser', firebase.auth().currentUser)
				})
		}
	}
}
</script>
