<template>
	<view class="detail">
		<cu-custom bgColor="bg-white-custom" :isJL="true">
		</cu-custom>
		<view class="swiperwrap" :style="{'margin-top':'-'+CustomBar+'px'}">
			<swiper class="store-swiper" :indicator-dots="false" :autoplay="true" :interval="3000"
			  @change="storeChange">
					<swiper-item v-for="(item,index) in stroeImg" :key="index">
						<image :src="item" mode="scaleToFill"  class="swiperimg"/>
					</swiper-item>
			</swiper>
			<view class="fix">{{currentIndex}}/{{stroeImg.length}}</view>
		</view>
		<view class="detail-info">
			<view class="detailprice">
				<text>￥188.9</text>
				<view class="icoshare">
					<image :src="false ? require('../../static/images/collect.png') : require('../../static/images/collected.png')" mode="" class="collect"> </image>
					<image src="../../static/images/goshares.png" mode="" class="share"> </image>
				</view>
			</view>
			<view class="detailtitle">
				提子吐司5片装120g x2 软糯可口营养美味超过两排换行
			</view>
<!-- 			<view class="detailcontent">
				简介文字看起来就很好吃，吃起来更够味，优惠多多简介文字看起来就很好吃，吃起来更够味，优惠多多
			</view> -->
		</view>
		<view class="detail-stock">
			<text>配送</text>
			<text>可送货上门·免运费</text>
			<text>月销345</text>
		</view>
		<view class="detail-comment">
			<view class="c-wrip">
				<view class="cu">
					<text>用户评论</text>
					<text>(10)</text>
				</view>
				<text class="lc">查看全部</text>
			</view>
			<GoodsComments :pitem="comments"></GoodsComments>
		</view>
		<view class="detail-content">
			<text class="title">图文详情</text>
			
		</view>
		<view class="detail-recommend">
			<text class="title">店铺推荐</text>
			<view class="content-fall">
				<GoodsItem :width="215" :obj="item" :gid="index" :key="index"  @goodsClick="goodsClick" @carClick="carClick" v-for="(item,index) in objList"></GoodsItem>
			</view>
		</view>
		<view class="detail-car-wrap">
			<view class="caritem">
				<image src="../../static/images/gohomes.png" class="cover"></image>
				<text>店铺</text>
			</view>
			<view class="caritem">
				<image src="../../static/images/gocars.png" class="gocars"></image>
				<text>购物车</text>
			</view>
			<view class="gocar widthfix">加入购物车</view>
			<view class="gobuy widthfix">立即购买</view>
		</view>
	</view>
</template>

