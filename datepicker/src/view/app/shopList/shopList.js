import {queryShopList,getTypes} from 'src/module/livelihoodGoods.module.js'
import {droploadUpOnScroll} from 'src/assets/js/util.js'
import  "src/assets/date/min/mobiscroll.date.min.css"
import datetimePlugChange from  "src/assets/date/min/mobiscroll.date.min.js"
import {dateFormat,isEmojiCharacter} from   "src/assets/js/util"
import picker from './picker.vue';


export default {
	//路由进入之前
		beforeRouteEnter (to, from, next) {
			next() 
		},
		components: {
	      picker
	    },
		data(){
			return {
				list:[],
				searchVal:"",
				params:{
					rtId:"",	//父类别ID
					pageIndex:1,		//当前页
					pageSize:20,		//查询条数
					reName:"",			//商品名称
				},
				curType:"",
				typeData1:[],		//一级分类
				typeData2:[],		//二级分类
				isEmpty:false,
				timeVal1:"开始时间",	//开始时间
				timeVal2:"结束时间",	//开始时间
				showType1:false,
				showType2:false,
				curTypeData:[],


				isShowPicker:false,
				 data: [[{text:"全部",value:""}],[{text:"全部",value:""}]],
		        selectedIndex: [
		          0, 0
		        ],

		        pickerData1:[[{text:"全部",value:""}]],
		       	typeStr:"全部类目",				//商品类型展示字段
		        
			}
		},
		activated(){
			this.init()
		},
		
		methods:{
			
			init(){
				document.title = "民生商品价格"
				this.data=[[{text:"全部",value:""}],[{text:"全部",value:""}]]
				this.isShowPicker = false
				this.curType=""
				this.typeData1=[]		//一级分类
				this.typeData2=[]		//二级分类
				this.timeVal1="开始时间"	//开始时间
				this.timeVal2="结束时间"	//开始时间
				this.showType1=false
				this.showType2=false
				this.curTypeData=[]
				this.params = {
					subRtId:"",	//子类别ID
					rtId:"",	//父类别ID
					pageIndex:1,		//当前页
					pageSize:20,		//查询条数
					reName:"",			//商品名称
					timeB:"",			//开始时间
					timeE:"",			//结束时间
				}
				this.isEmpty = false
				this.list = []
				// console.log(this.$route.query)
				this.typeStr = this.$route.query.name || "全部类目"
				this.params.rtId = this.$route.query.id || ""
				getTypes().then((res)=>{
					try{
						if(res.data.result.result){
							let obj = res.data.result.result
							let arr = []
							let arr2 = []
							let arr3 = [[{text:"全部",value:""}]]
							for(var i in obj){
								arr.push({
									id:i.split("=")[1],
									name:i.split("=")[0],
								})
								this.data[0].push({value:i.split("=")[1],
									text:i.split("=")[0]})
								arr2.push({
									"id":i.split("=")[1],
									"list":obj[i]
								})
								let dataArr = [{text:"全部",value:""}]
								for (var j = 0; j < obj[i].length; j++) {
									dataArr.push({
										text:obj[i][j].rtname,
										value:obj[i][j].rtid
									})
								}
								arr3.push(dataArr)
							}
							this.pickerData1 = arr3

							this.data[1] = arr3[0]

							this.typeData1 = arr
							this.typeData2 = arr2
							// console.log(this.pickerData1);
							this.isShowPicker =true
							// this.list = res.data.result.result || []
						}else{
							this.list = []
						}
					}catch(e){
						this.$$Message("网络连接失败，请稍后再试")
					}
				},(err)=>{
					this.$$Message("网络连接失败，请稍后再试")
				})
				this.queryShopListFun()
			},
			checkType(item){
				this.curType = item.id
				this.showType2 = true
				let arr = this.typeData2
				for (var i = 0; i < arr.length; i++) {
					if(arr[i].id == item.id){
						this.curTypeData = arr[i].list
					}
				}
				// console.log(this.curTypeData);
			},
			handleChange(i, newIndex){
				// console.log(i,newIndex);
				if(i>0) return
				if(newIndex == 0){
					this.$set(this.data,1,[{text:"全部",value:""}])
				}else{
					this.$set(this.data,1,this.pickerData1[newIndex])
				}
				
				this.$refs.picker1.refresh()
			},
			goDetail(item){
				// console.log(item);
				this.$router.push({path:"/detail",query:item})
			},
			queryShopListFun(upload){
				if(!upload){
					this.list = []
				}
				queryShopList(this.params).then((res)=>{
					try{
						if(res.data.result.result[0]){
							this.list = this.list.concat(res.data.result.result)
							if(res.data.result.result.length>=this.params.pageSize){
								droploadUpOnScroll(this.upLoadFun)
								this.isEmpty = false
							}else{
								droploadUpOnScroll(null)
							}
						}else{
							this.list = []
							this.isEmpty = true
						}
					}catch(e){
						this.$$Message("网络连接失败，请稍后再试")
					}
					// console.log(res);
				},(err)=>{
					console.log(err);
					this.$$Message("网络连接失败，请稍后再试")
				})
			},
			upLoadFun(){
				this.params.pageIndex += 1
				this.queryShopListFun(true)
			},
			search(){
				this.params.reName = this.searchVal
				this.params.pageIndex = 1

				this.queryShopListFun()
			},
			showTime(type){
				// console.log(type);
			},
			//选择日期
		    selectDate(type){

		      let  _this = this, defaultVal, now = new Date() ;
		      datetimePlugChange.dateTimeOpt.minDate = now   ;
		      datetimePlugChange.dateTimeOpt.preset = "date";
		      if(type == 1){
		      	if(this.timeVal2 != "结束时间"){
		      		datetimePlugChange.dateTimeOpt.maxDate = new Date(this.timeVal2);
		     	}	
		      	datetimePlugChange.dateTimeOpt.minDate = new Date(1990,(new Date()).getMonth(),(new Date()).getDate()+7,23,59);
		      }
		      if(type == 2){
		      	datetimePlugChange.dateTimeOpt.minDate = new Date(this.timeVal1);
		      	datetimePlugChange.dateTimeOpt.maxDate = new Date(2100,(new Date()).getMonth(),(new Date()).getDate()+7,23,59);;
		      }
		      defaultVal = dateFormat( "yyyy-mm-dd" , now.getTime() )  ;
		      datetimePlugChange.ready(this ,'datetimePlug' , 'dateTimeOpt' ,function(val){
		      	if(type == 1 ){
		         	_this.timeVal1 = val 
		         	_this.params.timeB = val
		         	_this.params.pageIndex = 1
		         	_this.queryShopListFun()
		      	}else{
		      		_this.timeVal2 = val 
		      		_this.params.timeE = val
		      		_this.params.pageIndex = 1
		      		_this.queryShopListFun()
		      	}

		      },  defaultVal )
		    },

		    showPicker(index) {
		        let picker = this.$refs['picker' + index]

		        picker.show()
		      },
		      handleSelect() {
		      	if(this.selectedIndex[0] == 0){
		      		this.typeStr = "全部"
		      	}else{
		       		this.typeStr = this.data[0][this.selectedIndex[0]].text+'/'+this.data[1][this.selectedIndex[1]].text
		       }
		       this.params.pageIndex = 1
		       this.params.rtId = this.data[0][this.selectedIndex[0]].value
		       this.params.subRtId = this.data[1][this.selectedIndex[1]].value
		       this.queryShopListFun()
		      },
		}
	}