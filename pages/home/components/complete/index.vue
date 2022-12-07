<template>
	<view class="list_page">
		<u-swipe-action>
			<u-swipe-action-item :options="options" v-for="(item,index) in list" :key="item.id" @click="handDelete(item,index)">
				<view class="swipe-action u-border-bottom">
					<view class="swipe-action__content">
						<text class="swipe-action__content__text">{{item.text}}</text>
					</view>
				</view>
			</u-swipe-action-item>
		</u-swipe-action>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#f56c6c'
					}
				},
				],
			};
		},
		created() {
			this.list = uni.getStorageSync('complete') || []
		},
		methods:{
			//	删除事件
			handDelete(e,index){
				//	从列表中删除
				this.list.splice(index,1)
				uni.setStorageSync('complete',this.list)
			}
		}
	};
</script>

<style lang="scss">
	.u-demo-block__title {
		padding: 10rpx 0 2rpx 15rpx;
	}

	.swipe-action {
		&__content {
			padding: 25rpx 0;

			&__text {
				color: #ccc;
				padding-left: 30rpx;
			}
		}
	}
</style>
