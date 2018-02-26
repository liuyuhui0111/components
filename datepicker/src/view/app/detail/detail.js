import "src/assets/date/min/mobiscroll.date.min.css"
import datetimePlugChange from "src/assets/date/min/mobiscroll.date.min.js"
import { getPriceTrend } from 'src/module/livelihoodGoods.module.js'
import { dateFormat, isEmojiCharacter } from "src/assets/js/util"
import echart from './echarts.min.js'
export default {
    //路由进入之前
    beforeRouteEnter(to, from, next) {
            next()
        },
        data() {
            return {
                name: "",
                level: "",
                detail: {
                    name: "",
                    level: "",
                },
                timeVal1: "开始时间", //开始时间
                timeVal2: "结束时间", //开始时间
                params: {},
                isEmpty: false,
                timer: null,
                myEchart: null,
                option: {},
                echartPrice: [],
                echartTime: [],
                objStyle: {
                    width: '200px',
                },
                hasData: false,
                isShowEchart: true,
                echartList:[],
            }
        },
        activated() {
            this.init()
        },
        watch: {
            'timeVal1': function(val, oldval) {
                this.params.timeB = this.timeVal1
                this.getPriceTrendFun()
            },
            'timeVal2': function(val, oldval) {
                this.params.timeE = this.timeVal2
                this.getPriceTrendFun()
            },
        },
        methods: {
            init() {


                document.title = "民生商品价格"
                this.detail = this.$route.query
                this.timeVal1 = this.getToday()
                this.timeVal2 = this.getToday()
                this.params = {
                    "rcModel": this.detail.rcModelLev,
                    "reID": this.detail.rcID,
                    "timeB": this.timeVal1,
                    "timeE": this.timeVal2
                }
                this.getPriceTrendFun()

            },
            echartInit() {

                this.myChart = echart.init(document.getElementById('echart'))

                this.echartStart()
            },
            echartStart() {
                this.myChart.resize()
                this.option = {

                    legend: { //图例组件

                        data: ['价格区间']

                    },

                    grid: { //直角坐标系内绘图网格

                        left: '0',

                        right: '30',

                        bottom: '0',

                        containLabel: true

                    },



                    xAxis: { //直角坐标系 grid 中的 x 轴

                        type: 'category',

                        boundaryGap: false,

                        data: this.echartTime

                    },

                    yAxis: { //直角坐标系 grid 中的 y 轴

                        type: 'value'

                    },

                    series: [ //系列列表

                        {

                            name: '价格区间',

                            type: 'line',

                            stack: '总量',

                            data: this.echartPrice

                        }

                    ]

                }
                this.myChart.setOption(this.option,true)

            },
            setX() {

               if(this.echartPrice.length>12){
                this.objStyle.width = this.echartPrice.length * 30 + 'px'
                }else{
                     this.objStyle.width = '375px'
                }
                setTimeout(()=>{
                    this.echartInit()
                },30)
            },
            
            getPriceByDay(day) {
                return parseInt(Math.random() * 1000)
            },
            getTime(val) {
                if (val == 0) return ""
                let show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
                let time = new Date(val);
                let year = time.getFullYear();
                let month = time.getMonth();
                let date = time.getDate();
                let day = time.getDay();
                let hour = time.getHours();
                let minutes = time.getMinutes();
                let second = time.getSeconds();
                month = month < 10 ? '0' + month : month;
                month = parseInt(month) + 1;
                hour = hour < 10 ? ' 0' + hour : hour;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                second = second < 10 ? '0' + second : second;
                let now_time = year + '-' + month + '-' + date;

                return now_time
            },

            getPriceTrendFun() {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    getPriceTrend(this.params).then((res) => {
                        try {
                            if (res.data.result.result[0] == null) {
                                this.isEmpty = true
                            } else {
                                this.isEmpty = false
                                this.hasData = true
                                let arr = res.data.result.result
                                let arr1 = []
                                let times = []
                                let prices = []
                                let echL = []
                                for (let i = 0; i < arr.length; i++) {
                                    if (arr[i].rcID == this.params.reID) {
                                        arr1.push(arr[i])
                                    }
                                }
                                for (let i = 0; i < arr1.length; i++) {
                                    let t = arr1[i].rpctime.split(" ")[0]
                                    let p = arr1[i].rcPrice
                                    echL.push({"price":p,"time":t})
                                    times.push(t)
                                    prices.push(p)
                                }
                                this.echartList = echL
                                this.echartTime = times
                                this.echartPrice = prices
                                this.setX()
                                
                            }
                        } catch (e) {
                            this.$$Message("网络连接失败，请稍后再试")
                        }
                    }, (err) => {
                        this.$$Message("网络连接失败，请稍后再试")
                    })
                }, 20);

            },
            getToday() {
                let time = new Date();
                let year = time.getFullYear();
                let month = time.getMonth();
                let date = time.getDate();
                let day = time.getDay();
                let hour = time.getHours();
                let minutes = time.getMinutes();
                let second = time.getSeconds();
                month = month < 10 ? '0' + month : month;
                month = parseInt(month) + 1;
                hour = hour < 10 ? ' 0' + hour : hour;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                second = second < 10 ? '0' + second : second;
                let now_time = year + '-' + month + '-' + date;
                return now_time
            },
            //选择日期
            selectDate(type) {

                let _this = this,
                    defaultVal, now = new Date();
                datetimePlugChange.dateTimeOpt.minDate = now;
                datetimePlugChange.dateTimeOpt.preset = "date";
                if (type == 1) {
                    if (this.timeVal2 != "结束时间") {
                        datetimePlugChange.dateTimeOpt.maxDate = new Date(this.timeVal2);
                    }
                    datetimePlugChange.dateTimeOpt.minDate = new Date(1990, (new Date()).getMonth(), (new Date()).getDate() + 7, 23, 59);
                }
                if (type == 2) {
                    datetimePlugChange.dateTimeOpt.minDate = new Date(this.timeVal1);
                    datetimePlugChange.dateTimeOpt.maxDate = new Date(2100, (new Date()).getMonth(), (new Date()).getDate() + 7, 23, 59);;
                }
                defaultVal = dateFormat("yyyy-mm-dd", now.getTime());
                datetimePlugChange.ready(this, 'datetimePlug', 'dateTimeOpt', function(val) {
                    if (type == 1) {
                        _this.timeVal1 = val;

                    } else {
                        _this.timeVal2 = val;
                    }

                }, defaultVal);
            },
        }
}
