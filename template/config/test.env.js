'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"test"',
	FIREBASE_CONFIG: JSON.stringify({
		projectId: '<your-project-id>',
		appName: '<your-app-name>',
		apiKey: '<your-firebase-api-key>',
		// authDomain: '<your-auth-domain>',
		// databaseURL: '<your-database-url>',
		// storageBucket: '<your-storage-bucket>'
	})
})
