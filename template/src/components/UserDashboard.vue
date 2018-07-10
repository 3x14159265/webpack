<template>
	<section class="section container" v-if="user">
		You are logged as {{ user.email }}
	</section>
</template>

<script>

export default {
	name: 'UserDashboard',
	computed: {
		user () {
			return this.$store.getters.user
		}
	}
}
</script>

<style scoped>

</style>
