<template>
	<view class="home">
		<view class="top">
			<swiper class="screen-swiper screen-swiper-fix" :class="'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index" class="itemimg">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'" class="itemimg"></image>
				</swiper-item>
			</swiper>
			<view class="navmenu">
				<view class="navitem" v-for="(item,index) in cateList" :index="index">
					<view class="imagwrap">
						<image :src="item.img"></image>
					</view>
					<text>{{item.cate_name}}</text>
				</view>
			</view>
		</view>
		<image src="../../static/images/cad.png" class="cad"></image>
		<view class="hot">
			<NavTab :title="htitle"></NavTab>
			<view class="adList">
				<image src="../../static/images/hotad1.png" class="ad1"></image>
				<view class="ad2wrap">
					<image src="../../static/images/hotad2.png" class="adn"></image>
					<image src="../../static/images/hotad2.png" class="adn"></image>
				</view>
			</view>
			<swiper class="screen-swiper screen-swiper-fix" :class="'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index" class="itemimg">
					<image src="../../static/images/vplay.png" class="vp"></image>
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'" class="itemimgw"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="new">
			<NavTab :title="nTitle"></NavTab>
			<view class="newList">
				<GoodsItem  v-for="(item,index) in goodsList" :width.sync="goodsWidth" :index="index" :obj="item" :gid="index"/>
			</view>
			<view class="more">点击查看更多</view>
		</view>
		<view class="xgr">
			<NavTab :title="xtitle"></NavTab>
			<view class="content">
				
			</view>
		</view>
	</view>
</template>

<script>
	import NavTab from '@/components/navTab.vue'
	import GoodsItem from '@/components/goodsitem.vue'
	export default {
		data() {
			return {
				htitle: '热门活动',
				nTitle: '新品推荐',
				xtitle: '新鲜蔬果推荐',
				goodsWidth: '347',
				cateList:[
					{
						id:1,
						img:require('../../static/images/1.png'),
						cate_name: '生鲜蔬菜',
					},
					{
						id:2,
						img:require('../../static/images/2.png'),
						cate_name: '五谷杂粮',
					},
					{
						id:3,
						img:require('../../static/images/3.png'),
						cate_name: '酒水饮品',
					},
					{
						id:4,
						img:require('../../static/images/4.png'),
						cate_name: '清洁用品',
					},
					{
						id:5,
						img:require('../../static/images/5.png'),
						cate_name: '新鲜水果',
					},
					{
						id:6,
						img:require('../../static/images/6.png'),
						cate_name: '零食冷饮',
					},
					{
						id:7,
						img:require('../../static/images/7.png'),
						cate_name: '五金电器',
					},
					{
						id:8,
						img:require('../../static/images/8.png'),
						cate_name: '居家个护',
					}
				],
				swiperList: [
					{
						id: 0,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
					}, {
						id: 3,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					}, {
						id: 4,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
					}, {
						id: 5,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
					}, {
						id: 6,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					},
				],
				goodsList: [
					{
						id:1,
						image:'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg',
						goods_name: '提子吐司5片装120g x2 软',
						price:'10.00',
						oldprice: '12.00',
						num:1,
						type:'hot'
					},
					{
						id:2,
						image:'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg',
						goods_name: '提子吐司5片装120g x2 软',
						price:'10.00',
						oldprice: '12.00',
						num:2,
						type:'new'
					},
					{
						id:3,
						image:'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg',
						goods_name: '提子吐司5片装120g x2 软',
						price:'10.00',
						oldprice: '12.00',
						num:2,
						type:''
					},
					{
						id:4,
						image:'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg',
						goods_name: '提子吐司5片装120g x2 软',
						price:'10.00',
						oldprice: '12.00',
						num:2,
						type:''
					},
					{
						id:5,
						image:'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg',
						goods_name: '提子吐司5片装120g x2 软',
						price:'10.00',
						oldprice: '12.00',
						num:2,
						type:''
					},
					{
						id:6,
						image:'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg',
						goods_name: '提子吐司5片装120g x2 软',
						price:'10.00',
						oldprice: '12.00',
						num:2,
						type:''
					}
				]
				
			}
		},
		onLoad() {

		},
		methods: {

		},
		components: {
			NavTab,
			GoodsItem
		}
	}
</script>

<style lang="scss">
	.home {
		display: flex;
		flex-direction: column;
		.top{
			display: flex;
			background:white;
			flex-direction: column;
			.screen-swiper-fix{
				height:424upx!important;
			}
			.navmenu{
				padding:40upx 40upx 20upx 40upx;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.navitem{
					width:25%;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 35upx;
					.imagwrap{
						max-width:76upx;
						max-height:76upx;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-bottom: 20upx;
						image{
							max-width: 100%;
							max-height:100%;
						}
					}
					text{
						font-size: 22upx;
						color:#333;
					}
				}
			}
		}
		.cad{
			width:708upx;
			height:182upx;
			margin:21upx auto 0upx auto;
		}
		.hot{
			display: flex;
			flex-direction: column;
			.adList{
				padding:0upx 21upx 14upx 21upx;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				.ad1{
					width:347upx;
					height:347upx;
					margin-right:14upx;
					border-radius: 14upx 0 0 14upx;
					overflow: hidden;
				}
				.ad2wrap{
					display: flex;
					flex-direction: column;
					width:calc(100% - 347upx - 14upx);
					.adn{
						width:100%;
						height:167upx;
						border-radius:0 14upx 14upx 0;
						overflow: hidden;
						margin-bottom: 14upx;
					}
					.adn:last-child{
						margin-bottom: 0;
					}
				}
			}
			.screen-swiper-fix{
				padding:0upx 21upx;
				box-sizing: border-box;
				height:398upx;
				width:100%;
				.itemimg{
					position: relative;
					z-index: 100;
					.vp{
						position: absolute;
						z-index: 300;
						left:50%;
						top:50%;
						width:92upx;
						height:92upx;
						transform: translate(-50%,-50%);
					}
				}
			}
		}
		.new{
			display: flex;
			flex-direction: column;
			.newList{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				padding-left:21upx;
				padding-right:21upx;
			}
			.more{
				font-size: 25upx;
				color:#1F2D19;
				font-weight: 500;
				display: flex;
				justify-content: center;
				margin:32upx auto;
			}
		}
		.xgr{
			display: flex;
			flex-direction: column;
			width:708upx;
			height:872upx;
			background:white;
			.content{
				display: flex;
				flex-direction: column;
				border-radius: 7upx;
				overflow: hidden;
			}
		}
	}
</style>
