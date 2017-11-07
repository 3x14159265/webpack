// loading the firebase config depending on environment set in config
import prodEnv from './config/prod.firebase.config'
import testEnv from './config/test.firebase.config'
import devEnv from './config/dev.firebase.config'
import Firebase from 'firebase'
// required for side-effects (see https://firebase.google.com/docs/firestore/quickstart)
require("firebase/firestore")

let config = devEnv
if(process.env.NODE_ENV === 'production') config = prodEnv
if(process.env.NODE_ENV === 'testing') config = testEnv

// make sure that Firebase is only initialized once
export const firebase = Firebase.apps.length == 0 ? Firebase.initializeApp(config) : Firebase.apps[0]
// using the new firestore instead of RT database
// to use the old RT database of firebase, replace with
// export const database = firebase.database()
export const database = firebase.firestore()
