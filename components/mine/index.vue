<template>
	<view class="mine_page">
		<view class="mine_page_info">
			<view class="image_box">
				<image class="image" src="../../static/logo.jpeg"></image>
			</view>
			<view class="info_box">
				<view class="">
					XXX
				</view>
			</view>
		</view>
		<view class="mine_page_card">
			<view class="card_li" @tap="handToast">
				<view>
					<u-icon name="rmb-circle" label="切换至记账模块"></u-icon>
				</view>
				<view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
			}
		},
		onLoad() {
			
		},
		methods: {
			handToast(){
				uni.showModal({
				  title: '该功能正在开发中',
				  showCancel: false,
				})
			}
		}
	}
</script>

<style lang="scss">
	.mine_page{
		min-height: calc(100vh - 102rpx - constant(safe-area-inset-bottom));
		min-height: calc(100vh - 102rpx - env(safe-area-inset-bottom));
		background-color: $u-info-light;
		&_info{
			padding: 60rpx 30rpx 30rpx;
			background-color: $u-primary;
			display: flex;
			.image_box{
				width: 152rpx;
				height: 152rpx;
				margin-right: 20rpx;
				.image{
					width: 140rpx;
					height: 140rpx;
					border: 6rpx solid $u-primary-disabled;
					border-radius: 20rpx;
				}
			}
			.info_box{
				flex: 1;
				padding-top: 20rpx;
				color: #fff;
			}
		}
		
		&_card{
			width: calc(100% - 60rpx);
			margin: 20rpx 30rpx;
			background: #fff;
			border-radius: 20rpx;
			.card_li{
				padding: 26rpx 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
</style>