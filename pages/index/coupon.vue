<template>
	<view class="coupon" :style="{height:systemHeight+'px'}">
		<image src="../../static/images/coupon-top.png" class="coupon-top"></image>
		<image src="../../static/images/coupon-title.png" class="coupon-title" mode=""></image>
		<view class="coupon-wrap-fix">
			
		</view>
		<view class="coupon-wrap" ref="couponwrap">
			<view class="citem" v-for="(item,index) in detail.couponlist" :key="index">
			  <image src="../../static/images/coupon-item.png" class="citemimg" />
			  <view class="left">
				￥{{item.money}}
			  </view>
			  <view class="center">
				<view class="l">
				  {{item.ticket_name}}
				</view>
				<view class="d">
				  {{item.money_need == 0 ? '无门槛' : '满'+item.money_need+'元可用'}}
				</view>
			  </view>
			  <view class="right">
				<view :class="['unuse', item.type == 1 ? 'use' : '']">领取</view>
			  </view>
			</view>
		</view>
		<view class="coupon-info" ref="couponinfo" :style="{top:autoHeight+'px'}">
			<image src="../../static/images/coupon-info.png" class="coupon-info-bg"></image>
			<view class="title">
			{{detail.info}}
			</view>
			<view class="coupon-d">
				{{detail.content}}
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data () {
			return {
				autoHeight: 0,
				systemHeight: 800,
				detail:{
					couponlist: [
						{
							money: '10.00',
							ticket_name: '红包标题',
							money_need: '200.00',
							type: 1
						},
						{
							money: '10.00',
							ticket_name: '红包标题',
							money_need: '200.00',
							type: 1
						},
						{
							money: '10.00',
							ticket_name: '红包标题',
							money_need: '200.00',
							type: 1
						},
						{
							money: '10.00',
							ticket_name: '红包标题',
							money_need: '200.00',
							type: 1
						},
						{
							money: '10.00',
							ticket_name: '红包标题',
							money_need: '200.00',
							type: 1
						},
						{
							money: '10.00',
							ticket_name: '红包标题',
							money_need: '200.00',
							type: 1
						}
					],
					info: '规则说明',
					content: '优惠券的的详细说明，文案由平台编辑好显示在这里，是可修改的。优惠券的的详细说明，文案由平台编辑好显示在这里，是可修改的。优惠券的的详细说明，文案由平台编辑好显示在这里，是可修改的。优惠券的的详细说明，文案由平台编辑好显示在这里，是可修改的。优惠券的的详细说明，文案由平台编辑好显示在这里，是可修改的。优惠券的的详细说明，文案由平台编辑好显示在这里，是可修改的。优惠券的的详细说明，文案由平台编辑好显示在这里，是可修改的。'
				}
			}
		},
		mounted() {
			let that = this
			uni.getSystemInfo({
			　　success: function(res) { // res - 各种参数
			　　   console.log(res); // 屏幕的宽度 
				
					// that.systemHeight = res.safeArea.height
			　　    let info = uni.createSelectorQuery().select(".coupon-wrap");
			　　　  　info.boundingClientRect(function(data) { //data - 各种参数
			　　　  　	console.log(data.top + data.height)
						that.autoHeight = data.top + data.height + 25
						console.log(that.autoHeight)
						console.log(data.height)  // 获取元素宽度
						that.systemHeight = that.autoHeight + 400
			　　    }).exec()
			       }
			});
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.coupon{
		width:100%;
		padding-bottom: 100upx;
		background:linear-gradient(128deg,rgba(241,103,65,1),rgba(210,79,11,1));
		position: relative;
		.coupon-top{
			position: absolute;
			left:0;
			top:0;
			width:100%;
			height:661upx;
		}
		.coupon-title{
			position:absolute;
			top:80upx;
			left:50%;
			width:547upx;
			height:138upx;
			transform: translateX(-50%);
		}
		.coupon-wrap-fix{
			position: absolute;
			left:50%;
			transform: translateX(-50%);
			background:#fe8e5a;
			opacity: 0.7;
			width:655upx;
			height:120upx;
			top:560upx;
			z-index: 20;
		}
		.coupon-wrap{
			position: absolute;
			z-index: 1000;
			left:50%;
			top:560upx;
			transform: translateX(-50%);
			width:655upx;
			min-height:401upx;
			background:linear-gradient(0deg,rgba(231,94,29,1),rgba(255,144,92,1));
			box-shadow:0px 11upx 23upx 0upx rgba(179, 25, 31, 0.35);
			border-radius:14upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-bottom: 30upx;
			box-sizing: border-box;
			.citem{
			  display: flex;
			  flex-direction: row;
			  width:594upx;
			  height:144upx;
			  margin-bottom: 10upx;
			  position: relative;
			  .citemimg{
			    position: absolute;
			    left:0;
			    top:0;
			    width:594upx;
			    height:144upx;
			    z-index: -1;
			  }
			  .left{
			    width:210upx;
			    height:100%;
			    font-size: 48upx;
			    color:#F4472A;
			    display: flex;
			    justify-content: center;
			    align-items: center;
			  }
			  .center{
			    width:238upx;
			    height:100%;
			    display: flex;
			    flex-direction:column;
			    justify-content: center;
			    align-items: center;
			    // border-right: 1px solid rgba(255,125,104,1);
			    .l{
			      font-size: 28upx;
			      color:#F4472A;
			      font-weight: bold
			    }
			    .d{
			      font-size: 21upx;
			      color:#F4472A;
			      line-height: 35upx;
			    }
			  }
			  .right{
			    display: flex;
			    width:146upx;
			    justify-content: flex-start;
			    align-items: center;
						  .unuse{
							  width:125upx;
							  height:58upx;
							  background:linear-gradient(-30deg,rgba(255,39,39,1) 0%,rgba(255,102,51,1) 100%);
							  border-radius:29upx;
							  font-size: 27upx;
							  color:white;
							  line-height: 58upx;
							  text-align: center;
						  }
						  .use{
							  background: #CCCCCC;
						  }
			  }
			}
		}
		.coupon-info{
			position: absolute;
			top:30upx;
			width:653upx;
			height:590upx;
			left:50%;
			transform: translateX(-50%);
			z-index: 1000;
			.coupon-info-bg{
				position: absolute;
				left:0;
				top:0;
				z-index:-2 ;
				width:653upx;
				height:590upx;
			}
			.title{
			  font-size: 34upx;
			  color:#F23C29;
			  font-weight: bold;
			  line-height: 131upx;
			  height:131upx;
			  text-align: center;
			}
			.coupon-d{
			  font-size: 24upx;
			  color:#491F00;
			  padding:25upx 48upx;
			  box-sizing: border-box;
			  line-height: 40upx;
			  overflow: hidden;
			  overflow-y: scroll;
			  height:400upx;
			}
		}
	}
</style>
