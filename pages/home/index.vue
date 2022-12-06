<template>
	<view>
		<list v-if="tabBarShow === 'list'"></list>
		<tabBar @change="change" :tabBarShow="tabBarShow"></tabBar>
	</view>
</template>

<script>
	import list from './components/list/index.vue'
	export default {
		data() {
			return {
				tabBarShow: 'list',
			}
		},
		components: {
			list,
		},
		onLoad() {
			// uni.reLaunch({
			// 	url:'/pages/books/home/index'
			// })
		},
		methods: {
			change(index){
				this.tabBarShow = index
			},
		}
	}
</script>

<style>
	
</style>
