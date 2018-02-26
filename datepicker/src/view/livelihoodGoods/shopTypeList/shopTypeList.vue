<template>
	<div class="page">
		<ul class="typeList" v-if="list.length>0">
			<li class="hairline-bottom" @click="goPage(item)" v-for="(item,index) in list" :key="index">{{item.name}}
			</li>
		</ul>
		<div class="nodata" v-if="isEmpty">
			暂无商品分类信息
		</div>
	</div>
</template>

<script>
import {getTypes} from 'src/module/livelihoodGoods.module.js'

	export default {
	//路由进入之前
		beforeRouteEnter (to, from, next) {
			next() 
		},
		data(){
			return {
				list:[],
				curindex:0,
				isEmpty:false,
			}
		},
		mounted(){
			this.init()
		},
		methods:{
			init(){
				this.list = []
				this.curindex = 0
				document.title = '民生商品'
				getTypes().then((res)=>{
					try{
						if(res.data.result.result){
							this.isEmpty = false

							let obj = res.data.result.result
							let arr = []
							console.log(obj);
							for(var i in obj){
								
								arr.push({
									id:i.split("=")[1],
									name:i.split("=")[0],
								})
							}
							this.list = arr
							// this.list = res.data.result.result || []
						}else{
							this.list = []
							this.isEmpty = true
						}
					}catch(e){
						this.$$Message("网络连接失败，请稍后再试")
					}
				},(err)=>{
					console.log(err)
					this.isEmpty = true
					this.$$Message("网络连接失败，请稍后再试")
				})
			},
			goPage(item){
				console.log(item);
				this.$router.push({path:'/shopList',query:item})
			},
		}
	}
</script>
<style scoped>
	.typeList{
		display: block;
		width: 100%;
		box-sizing:border-box;
		padding-left: 15px;
		overflow: hidden;
	}
	.typeList li{
		line-height: 34px;
		min-height: 34px;
		padding: 10px 21px 10px 0px;
		display: block;
		font-size: 16px;
		color: #1a1a1a;
		position: relative;
	}
	.typeList li:before{
		content: "";
		position: absolute;
		background: url('../img/tra.png') no-repeat right center;
		background-size: 6px 10px;
		right: 15px;
		top: 0;
		width: 6px;
		height: 100%;
	}
	.nodata{
		text-align: center;
		line-height: 100px;
	}
</style>