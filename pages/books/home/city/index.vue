<template>
	<view class="city_page">
		<title>
			<template>书城</template>
		</title>
		<view class="city_page_search">
			<u-search placeholder="日照香炉生紫烟" v-model="keyword"></u-search>
		</view>
		<view class="city_page_sticky">
			<u-sticky bgColor="#fff">
				<u-tabs :list="tabsList"></u-tabs>
			</u-sticky>
		</view>
		<view class="city_page_list">
			<view class="li" @tap="naviDetails">
				<view class="li_image">
					<image class="image" src="../../../../static/logo.png" mode=""></image>
				</view>
				<view class="li_text">
					<view class="li_text_name">
						XXXXXXXXXXXXXXXXX
					</view>
					<view class="li_text_tips">
						XXXXXXXXXXXXXX
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabsList: [{
						name: '关注',
				}, {
						name: '推荐',
				}, {
						name: '电影'
				}, {
						name: '科技'
				}, {
						name: '音乐'
				}, {
						name: '美食'
				}, {
						name: '文化'
				}, {
						name: '财经'
				}, {
						name: '手工'
				}],
				list: [],
			}
		},
		onLoad() {
			
		},
		methods: {
			//	跳转至详情
			naviDetails(){
				uni.navigateTo({
					url:	'/pages/books/bookDetails/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.city_page{
		&_search{
			padding: 20rpx;
		}
		&_sticky{
			
		}
		&_list{
			padding: 20rpx;
			.li{
				display: flex;
				align-items: center;
				&_image{
					width: 100rpx;
					height: 180rpx;
					margin-right: 20rpx;
					.image{
						width: 100rpx;
						height: 180rpx;
					}
				}
				&_text{
					flex: 1;
					min-height: 180rpx;
					&_name{
						font-size: 28rpx;
					}
					&_tips{
						margin-top: 10rpx;
						font-size: 18rpx;
						color: #ccc;
					}
				}
			}
		}
	}
</style>