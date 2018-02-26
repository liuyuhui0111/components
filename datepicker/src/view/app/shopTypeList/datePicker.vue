<template>
	<div class="page">
		<template v-if="isShowDate">
		<picker @change="handleChange" @select="handleSelect" :data="data" :selected-index="selectIndex"
            ref="picker" :title="title"></picker>
        </template>
	</div>
</template>

<script>
import picker from './picker.vue';

	export default {
	//路由进入之前
		beforeRouteEnter (to, from, next) {
			next() 
		},
		props:{
			minDate:{
				type:Number,
				default:-1,				//最小日期
			},
			maxDate:{
				type:Number,
				default:-1,				//最大日期
			},
			step:{
				type:Number,
				default:10,		//年份区间 默认是当前年份的前10年  后10年
			},
			initDateTime:{
				type:Number,
				default:new Date().getTime()		//默认展示当前时间
			},
			title:{
				type:String,
				default:"选择日期",
			},
			selectIndex:{
				type:Array,
				default:[0,0,0,0,0,0],
			},
			type:{
				type:String,
				default:"date"
			},
			orderBy:{
				type:String,
				default:"asc"
			}
		},
		data(){
			return {
				data: [],
		        isShowDate:false,
		        minDateData:[0,0,0,0,0,0],		//年月日时分秒
		        maxDateData:[0,0,0,0,0,0]		//年月日时分秒
			}
		},
		mounted(){
			this.init()
		},
		watch:{
			'minDate':'setData',
			'maxDate':'setData'
		},
		components: {
	      picker
	    },
		methods:{
			init(){
				this.setData()
			},
			setDateData(time){

				let yy = parseInt(new Date(time).getFullYear())
				let mm = parseInt(new Date(time).getMonth())+1
				let dd = parseInt(new Date(time).getDate())
				let hh = parseInt(new Date(time).getHours())
				let mi = parseInt(new Date(time).getMinutes())
				let ss = parseInt(new Date(time).getSeconds())
				mm = mm<10 ? '0'+mm : mm
				dd = dd<10 ? '0'+dd : dd
				hh = hh<10 ? '0'+hh : hh
				mi = mi<10 ? '0'+mi : mi
				ss = ss<10 ? '0'+ss : ss
				let arr = [yy,mm,dd,hh,mi,ss]
				if(this.type == 'date'){
					arr = [yy,mm,dd]
				}
				
				return arr
			},
			setData(){
				let arr = []
				let years = []
				let months = []
				let days = []

				let hours = []
				let minutes = []
				let seconds = []
				// if(this.initDateTime<this.minDate || this.initDateTime>this.maxDate){
				// 	this.initDateTime = this.initDateTime<this.minDate ? this.minDate : this.maxDate
				// }
				debugger
				this.minDate = this.minDate>0 ? this.minDate : new Date(new Date().getFullYear()-this.step,0,1)
				this.maxDate = this.maxDate>0 ? this.maxDate : new Date(new Date().getFullYear()+this.step,0,1)
				this.minDateData = this.setDateData(this.minDate)
				this.maxDateData = this.setDateData(this.maxDate)
				for (let i = 0; i < 60; i++) {
					let text = i<10 ? '0'+i :i
					if(i<24){
						hours.push({text:text,value:text})
					}
					minutes.push({text:text,value:text})
					seconds.push({text:text,value:text})
				}
				if(this.minDate<0 && this.maxDate<0){
					let cury = parseInt(new Date().getFullYear())
					
					for (let i = cury-this.step; i < cury+this.step; i++) {
						years.push({text:i,value:i})
					}

				}else{
					
					if(this.minDate>0 && this.maxDate>0){
						let minItem = parseInt(new Date(this.minDate).getFullYear())
						let maxItem = parseInt(new Date(this.maxDate).getFullYear())
						if(minItem<maxItem){
							for (let i = minItem; i < maxItem+1; i++) {
								years.push({text:i,value:i})
							}
						}else{
							years.push({text:minItem,value:minItem})
						}

					}else if(this.minDate>0){

						let minItem = parseInt(new Date(this.minDate).getFullYear())
						for (let i = minItem; i < minItem+this.step; i++) {
							years.push({text:i,value:i})
						}

					}else if(this.maxDate>0){

						let maxItem = parseInt(new Date(this.maxDate).getFullYear())
						for (let i = maxItem-this.step; i < maxItem+1; i++) {
							years.push({text:i,value:i})
						}

					}


				}
				
					
				if(this.orderBy == 'asc'){
					years.sort((a,b)=>{
						return b.value - a.value
					})
				}
				if(this.type == 'date'){
					this.data = [years,months,days]
				}else{
					this.data = [years,months,days,hours,seconds,minutes]
				}

				this.setMonths(true)
				this.isShowDate = true

			},
			initSelectIndex(initDate){
				// 设置日期初始化的值
		        let selectIndex = []
				for (let i = 0; i < initDate.length; i++) {
					let arr = this.data[i]
					for (let j = 0; j < arr.length; j++) {
						if(arr[j].value == initDate[i]){
							selectIndex.push(j)
							break
						}
					}
				}
				this.selectIndex = selectIndex

			},
			show(){
				let picker = this.$refs['picker']
		        picker.show()
			},
			scrollTo(i,min){
				let list = this.data[i]
				let cur = this.data[i][this.selectIndex[i]].value
				let index = 0
				if(cur == min){
					return 
				}else{
					for (let i = 0; i < list.length; i++) {
						if(list[i].value == min){
							index = i
							break
						}
					}
				}
				
				let picker = this.$refs['picker']
		        picker.scrollTo(i,index)
			},
			setDays(isInit){
				// 设置天数
				let arr = []

				let firstMonthDays = new Date(this.data[0][this.selectIndex[0]].value,this.data[1][this.selectIndex[1]].value,0).getDate()

				if(isInit){
					firstMonthDays =  new Date(this.minDateData[0],this.minDateData[1],0).getDate()
				}

				if(this.data[2].length == firstMonthDays){
					// 判断当月天数是否相同  相同直接返回
					return
				}else{
					
					let prev = null
					if(this.data[2].length>0){
						prev = this.data[2][this.selectIndex[2]]
					}
					for (let i = 1; i < firstMonthDays+1; i++) {
						let text = i>9 ? i : '0'+i
						arr.push({text:text,value:text})
					}
					if(this.orderBy == 'asc'){
						arr.sort((a,b)=>{
							return b.value - a.value
						})
					}

					// this.selectIndex[2] = index
					

					this.$set(this.data,2,arr)
					// debugger
					if(prev){
						let index = 0
						for (let i = 0; i < this.data[2].length; i++) {
							if(this.data[2][i].value == prev.value){
								index = i
							}
						}
						let picker = this.$refs['picker']
			        	picker.scrollTo(2,index)
		        	}
						

				}

				if(isInit){
					this.initSelectIndex(this.setDateData(this.initDateTime))
				}
				
			},
			setMonths(isInit){

				let arr = []
				for (let i = 1; i < 13; i++) {
					i = i>9 ? i : '0'+i
					arr.push({text:i,value:i})
				}
				if(this.orderBy == 'asc'){
					arr.sort((a,b)=>{
						return b.value - a.value
					})
				}
				this.$set(this.data,1,arr)
				this.setDays(isInit)
			},
			handleChange(col,row){
				this.selectIndex[col] = row
				this.setDays()

				let minStr = ''
				let maxStr = ''
				let curStr = ''
				for (let i = 0; i < this.minDateData.length; i++) {
					curStr += this.data[i][this.selectIndex[i]].value
					minStr += this.minDateData[i]
					maxStr += this.maxDateData[i]
				}
				let curData = this.data[col]
				if(parseInt(curStr)>=parseInt(minStr) && parseInt(curStr)<=parseInt(maxStr)){
					return
				}else{
					if(parseInt(curStr)<parseInt(minStr)){
						for (var i = 0; i < this.data.length; i++) {
							let min = parseInt(this.minDateData[i])
							let cur = parseInt(this.data[i][this.selectIndex[i]].value)
							this.scrollTo(i,min)
						}
					}else{
						for (var i = 0; i < this.data.length; i++) {
							let max = parseInt(this.maxDateData[i])
							let cur = parseInt(this.data[i][this.selectIndex[i]].value)
							this.scrollTo(i,max)
						}
					}
				}


				
			},
			handleSelect(args,selectIndex,selectVal){

				this.$emit('select',selectIndex,selectVal)
			}

		}
	}
</script>
<style scoped>

</style>