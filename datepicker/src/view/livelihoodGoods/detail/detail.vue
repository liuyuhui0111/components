<template>
	<div class="detail">
		<div class="topBox">
			<p class="name">{{detail.rcName}}</p>
			<p>商品类别：<span>{{detail.subRtId}}</span></p>
			<p v-if="detail.rcModelLev">规格等级：<span>{{detail.rcModelLev}}</span></p>
			<p>计量单位：<span>{{detail.rcUnit}}</span></p>
			<p>产地：<span>{{detail.rcPleace}}</span></p>
			<p>商家门店：<span>{{detail.rcCompany}}</span></p>

		</div>
		<div class="listTitle hairline-bottom">
			<div class="fl" @click="isShowEchart = !isShowEchart">
			<span v-show="isShowEchart">看列表</span>
			<span v-show="!isShowEchart">看图表</span>
			</div>
			<div class="timeBox">
				<span @click="selectDate(1)">{{timeVal1}}</span>
				<i>至</i>
				<span @click="selectDate(2)">{{timeVal2}}</span>
			</div>
		</div>
		<div class="topBox" v-show="isEmpty">
			<p class="nodata">
				暂无该时间段价格信息
			</p>
		</div>
		<div class="hasData" v-show="!isEmpty && hasData">
		<div class="echartShow" v-show="isShowEchart">
			<div class="ehcartBox">
				<div id="echart" :style="objStyle">
					
				</div>
			</div>
		</div>
			<div class="echartList" v-show="!isShowEchart">
				<ul>
					<li class="hairline-top" v-for="item in echartList">
						<span class="time">{{item.time}}</span>
						<span class="price">&yen; {{item.price}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import js from './detail.js'
	export default js
</script>
<style scoped>
#echart{
	width: 100%;
	height: 300px;
}
.echartShow{
	width: 100%;
	height: 350px;
	overflow-y: hidden;
	position: relative;
	-webkit-transform: translate3d(0,-50px,0);
	-ms-transform: translate3d(0,-50px,0);
	-o-transform: translate3d(0,-50px,0);
	transform: translate3d(0,-50px,0);
	z-index: 1;
}
.ehcartBox{
	width: 100%;
	overflow-x: auto;
	height: 400px;
}
.fl{
	float: left;
}
.detail{
	position: relative;
	background: #fff;
	min-height: 100%;
	display: block;
	width: 100%;
	overflow-x: hidden;
}
.nodata{
	display: block;
	text-align: center;
	height: 44px;
	line-height: 44px;
	width: 100%;
}
	.topBox{
		display: block;
		font-size: 15px;
		color: #8e8e93;
		line-height: 21px;
		padding:15px;
		
	}
	.listTitle{
		padding:0 15px;
		border-top: 10px solid #f2f2f4;
		height: 44px;
		line-height: 44px;
		box-sizing:content-box;
		position: relative;
		z-index: 2;
	}
	.topBox p{
		margin-bottom: 3px;
	}
	.topBox .name{
		font-size: 17px;
		color: #222;	
		margin-bottom: 6px;
	}
	.timeBox{
		float: right;
		position: relative;
		font-size: 15px;

	}
	.timeBox span{
		padding-right: 14px;
		background: url('../img/select.png') no-repeat right 8px;
		background-size: 10px 6px;
	}
	
	.timeBox i{
		color: #8e8e93;
		font-size: 14px;
		margin: 0 4px;
	}
	.echartList{
		position: relative;
		width: 100%;
	}
	.echartList li{
		height: 44px;
		line-height: 24px;
		padding:10px 15px;
		font-size: 15px;
		color: #222;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flex;
		display: -o-flex;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		
	}
	.echartList li .time{
		color: #8e8e93;
	}
</style>