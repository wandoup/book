<template>
	<view class="book_page">
		<title>
			<template>书架</template>
		</title>
		<view class="book_page_list">
			<view class="add_li li" v-if="list.length === 0">
				
			</view>
			<view class="li" v-for="(item,index) in list" :key="index">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			
		},
		methods: {
	
		}
	}
</script>

<style lang="scss">
	.book_page{
		&_list{
			padding: 40rpx;
			display: flex;
			flex-wrap: wrap;
			.add_li{
				border: 1rpx solid #c3c3c3;
				border-radius: 10rpx!important;
			}
			.li:nth-child(3n){
				margin-right: 0rpx!important;
			}
			.li{
				width: calc((100% - 56rpx) / 3);
				height: 300rpx;
				margin: 20rpx 20rpx 0 0;
				border-radius: 0 10rpx 10rpx 0;
				background-size: 100% 100%;
			}
		}
	}
</style>