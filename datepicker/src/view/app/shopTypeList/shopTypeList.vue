<template>
	<div class="page">
		<div @click="show" class="show">show</div>
		<div>选中的日期是{{selectData}}</div>
		<template v-if="isShowDate">
			<datePicker ref="datePicker" 
			@select="confirm"
			:minDate="minDate"
			:maxDate="maxDate" 
			:type="type"
			:title="title"></datePicker>
        </template>
	</div>
</template>

<script>
import datePicker from './datePicker.vue';

	export default {
	//路由进入之前
		beforeRouteEnter (to, from, next) {
			next() 
		},
		
		data(){
			return {
				minDate:-1,		//时间戳
				maxDate:-1,		//时间戳
				title:"选择日期",
		        isShowDate:false,
		        selectData:"",
		        type:"date",	//类型  date是年月日  其他是年月日时分秒  
			}
		},
		mounted(){
			this.init()
		},
		components: {
	      datePicker
	    },
		methods:{
			init(){
				// this.minDate = new Date('2006-03-01').getTime()
				// this.maxDate = new Date('2018-01-01').getTime()
				this.isShowDate = true
			},
			show(){
				let datePicker = this.$refs['datePicker']
				datePicker.show()
			},
			confirm(selectedIndex,selectVal){
				console.log(selectedIndex,selectVal);
				this.selectData = selectVal[0]+'年'+selectVal[1]+'月'+selectVal[2]
			}

		}
	}
</script>
<style scoped>

</style>