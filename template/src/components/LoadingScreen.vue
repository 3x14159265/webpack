<template>
	<section class="section loading-screen hero">
		<div class="container is-fluid hero-body">
			<div class="columns">
				<div class="column is-half is-offset-one-quarter has-text-centered is-loading">
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'LoadingScreen'
}
</script>

<style scoped>
.loading-screen .is-loading:after {
	-webkit-animation: spinAround 500ms infinite linear;
	animation: spinAround 1000ms infinite linear;
	border: 5px solid #dbdbdb;
	border-radius: 290486px;
	border-right-color: transparent;
	border-top-color: transparent;
	content: "";
	display: block;
	height: 3em;
	position: relative;
	width: 3em;
	left: calc(50% - (3em / 2));
	top: calc(50% - (3em / 2));
}
</style>
