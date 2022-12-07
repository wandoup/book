<template>
	<view class="list_page">
		<view class="add_box" @tap="show = true">
			<u-icon name="plus" color="#2979ff" size="20"></u-icon>
		</view>
		<u-swipe-action>
			<u-swipe-action-item :options="options" v-for="(item,index) in list" :key="item.id"
				@click="handComplete(item,index)">
				<view class="swipe-action u-border-bottom">
					<view class="swipe-action__content">
						<text class="swipe-action__content__text">{{item.text}}</text>
					</view>
				</view>
			</u-swipe-action-item>
		</u-swipe-action>
		<u-popup :show="show" :round="10" mode="center" @close="close" @open="open">
			<view class="popup_box">
				<u--textarea v-model="value" placeholder="请输入内容"></u--textarea>
				<view class="popup_box_button">
					<view class="button_box">
						<u-button type="error" @click="close" text="关闭"></u-button>
					</view>
					<view class="button_box">
						<u-button type="primary" @click="addList" text="保存"></u-button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '', //	新增文本内容
				show: false, //	弹窗控制
				list: [],
				options: [{
						text: '完成',
						style: {
							backgroundColor: '#3c9cff'
						}
					},
					// {
					// 	text: '删除',
					// 	style: {
					// 		backgroundColor: '#f56c6c'
					// 	}
					// },
				],
			};
		},
		created() {
			this.list = uni.getStorageSync('list') || []
		},
		methods: {
			open() {
				// console.log('open');
			},
			//	弹窗关闭事件
			close() {
				this.show = false
				this.value = ''
			},
			//	添加事件
			addList() {
				let data = {
					text: this.value,
					id: new Date().getTime()
				}
				this.list.push(data)
				uni.setStorageSync('list', this.list)
				this.close()
			},
			//	完成事件
			handComplete(e, index) {
				//	存入已完成列表
				let arr = uni.getStorageSync('complete') || []
				arr.push(e)
				uni.setStorageSync('complete', arr)
				//	从列表中删除
				this.list.splice(index, 1)
				uni.setStorageSync('list', this.list)
			}
		}
	};
</script>

<style lang="scss">
	.list_page {
		.add_box {
			padding: 10rpx;
			border: 1rpx solid #3c9cff;
			border-radius: 50%;
			position: fixed;
			z-index: 99;
			right: 60rpx;
			bottom: calc(160rpx + constant(safe-area-inset-bottom));
			bottom: calc(160rpx + env(safe-area-inset-bottom));
		}

		.popup_box {
			width: 80vw;
			padding: 40rpx;

			&_button {
				margin-top: 30rpx;
				display: flex;
				justify-content: space-between;
				.button_box{
					width: 46%;
				}
			}
		}
	}

	.u-demo-block__title {
		padding: 10rpx 0 2rpx 15rpx;
	}

	.swipe-action {
		&__content {
			padding: 25rpx 0;

			&__text {
				color: $u-main-color;
				padding-left: 30rpx;
			}
		}
	}
</style>
