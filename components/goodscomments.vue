<template  name="goodscomments">
	<view class="goodscomments">
		<image class="avatar" :src="pitem.user.avatar" />
		<view class="commentslist">
			<view class="userInfo">
				<text class="name">{{pitem.user.nickname}}</text>
				<text class="time">{{pitem.create_time_text}}</text>
			</view>
			<view class="ratewrap">
				<text>打分</text>
				<sx-rate :value.sync="pitem.score" :default-color="color.default" :active-color="color.active" :disabled="true"/>
			</view>
			<view class="contentwrap">
				<text :class="[full ? 'contentfix': 'content']">
					{{pitem.content}}
				</text>
				<view class="imglist">
					<image mode="aspectFill" :src="item" v-for="(item,index) in pitem.images_arr"
					  :index="index" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SxRate from '@/components/sx-rate'
	export default {
		name: 'goodsComments',
		props: {
			pitem: {
				type: Object,
				default: ''
			},
			full: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				color: {
				   default: '#e5e5e5',
				   active: '#ff4d1d',
				   margin: '10px'
				}
			};
		},
		components:{
			SxRate
		}
	}
</script>

<style lang="scss" scoped>
	.goodscomments {
		display: flex;
		flex-direction: row;
		width: 100%;
		margin: 0 auto;
		padding: 30upx 0upx;

		.avatar {
			width: 78upx;
			height: 78upx;
			border-radius: 50%;
			margin-right: 20upx;
		}

		.commentslist {
			width: 572upx;
			display: flex;
			flex-direction: column;

			.userInfo {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.name {
					font-size: 28upx;
					color: #333;
				}

				.time {
					font-size: 22upx;
					color: #999;
				}
			}

			.ratewrap {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;

				text {
					font-size: 21upx;
					color: #333;
				}

				.ratavan {
					display: flex;
				}
			}

			.contentwrap {
				display: flex;
				flex-direction: column;

				.contentfix {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 5;
					overflow: hidden;
					font-size: 26upx;
					width: 544upx;
				}

				.content {
					width: 544upx;
					font-size: 26upx;
					color: rgba(51, 51, 51, 1);
					/* line-height:36px; */
				}

				.full {
					font-size: 26upx;
					color: #136DF3;
					margin-top: 15upx;
					margin-bottom: 15upx;
				}

				.imglist {
					display: flex;
					flex-direction: row;
					margin-top: 20upx;
					margin-bottom: 20upx;

					image {
						width: 183upx;
						height: 183upx;
						border-radius: 10upx;
						margin-right: 10upx;
					}

					image:last-child {
						margin-right: 0 !important;
					}
				}

				.shopextend {
					display: flex;
					flex-direction: column;

					.shopinfo {
						display: flex;
						padding: 15upx;
						flex-direction: row;
						align-items: center;
						background: #F6F6F6;
						border-radius: 10upx;

						image {
							width: 78upx;
							height: 77upx;
							border-radius: 4upx;
							margin-right: 15upx;
						}

						.shopname {
							width: 383upx;
							display: flex;
							flex-direction: column;

							.title {
								width: 100%;
								font-size: 26upx;
								color: #333;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							.ad {
								font-size: 22upx;
								color: #666;
								width: 100%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}

						.vanico {
							display: flex;
							margin-left: 50upx;
						}
					}

					.hr {
						width: 100%;
						height: 1upx;
						background: #EEEEEE;
						margin-top: 30upx;
						margin-bottom: 30upx;
					}

					.replay {
						display: inline-block;
						color: #333;
						font-size: 26upx;

						text {
							color: #666;
						}
					}
				}
			}
		}
	}
</style>
