var Toast = {timer:null};
// var showToast = false, // 存储toast显示状态
//     showLoad = false, // 存储loading显示状态
//     toastVM = null, // 存储toast vm
//     loadNode = null; // 存储loading节点元素

Toast.install = function (Vue, options) {
    let _this = this
    var opt = {
        duration: '2500',
        styleObj:{
            "position":"fixed",
            "top":"50%",
            "left":"50%",
            "transform":"translate(-50%,-50%)",
            "background":"rgba(0,0,0,0.7)",
            "color":"#fff",
            "textAlign":"center",
            "fontSize":"16px",
            "padding":"10px",
            "borderRadius":"5px",
            "zIndex":"99",
            "max-width":"100%"
        },
        isCreateMore:false,
    };
    for (var property in options) {
        opt[property] = options[property];
    }
    var toastVM = null;
    var isCreate = false;
    Vue.prototype.$$Message = function (obj) {
        var tips = obj.message || "";
        var delay = obj.duration || opt.duration
        var styleObj = opt.styleObj || null
        if(typeof(obj) === 'string' ||typeof(obj) === "number"){
            tips = obj;
        }
        var tmp = '<div ref="commonToastMessageBox" v-show="show" :style="styleObj" >{{tip}}</div>';        
        if (!isCreate || opt.isCreateMore) {
            var toastTpl = Vue.extend({
                data: function () {
                    return {
                        show: false,
                        tip: "",
                        styleObj
                    }
                },
                template: tmp
            });
            toastVM = new toastTpl()
            var tpl = toastVM.$mount().$el;
            document.body.appendChild(tpl);
            isCreate = true
        }
        toastVM.tip = tips
        toastVM.show = true;
        clearTimeout(_this.timer);
        _this.timer = setTimeout(function () {
            toastVM.show = false;
        }, delay)
    };
}
module.exports = Toast;