<template>
	<section class="section">
		<div class="container is-fluid">
			
			<div class="columns">
				<div class="column is-one-third is-offset-one-third has-text-centered">
					<button class="button"
						v-on:click="loginWith('facebook')">
						<span>Sign in with Facebook</span>
					</button>
				</div>
			</div>

			<div class="columns">
				<div class="column is-one-third is-offset-one-third has-text-centered">
					<button class="button"
						v-on:click="loginWith('github')">
						<span>Sign in with Github</span>
					</button>
				</div>
			</div>

			<div class="columns">
				<div class="column is-one-third is-offset-one-third has-text-centered">
					<button class="button"
						v-on:click="loginWith('google')">
						<span>Sign in with Google</span>
					</button>
				</div>
			</div>

			<div class="columns">
				<div class="column is-one-third is-offset-one-third has-text-centered">
					<button class="button"
						v-on:click="loginWith('twitter')">
						<span>Sign in with Twitter</span>
					</button>
				</div>
			</div>

			<div class="columns">
				<div class="column is-one-third is-offset-one-third has-text-centered">
					<hr>
				</div>
			</div>

			<div class="columns">
				<div class="column is-one-third is-offset-one-third">
					<div class="field">
						<label class="label">Email</label>
						<div class="control">
							<input v-model.trim="email" class="input"
								type="email" placeholder="Enter your email"
								@blur="$v.email.$touch()" required>
						</div>
					</div>

					<div class="field">
						<label class="label">Password</label>
						<div class="control">
							<input v-model.trim="password" class="input"
								type="password" placeholder="Enter your password"
								required>
						</div>
					</div>

					<div class="field has-text-centered has-text-danger" v-if="error">
						\{{ error }}
					</div>

					<div class="field">
						<div class="control has-text-centered">
							<button v-on:click="login" :disabled="$v.$invalid || loading"
								v-bind:class="{'is-loading': loading}"
								type="submit" class="button">Sign in</button>
						</div>
					</div>

				</div>
			</div>

			<div class="columns">
				<div class="column has-text-centered is-size-7">
					<p>Don't have an account? <router-link to="/register">Sign up</router-link></p>
					<p><router-link to="/reset-password">Forgot password?</router-link></p>
				</div>
			</div>

		</div>
	</section>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import Firebase from 'firebase'
import { firebase, database } from '@/firebase'

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
					this.loading = false
					this.error = error.message
				})
		},
		loginWith (platform) {
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
					let user = firebase.auth().currentUser
					// save user to firestore
					return database.collection('users').doc(user.uid)
						.set({
							name: user.displayName,
							email: user.email
						})
				})
		}
	}
}
</script>
