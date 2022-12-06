<template>
	<view class="">
		<u-tabbar
			:value="value"
			@change="change"
			:fixed="true"
			:placeholder="true"
			:safeAreaInsetBottom="true"
		>
			<u-tabbar-item v-for="(item,index) in list" :key="index" :text="item.text" :icon="item.icon" :name="item.name"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: this.tabBarShow,
			}
		},
		props:{
			list: {
				type: Array,
				default () {
					return [
						{
							name:	'list',
							text:	'列表',
							icon:	'list',
						},
						{
							name:	'mine',
							text:	'我的',
							icon:	'account',
						}
					];
				}
			},
			tabBarShow: {
				type: String,
				default: 'list'
			},
		},
		methods:{
			//	切换事件
			change(index){
				this.value = index
				this.$emit('change',index)
			},
		}
	};
</script>

<style>
</style>