
  //全局数据
  export function GData(GKey, GValue) {
    window.GData = window.GData || {} ;
    if (GValue != undefined) {
      window.GData[GKey] = GValue;
    } else {
      return window.GData[GKey];
    }
  }

  export function sessionData(key, value) {
      if(value) {
        value = JSON.stringify(value);
        sessionStorage.setItem(key, value)
      }else {
        let value = sessionStorage.getItem(key);
        value = JSON.parse(value);
        // sessionStorage.removeItem(key)
        return value;
      }
  }

  export function sessionId(sessionId) {
    if (sessionId) {
      sessionStorage.setItem("sessionId", sessionId);
    } else {
      return sessionStorage.getItem("sessionId");
    }
  }

  export function deepCopy(source) {
    var result = {};
    for (var key in source) {
      result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key];
    }

    return result;
  }

  /**
   * 设置页面标题
   * @param name
   * @returns {null}
   */
  export function setTit (title) {
    if (!title) return;
    document.title = title;

   try{
     setTitle(title)
   }catch (e){

   }
  }
  /**
   * 获取url参数
   * @param name
   * @returns {*}
   */
  export function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r === null) {
      var reg2 = /^.*?[?]/;
      var r2 = window.location.hash.replace(reg2, "")
      r = r2.match(reg);
    }

    if (r != null) return r[2];
    return null;
  }
  /**
   * 关闭toon
   */
  export function closeWindow() {
    var params = {
      "functionType": 1
    };
    window.location.href = "toon://mwap/window?params=" + JSON.stringify(params);
  }

  /**
   * 加载更多的函数 ； shaobo
   *  droploadUpOnScroll(callback , "MoreAndMore");
   */
  export function droploadUpOnScroll(callback, ele, scrollEle) {

    if (!callback) {
      window.onscroll = false;
      return false;
    }
    if (!ele) {
      ele = "droploadDOM";
      if (!document.getElementById(ele)) {
        var droploadDOM = document.createElement("p");
        droploadDOM.id = 'droploadDOM';
        document.body.appendChild(droploadDOM);
      }
    }
    var MAM = document.getElementById(ele);	//绑定元素

    var gap = parseInt(MAM && MAM.getAttribute("data-gap")) || 0; //获取差值

    if (!scrollEle) {
      var winHeight = window.innerHeight;
      var mTop, sTop, result;
      window.onscroll = function () {
      	
        mTop = MAM.offsetTop;
        sTop = document.body.scrollTop;  //滚动条距离顶部
        result = mTop - sTop;
        if (result <= (winHeight + gap)) {
          callback();  //回调
        }
      }
    } else {

      let scrollContainer = document.getElementById(scrollEle)
      let winHeight = scrollContainer.offsetHeight;
      let mTop, sTop, result;

      console.log(scrollContainer)
      scrollContainer.onscroll = function () {



        mTop = MAM.offsetTop;
        sTop = scrollContainer.scrollTop;  //滚动条距离顶部
        result = mTop - sTop;
        if (result <= (winHeight + gap)) {
          callback();  //回调
        }
      }
    }
  }
  /**
   * confirm组件
   * @param {Object} param
   */
  export function confirm(param) {
    var componentsAlert = document.getElementById("componentsAlert") || false;
    //if(!param ){componentsAlert.style={display : "none"}}
    if (!param && componentsAlert.parentNode) { componentsAlert.parentNode.removeChild(componentsAlert); }
    var param = param || {};
    param.show = param.show || true; //默认显示
    param.title = param.title || "";
    param.message = param.message || "可能是网络环境不稳定引起的系统异常，请新打开页面后重试！";
    param.btnEsc = param.btnEsc == '' ? '' : param.btnEsc || "取消";
    param.btnOk = param.btnOk || "确定";
    param.btnOkFun = param.btnOkFun || function () { };
    param.btnEscFun = param.btnEscFun || function () { };
    param.input = param.input || false;
    param.class = param.class || "";
    if (!componentsAlert) {
      var style = '<style>';
      style += '.componentsAlert {z-index: 999;position: fixed;top:0%;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.7); }\
						.componentsAlert .content{color: #030303;position: fixed;top:50%;left: 50%; -webkit-transform: translate(-50%,-50%);width:270px;background: rgba(255,255,255,0.90);border-radius: 5px;text-align: center;}\
						.componentsAlert .title{padding:20px 0 0 0 ;}\
						.componentsAlert .message{font-size: 13px;line-height: 150%;#color:#030303;padding:24px 15px 15px 15px;}\
						.componentsAlert .btnGroup{line-height: 43px;height: 43px; font-size: 0; }\
						.componentsAlert .btnGroup .btn {display:none; font-size:17px }\
						.componentsAlert .btnGroup.esc.ok .btn {width: 50%;display: inline-block;}\
						.componentsAlert .btnGroup.ok .btn.btnOk {width: 50%;display: inline-block;}\
						.componentsAlert .btnGroup .btnOk{color: #007AFF;}\
						.componentsAlert .btnGroup .btnEsc{color: #007AFF;}\
						.componentsAlert .lsh-confirm-pwd{margin: 0 auto 15px auto;width: 240px;height: 24px;padding-left: 6px;}\
						.componentsAlert .lsh-confirm-pwd::after{border-radius: 2px;}\
						.componentsAlert .lsh-confirm-input{width: 240px;height: 24px;position:absolute;z-index:99;left:6px;top:2px;line-height: 24px;font-size: 13px;color: #000;}\
						'
      style += '</style>';

      var html = '<div class="componentsAlert  ' + param.class + ' "  style="display:none;" id="componentsAlert">';
      html += '<div class="content">';
      html += param.title ? '<p class="title" > ' + param.title + '</p>' : '';
      html += '<p  class="message"  >';
      html += param.message;
      html += '</p>';
      html += param.input ? '<div class="lsh-confirm-pwd hairline"><input maxlength="18" id="textPwd" type="password" class="lsh-confirm-input" placeholder="输入实名认证密码"></div>' : '';
      html += '<p class="btnGroup ' + (param.btnEsc != "" ? "esc" : "") + ' ok hairline-top">';
      html += '<span  class="btn btnEsc hairline-right" id="AlertBtnEsc" >' + param.btnEsc + '</span>';
      html += '<span class="btn btnOk "  id="AlertBtnOk"  > ' + param.btnOk + '</span>';
      html += '</p>';
      html += '</div></div>';
      var alertDiv = document.createElement("div");
      alertDiv.innerHTML = style + html;
      document.body.appendChild(alertDiv);
      componentsAlert = document.getElementById("componentsAlert");
      //绑定事件
      document.getElementById("AlertBtnEsc").addEventListener('click', function () {
        param.btnEscFun();
        componentsAlert.style.display = "none";
        if (componentsAlert.parentNode) { componentsAlert.parentNode.removeChild(componentsAlert); }
      }, false);
      document.getElementById("AlertBtnOk").addEventListener('click', function () {
        param.btnOkFun();
        componentsAlert.style.display = "none";
        if (componentsAlert.parentNode) { componentsAlert.parentNode.removeChild(componentsAlert); }
      }, false);
    }
    if (param.show) {
      componentsAlert.style.display = "block";
    } else {
      componentsAlert.style.display = "none";
    }
  }
  /**
   * 补零
   * @param num
   * @returns {*}
   */
  export function zeroFill(num) {
    if (num > 0 && num < 10 || num.toString().length == 1 && num == 0) {
      return '0' + num;
    }
    return num;
  }
  /**
   * 毫秒转换友好的显示格式
   * 输出格式：21小时前
   * @param  {[type]} time [description]
   * @return {[type]}      [description]
   */
  export function dateStr(date) {
    //获取js 时间戳
    var time = new Date().getTime();
    var _data = new Date(parseInt(date));
    //去掉 js 时间戳后三位，与php 时间戳保持一致
    time = parseInt((time - date) / 1000);
   //存储转换值
    var s;
    if (time < 60 * 1) {//1分钟内
      return '刚刚';
    } else if ((time < 60 * 60) && (time >= 60 * 1)) {
      //超过十分钟少于1小时
      s = Math.floor(time / 60);
      return s +"分钟前" ;
    } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
      //判断是否为昨天
      //下个月
      if (_data.getMonth() < (new Date().getMonth())) {
        return "昨天 "
      } else if (_data.getDate() < (new Date().getDate())) {
        return "昨天 "
      }
      //超过1小时少于24小时
      s = Math.floor(time / 60 / 60);
      return  s + "小时前";
    } else if ((time < 60 * 60 * 24 * 2) && (time >= 60 * 60 * 24)) {
      //昨天
      return "昨天 "
    } else {
      return false;
    }
  }
  /**
   var time1 = new Date().Format("yyyy-MM-dd");
   var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");
   */
  export function dateFormat(fmt, timestamp) {

    //if (util.dateStr(timestamp)) { return util.dateStr(timestamp) }

    var _data = new Date(parseInt(timestamp));
    var o = {
      "M+": _data.getMonth() + 1, //月份
      "d+": _data.getDate(), //日
      "h+": _data.getHours(), //小时
      "m+": _data.getMinutes(), //分
      "s+": _data.getSeconds(), //秒
      "q+": Math.floor((_data.getMonth() + 3) / 3), //季度
      "S": _data.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (_data.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;


  }
  export function DownURL(url){
      try{
        var elemIF = document.createElement("iframe");
        elemIF.src = url;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
      }catch(e){
        console.log('下载失败')
      }
  }
  /**
   * 对象转换成url键值对
   */
  export function objTurnToKeyValue(url, data) {
    if(typeof(url) == 'undefined' || url == null || url == '') {
      return '';
    }
    if(typeof(data) == 'undefined' || data == null || typeof(data) != 'object') {
      return '';
    }
    url = (url.indexOf("?") != -1) ? "" : "?";
    for(var k in data) {
      url = ((url.indexOf("=") != -1) ? "?" : "") + k + "=" + encodeURI(data[k]);
      console.log(url);
    }
    return url;
  }


  //去左右空格;
  export function trim(s){
    if( typeof s === "string" ){
      return s.replace(/(^\s*)|(\s*$)/g, "");
    }else{
      return  s ;
    }
  }


  export function checkUrl(str) {
    var RegUrl = new RegExp();
    RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");//jihua.cnblogs.com
    if (!RegUrl.test(str)) {
      return false;
    }
    return true;
  }


export function isEmojiCharacter(substring) {

  for ( var i = 0; i < substring.length; i++) {
      var hs = substring.charCodeAt(i);
      if (0xd800 <= hs && hs <= 0xdbff) {
          if (substring.length > 1) {
              var ls = substring.charCodeAt(i + 1);
              var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
              if (0x1d000 <= uc && uc <= 0x1f77f) {
                  return true;
              }
          }
      } else if (substring.length > 1) {
          var ls = substring.charCodeAt(i + 1);
          if (ls == 0x20e3) {
              return true;
          }
      } else {
          if (0x2100 <= hs && hs <= 0x27ff) {
              return true;
          } else if (0x2B05 <= hs && hs <= 0x2b07) {
              return true;
          } else if (0x2934 <= hs && hs <= 0x2935) {
              return true;
          } else if (0x3297 <= hs && hs <= 0x3299) {
              return true;
          } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                  || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                  || hs == 0x2b50) {
              return true;
          }
      }
  }
}
