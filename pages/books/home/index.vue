<template>
	<view class="">
		<book v-if="tabBarShow === 'book'"></book>
		<city v-if="tabBarShow === 'city'"></city>
		<tabBar @change="change"></tabBar>
	</view>
</template>

<script>
	import book from './book/index.vue'
	import city from './city/index.vue'
	export default {
		data() {
			return {
				tabBarShow: 'book'
			}
		},
		components: {
			book,
			city,
		},
		methods:{
			change(index){
				this.tabBarShow = index
			}
		}
	}
</script>

<style>
</style>
