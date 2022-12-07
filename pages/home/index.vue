<template>
	<view>
		<list v-if="tabBarShow === 'list'"></list>
		<complete v-if="tabBarShow === 'complete'"></complete>
		<mine v-if="tabBarShow === 'mine'"></mine>
		<tabBar @change="change" :tabBarShow="tabBarShow"></tabBar>
	</view>
</template>

<script>
	import list from './components/list/index.vue'
	import complete from './components/complete/index.vue'
	import mine from '@/components/mine/index.vue'
	export default {
		data() {
			return {
				tabBarShow: 'list',
			}
		},
		components: {
			list,
			complete,
			mine,
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
