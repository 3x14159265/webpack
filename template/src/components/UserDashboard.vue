<template>

	<pre>{{ user }}</pre>

</template>

<script>
import { firebase } from './../firebase'

export default {
	name: 'UserDashboard',
	computed: {
		user () {
			return this.$store.state.user
		}
	},
}
</script>
