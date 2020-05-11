<template name="navTab">
	<view class="navWrap">
		<image src="../static/images/navright.png" class="nr"></image>
		<text class="title">{{title}}</text>
		<image src="../static/images/navleft.png" class="nl"></image>
	</view>
</template>

<script>
	export default {
		name: 'navTab',
		data() {
			return {
				
			}
		},
		props: {
			title:{
				type: String
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.navWrap{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-top:30upx;
	margin-bottom: 20upx;
	.nr{
		width:84upx;
		height:65upx;
	}
	.nl{
		width:54upx;
		height:51upx;
	}
	text{
		font-size: 27upx;
		color:#666;
		font-weight: bold;
		letter-spacing: 15upx;
		margin-left:25upx;
		margin-right:25upx;
	}
}
</style>
