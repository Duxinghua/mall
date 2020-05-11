<template name="goodsItem">
	<view :class="['goodsitem',width == 179 ? 'goodsitem179' : 'goodsitem347', gid % 2 != 0 ? 'goodsfix': '']" @click="goodsClick(obj)">
		<image :src="obj.image" mode="aspectFill" class="goodscover" />
		<image v-if="obj.type == 'hot' || obj.type == 'new' " :src="obj.type == 'hot' ? require('../static/images/hot.png') : (obj.type == 'new' ? require('../static/images/new.png') : '')" class="imgtype"></image>
		<text class="goodsname">{{obj.goods_name}}</text>
		<view class="goodsprice">
			<text class="price1">￥{{obj.price}}</text>
			<text class="price2">￥{{obj.oldprice}}</text>
			<view class="gocar" v-if="width == 347">
				<image class="jiahao" src="../static/images/jiahao.png"></image>
				<view class="numwrap" @click.stop="carClick(obj)">
					<image class="carnum" src="../static/images/numbg.png"></image>
					<text>{{obj.num}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'goodsItem',
	props: {
		obj: {
			type: Object
		},
		width: {
			type: String,
			value: 179
		},
		gid: {
			type: Number
		}
	},
	created() {
		
	},
	methods:{
		goodsClick(obj){
			this.$emit('goodsClick',obj.goods_id)
		},
		carClick(obj){
			this.$emit('carClick',obj.goods_id)
		}
	}
}
</script>

<style lang="scss" scoped>
.goodsitem{
	display: flex;
	flex-direction: column;
	margin-right: 14upx;
	border-radius:14upx;
	background:white;
	position: relative;
	z-index: 1;
	.imgtype{
		position: absolute;
		left:0;
		top:0;
		width:75upx;
		height:33upx;
		z-index: 3;
	}
	.goodscover{
		border-radius: 14upx 14upx 0 0;
		overflow: hidden;
	}
	.goodsprice{
		margin-top:14upx;
		.price1{
			font-size: 27upx;
			color:#FF432C;
			font-weight: 800;
		}
		.price2{
			margin-left:10upx;
			font-size: 21upx;
			color:#999;
			font-weight: 500;
			text-decoration:line-through;
		}
	}
}
.goodsitem179{
	align-items: center;
	.goodsname{
		font-size: 23upx;
		color:#333;
		margin-top:17upx;
		padding-left:15upx;
		padding-right:15upx;
		box-sizing: border-box;
		display: inline-block;
		word-break: keep-all;
		width:calc(179upx * 0.9);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.goodscover{
		width:179upx;
		height:179upx;
	}
}
.goodsitem347{
	// align-items: flex-start;
	margin-right:14upx;
	margin-bottom: 14upx;
	border-radius: 14upx;
	width:347upx;
	// break-inside:avoid;
	// box-sizing: border-box;
	.goodsname{
		padding:20upx 20upx 0upx 20upx;
		box-sizing: border-box;
		font-size: 25upx;
		color:#333;
		line-height: 38upx;
	}
	.goodscover{
		width:100%;
		height:347upx;
	}
	.goodsprice{
		padding-left:15upx;
		padding-right:15upx;
		padding-bottom: 20upx;
		width:100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		margin-top: 0upx;
		.gocar{
			width:57upx;
			height:57upx;
			margin-left:auto;
			position: relative;
			.jiahao{
				width:42upx;
				height:42upx;
				position: absolute;
				bottom: 0;
				left:0;
				z-index: 2;
			}
			.numwrap{
				width:33upx;
				height:33upx;
				position: absolute;
				right:0;
				top:0;
				z-index: 3;
				.carnum{
					width:100%;
					height:100%;
				}
				text{
					font-size: 21upx;
					color:white;
					line-height: 33upx;
					text-align: center;
					position: absolute;
					left:50%;
					top:50%;
					transform: translate(-50%, -50%);
				}
			}
		}
	}
}
.goodsfix{
	margin-right: 0upx!important;
}
</style>
