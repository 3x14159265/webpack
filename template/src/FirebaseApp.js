import firebase from 'firebase'
import Store from '@/store'

console.log('using env: ' + process.env.NODE_ENV)
export const FirebaseApp = firebase.initializeApp(process.env.FIREBASE_CONFIG)

FirebaseApp.signup = async (email, password) => {
	try {
		let user = await firebase.auth().createUserWithEmailAndPassword(email, password)
		await user.sendEmailVerifcation()
		Store.commit('setUser', firebase.auth().currentUser)
		return true
	} catch (err) {
		err.error = true
		return err
	}
}

FirebaseApp.signin = async (email, password) => {
	try {
		await firebase.auth().signInWithEmailAndPassword(email, password)
		Store.commit('setUser', firebase.auth().currentUser)
		return true
	} catch (err) {
		err.error = true
		return err
	}
}

FirebaseApp.signout = async () => {
	await firebase.auth().signOut()
}

FirebaseApp.resetPassword = async email => {
	try {
		await firebase.auth().sendPasswordResetEmail(email)
		return true
	} catch (err) {
		err.error = true
		return err
	}
}