<script>
	import GoodsComments from '@/components/goodscomments.vue'
	import GoodsItem from '../../components/goodsitem.vue'
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				stroeImg:[
					'http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&f=JPEG?w=1200&h=1290',
					'http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&f=JPEG?w=1200&h=1290'
				],
				currentIndex:1,
				color: {
				   default: '#e5e5e5',
				   active: '#ff4d1d',
				   margin: '10px'
				},
				comments:{
					user: {
						avatar: 'http://att3.citysbs.com/200x200/hangzhou/2020/04/15/11/dd6719bd4287d9efd49434c43563a032_v2_.jpg',
						nickname: 'test',
					},
					create_time_text: '2018-01-01',
					score:5,
					content: '测试测测测试测测测试测测测试测测测试测测测试测测测试测测测试测测测试测测测试测测测试测测测试测测测试测测',
					images_arr: [
						'http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&f=JPEG?w=1200&h=1290',
						'http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&f=JPEG?w=1200&h=1290',
						'http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&f=JPEG?w=1200&h=1290'
					]
				},
				objList: [
					{
						goods_id:1,
						goods_name: '测试测试测试测试测试测试',
						price:'10.00',
						oldprice:'111.00',
						image:require('../../static/images/goodcover.png'),
						num:1
					},
					{
						goods_id:1,
						goods_name: '测试测试',
						price:'10.00',
						oldprice:'1.00',
						image:require('../../static/images/goodcover.png'),
						num:1
					},
					{
						goods_id:1,
						goods_name: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
						price:'10.00',
						oldprice:'1.00',
						image:require('../../static/images/goodcover.png'),
						num:1
					},
					{
						goods_id:1,
						goods_name: '测试测试测试测试测试测试测试测试',
						price:'10.00',
						oldprice:'1.00',
						image:require('../../static/images/goodcover.png'),
						num:1
					},
					{
						goods_id:1,
						goods_name: '测试测试',
						price:'10.00',
						oldprice:'1.00',
						image:require('../../static/images/goodcover.png'),
						num:1
					},
					{
						goods_id:1,
						goods_name: '测试测试',
						price:'10.00',
						oldprice:'1.00',
						image:require('../../static/images/goodcover.png'),
						num:1
					},
					{
						goods_id:1,
						goods_name: '测试测试',
						price:'10.00',
						oldprice:'1.00',
						image:require('../../static/images/goodcover.png'),
						num:1
					}
				]
			};
		},
		methods:{
			storeChange(e){
				this.currentIndex = e.detail.current + 1
			},
			goodsClick(e){
				console.log(e)
			},
			carClick(e){
				console.log(e)
			}
		},
		components:{
			GoodsComments,
			GoodsItem
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background:#f8f8f8;
	}
	.detail {
		width: 100%;
		display: flex;
		flex-direction: column;
		.swiperwrap {
			width: 100%;
			height: 750upx;
			position: relative;
			.store-swiper{
				height:750upx!important;
				.swiperimg{
					width:100%;
					height:100%;
				}
				
			}
			.top{
				position: absolute;
				left:50%;
				transform: translateX(-50%);
				top:50upx;
				display: flex;
				flex-direction: row;
				width:100%;
				padding-left:38upx;
				padding-right:38upx;
				box-sizing: border-box;
				.gosearch{
					width:calc(100% - 126upx - 74upx);
					margin-right:auto;
					height:63upx;
					background:rgba(0,0,0,1);
					opacity:0.6;
					border-radius:31upx;
					display: flex;
					justify-content: flex-start;
					padding-left:24upx;
					padding-right:24upx;
					box-sizing: border-box;
					align-items: center;
					.gosearchico{
						width:28upx;
						height:28upx;
						margin-right:24upx;
					}
					text{
						font-size: 24upx;
						color:#ccc;
					}
					
				}
				.gocar{
					width:63upx;
					height:63upx;
				}
				.gocar:nth-last-child(2){
					margin-right:37upx;
				}
			}
			.fix{
				position: absolute;
				bottom: 40upx;
				right:21upx;
				width:67upx;
				height:42upx;
				background:rgba(51,51,51,1);
				opacity:0.6;
				border-radius:21upx;
				color: white;
				font-size: 25upx;
				line-height: 42upx;
				text-align: center;
			}
		}
		.detail-info{
			display: flex;
			flex-direction: column;
			padding:30upx;
			box-sizing: border-box;
			background: white;
			margin-bottom: 21upx;
			.detailprice{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				text:nth-child(1){
					font-size: 25upx;
					font-weight: bold;
					color:#FF432C;
					margin-right:14upx;
				}
				text:nth-child(2){
					text-decoration: line-through;
					font-size:25upx;
					color:#999;
					font-weight: 500;
				}
				.icoshare{
					.collect{
						width:39upx;
						height:37upx;
						margin-right:30upx;
					}
					.share{
						width:35upx;
						height:35upx;
					}
				}
			}
			.detailtitle{
				font-size:36upx ;
				margin-top:20upx;
				color:#333;
				line-height: 50upx;
				display: -webkit-box;
				text-overflow: ellipsis;
				overflow: hidden;
				-webkit-line-clamp:2;
				-webkit-box-orient:vertical;
			}
			.detailcontent{
				margin-top:26upx;
				font-size: 25upx;
				color:#555;
				line-height: 42upx;
			}
		}
		.detail-stock{
			margin-bottom: 21upx;
			width:100%;
			padding:31upx;
			background:white;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			text:nth-child(1){
				font-size: 25upx;
				color:#333;
				font-weight: 800;
			}
			text:nth-child(2){
				font-size: 26upx;
				color:#333;
				font-weight: 500;
				margin-left:40upx
			}
			text:nth-child(3){
				font-size: 26upx;
				color:#333;
				margin-left:auto;
			}
		}
		.detail-comment{
			display: flex;
			flex-direction: column;
			padding:30upx;
			box-sizing: border-box;
			background:white;
			margin-bottom: 21upx;
			.c-wrip{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.cu{
					text:nth-child(1){
						font-size: 33upx;
						color: #333;
					}
					text:nth-child(2){
						font-size: 25upx;
						color:#999;
					}
				}
				.lc{
					font-size: 25upx;
					color:#333;
					padding-right:25upx;
					position: relative;
					display: flex;
					align-items: center;
				}
				.lc::after{
					position: absolute;
					right:0;
					width:14upx;
					height:24upx;
					content:'';
					background: url(../../static/images/arrow.png) no-repeat;
					background-size: 100% 100%;
					top:50%;
					transform: translateY(-50%);
				}
				
			}
		}
		.detail-content{
			display: flex;
			flex-direction: column;
			padding:30upx;
			box-sizing: border-box;
			width:100%;
			min-height: 400upx;
			background: white;
			.title{
				font-size: 33upx;
				font-weight: 800;
				color:#333;
			}
		}
		.detail-recommend{
			display: flex;
			flex-direction: column;
			margin-top:30upx;
			.title{
				position: relative;
				font-size: 33upx;
				color:#333;
				font-weight: 800;
				width:150upx;
				height:50upx;
				text-align: center;
				padding-left:30upx;
				padding-right:30upx;
			}
			.title::after{
				position: absolute;
				content:'';
				left:50%;
				bottom: -7upx;
				transform: translateX(-50%);
				width:50upx;
				height:8upx;
				background:linear-gradient(-30deg,rgba(255,39,39,1) 0%,rgba(255,102,51,1) 100%);
			}
			.content-fall{
				padding-left:calc(63upx/2);
				padding-right:calc(63upx/2);
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
			}
		}
		.detail-car-wrap{
			display: flex;
			flex-direction: row;
			align-items: center;
			z-index: 3000;
			width:100%;
			height:101upx;
			padding-left:40upx;
			padding-right:40upx;
			box-sizing: border-box;
			background: white;
			box-shadow:0px -1px 0px 0px rgba(238,238,238,1);
			position: fixed;
			left:0;
			bottom: 0;
			.caritem{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin-right:50upx;
				width:60upx;
				.cover{
					width:35upx;
					height:33upx;
					margin-bottom: 12upx;
				}
				.gocars{
					width:34upx;
					height:33upx;
					margin-bottom: 12upx;
				}
				text{
					font-size: 20upx;
					color:#333;
				}
			}
			.gocar{
				background:#446935;
				margin-right:50upx;
			}
			.gobuy{
				background:#000000;
			}
			.widthfix{
				width:calc((100% - 270upx)/2);
				height:79upx;
				border-radius:40upx;
				display: flex;
				justify-content: center;
				align-items: center;
				color:#FEFEFE;
				font-size: 31upx;
			}
		}
	}
</style>
