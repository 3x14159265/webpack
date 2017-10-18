<template>
	<section class="section loading-screen hero">
		<div class="container is-fluid hero-body">
			<div class="columns">
				<div class="column has-text-centered is-half is-offset-one-quarter is-size-4">
					<p><i>{{ quote.text }}</i></p>
					<small v-if="quote.author">{{ quote.author }}</small>
				</div>
			</div>
			<div class="columns">
				<div class="column is-half is-offset-one-quarter has-text-centered is-loading">
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'LoadingScreen',
	created () {
		let length = this.quotes.length
		let random = Math.floor(Math.random() * (length - 0))
		this.quote = this.quotes[random]
	},
	data () {
		return {
			quotes: [
				{
					text: 'Ready to build some awesome shit?'
				},
				{
					text: 'The best way to predict the future is to invent it.',
					author: 'Alan Kay'
				},
				{
					text: 'There is a way to do it better - find it.',
					author: 'Thomas Edison'
				},
				{
					text: 'The ones who are crazy enough to think that they can change the world, are the ones who do.',
					author: 'Steve Jobs'
				}
			],
			quote: undefined
		}
	},
	methods: {
		getQuote () {

		}
	}
}
</script>
