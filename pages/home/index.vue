<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			uni.reLaunch({
				url:'/pages/books/home/index'
			})
		},
		methods: {

		}
	}
</script>

<style>
	
</style>
