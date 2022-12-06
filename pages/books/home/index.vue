<template>
	<view class="">
		<book v-if="tabBarShow === 'book'"></book>
		<city v-if="tabBarShow === 'city'"></city>
		<tabBar @change="change" :tabBarShow="tabBarShow" :list="tabBarList"></tabBar>
	</view>
</template>

<script>
	import book from './book/index.vue'
	import city from './city/index.vue'
  const api = require("@/static/js/api.js")
	export default {
		data() {
			return {
				tabBarShow: 'book',
				tabBarList:[
					{
						name:	'book',
						text:	'书架',
						icon:	'home',
					},
					{
						name:	'city',
						text:	'书城',
						icon:	'photo',
					},
					{
						name:	'mine',
						text:	'我的',
						icon:	'account',
					}
				]
			}
		},
		components: {
			book,
			city,
		},
		created() {
			// this.queryDeleteMark()
		},
		methods:{
			change(index){
				this.tabBarShow = index
			},
			//	移除书架
			async queryDeleteMark() {
				return new Promise((resolve, reject) => {
					api.deleteMark().then(res => {
						
						resolve(res)
					})
				})
			},
		}
	}
</script>

<style>
</style>
