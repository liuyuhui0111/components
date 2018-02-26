<template>
	<div class="page">
	<div class="bg">
		<div class="searchBox hairline-bottom">
			<input type="text" v-model="searchVal" placeholder="请输入商品名称">
			<span @click="search" class="btn_sub">搜索</span>
		</div>
	</div>
		<div class="searchType hairline-bottom">
			<div v-if="typeData1.length>0" @click="showPicker(1)" class="fl">{{typeStr}}</div>
			<div class="timeBox">
				<span @click="selectDate(1)">{{timeVal1}}</span>
				<i>至</i>
				<span @click="selectDate(2)">{{timeVal2}}</span>
			</div>
		</div>
		<div class="typeData1" v-if="showType1">
			<ul>
				<li @click="checkType(item)" v-for="item in typeData1">
					{{item.name}}
				</li>
			</ul>
		</div>
		<div class="typeData2" v-if="showType2">
			<ul>
				<li v-for="item in curTypeData">
					{{item.rtname}}
				</li>
			</ul>
		</div>
		<ul class="shopList" v-if="list.length>0">
			<li @click="goDetail(item)" class="hairline-bottom" v-for="(item,index) in list" :key="index">
				<div class="name">
					<span class="bd">{{item.rcName}}</span>
					<span class="price"><i>&yen;</i>{{item.rcPrice}}</span>
				</div>
				<div class="type">
					<span>{{item.rcUnit}}</span>
					
				</div>
				<div class="storeName">
					<span>{{item.rcCompany}}</span>
					<span>{{item.rpctime}}</span>
				</div>
			</li>
		</ul>

		<div class="nodata" v-if="isEmpty">
			<img src="../img/nodata.png" alt="">
			<p>暂无搜索结果</p>
		</div>
		<template v-if="isShowPicker">
		 <picker @change="handleChange" @select="handleSelect(arg)" :data="data" :selected-index="selectedIndex"
            ref="picker1" :title="选择类目"></picker>
            </template>
	</div>
</template>
<script>
	import js from './shopList.js'
	export default js
</script>
<style scoped>
.page{
	position: relative;
	min-height: 100%;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	background: #fff;
}
.nodata{
	display: block;
	width: 100%;
	text-align: center;
}
.nodata img{
	display: block;
	width: 120px;
	height: 120px;
	margin: 20px auto;
}
.bd{
	font-weight: bold;
	max-width: 260px;
}
.bg{
	background-color: #f2f2f4;
	padding:8px; 
}
	.searchBox{
		width: 100%;
		line-height: 28px;
		padding: 8px 52px 8px 36px;
		position: relative;
		background: url('../img/search.png') no-repeat 16px 18px;
		background-size: 12px 12px;
		background-color: #fff;
	}
	
	.searchBox .btn_sub{
		position: absolute;
		right: 0px;
		font-size: 17px;
		display: block;
		height: 100%;
		line-height: 44px;
		background: #f2f2f4;
		top: 0;
		padding:0 10px; 

	}
	.searchBox input{
		font-size: 14px;
		color: #222;
		line-height: 28px;
		display: block;
		width: 100%;
		
	}
	.searchType{
		font-size: 14px;
		color: #222;
		overflow: hidden;
		position: relative;
		height: 44px;
		line-height: 44px;
		padding: 0 15px;
	}
	.searchType .fl{
		float: left;
	}
	.searchType .timeBox{
		float: right;
		position: relative;
		font-size: 15px;
	}
	.searchType .timeBox span{
		padding-right: 14px;
		background: url('../img/select.png') no-repeat right 8px;
		background-size: 10px 6px;
	}
	
	.searchType .timeBox i{
		color: #8e8e93;
		font-size: 14px;
		margin: 0 4px;
	}
	.shopList li{
		padding: 15px;
	}
	.storeName,
	.shopList li .name{
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flex;
		display: -o-flex;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.shopList li .name{
		color: #000;
		font-size: 17px;
		margin-bottom: 6px;
	}
	.shopList li .name .price{
		color: #df3031;
		font-size: 17px;
	}
	.shopList li .name .price i{
		font-size: 13px;
		font-style: normal;
		margin-right: 2px;
	}
	.shopList li .type{
		font-size: 14px;
		color: #8e8e93;
	}
	.storeName span{
		font-size: 14px;
		color: #8e8e93;
	}
	
</style>