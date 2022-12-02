<template>
	<view class="book_details_page">
		<view class="book_details_page_info">
			
		</view>
		<view class="book_details_page_button">
			<view class="book_details_page_button_list">
				<view class="">
					<u-icon name="list-dot" size="24"></u-icon>
					<view class="text">目录</view>
				</view>
			</view>
			<view class="book_details_page_button_box">
				<view class="button">
					<u-button type="primary" icon="heart" text="加入书架"></u-button>
				</view>
				<view class="button">
					<u-button type="error" icon="file-text" text="立即阅读"></u-button>
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
	
		}
	}
</script>

<style lang="scss">
	.book_details_page{
		&_info{}
		&_button{
			width: 100%;
			height: calc(120rpx + env(safe-area-inset-bottom));
			height: calc(120rpx + constant(safe-area-inset-bottom));
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			background: #fafafa;
			display: flex;
			align-items: center;
			position: fixed;
			bottom: 0;
			&_list{
				width: 120rpx;
				height: 120rpx;
				margin-right: 20rpx;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: center;
				color: #9d9d9d;
				.text{
					width: 100%;
				}
			}
			&_box{
				flex: 1;
				padding: 0 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.button{
					width: 260rpx;
					height: 80rpx;
					text-align: center;
					border-radius: 36rpx;
					overflow: hidden;
				}
			}
		}
	}
</style>