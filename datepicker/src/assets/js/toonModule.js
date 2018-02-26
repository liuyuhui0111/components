import  $ from "n-zepto"
/*
 * @param {Object} target 目标对象。
 * @param {Object} source 源对象。
 * @param {boolean} deep 是否复制(继承)对象中的对象。
 * @returns {Object} 返回继承了source对象属性的新对象。
 */
Object.extend = function(target,source, deep) {
  target = target || {};
  var sType = typeof source, i = 1, options;
  if( sType === 'undefined' || sType === 'boolean' ) {
    deep = sType === 'boolean' ? source : false;
    source = target;
    target = this;
  }
  if( typeof source !== 'object' && Object.prototype.toString.call(source) !== '[object Function]' )
    source = {};
  while(i <= 2) {
    options = i === 1 ? target : source;
    if( options != null ) {
      for( var name in options ) {
        var src = target[name], copy = options[name];
        if(target === copy)
          continue;
        if(deep && copy && typeof copy === 'object' && !copy.nodeType)
          target[name] = this.extend(src ||
            (copy.length != null ? [] : {}), copy, deep);
        else if(copy !== undefined)
          target[name] = copy;
      }
    }
    i++;
  }
  return target;
};
export function axse(data, successfn, errorfn) {
  data = (data == null || data == "" || typeof(data) == "undefined") ? {"date": new Date().getTime()} : data;
  var _port  = (location.href.indexOf("https://") > -1 ) ? 6781 : 6780 ;
  $.ajax({
    type: "post",
    data: data,
    url: "//127.0.0.1:"+_port+"/getResult",
    dataType: "json",
    beforeSend:function(){
    },
    success: function (reg) {
      return  successfn && successfn(reg);
    },
    error: function (e) {
      return  errorfn &&  errorfn(e);
    }
  });
}
/**
 * 调用动态下的富文本编辑器
 text String(Json对象)  文本功能（当为null时文本功能不可用）
image String(Json对象)  图片功能（当为null时图片添加功能不可用）
map String(Json对象)  地图功能（当为null时地图功能不可用）
voice String(Json对象)  音频功能（当为null时音频功能不可用）
video String(Json对象)  视频功能（当为null时视频功能不可用）----- 正在开发中
title String(Json对象)  标题（当为null时不添加标题）
locationEnable  boolean 地理位置功能（默认为false）
spreadEnable  boolean 传播范围功能（默认为false）
repeiptEnable boolean 回执功能（默认为false）
cloud String(Json对象)  内容的存储位置
 *入参：{
"text":{"count_min":0,"count_max":20},
"image":{"count_min":0,"count_max":20},
"map":{"count_min":0,"count_max":20},
"title":{"char_min":0,"char_max":20},
"locationEnable":false,
"spreadEnable":false,
"repeiptEnable":false,
"cloud":{"type":2,"url":"","token":""}
}

调用示例：toon://trends/editor?params={"text":{"count_min":0,"count_max":20},"image":{"count_min":0,"count_max":20},"map":{"count_min":0,"count_max":20},"title":{"char_min":0,"char_max":20},"locationEnable":false,"spreadEnable":false,"repeiptEnable":false,"cloud":{"type":1,"url":"http://www.cloud.com","token":"4554aqecg9"}}
出参示例：

e.data = {"result":{"cloudType":2,"detailContent":[{"text":"几乎不不能","type":0},{"imageHeight":464,"imageUrl":"http://fast.scloud.systoon.com/f/Nzxyn5o0PjAjRl3H8cInFE2HwBEULfSAeVuiWzLXeOcfF.jpg","imageWidth":720,"type":1},{"imageHeight":3264,"imageUrl":"http://fast.scloud.systoon.com/f/JIxz8sP5m1joXopDm4Q7dVpJW0HEgPYBowqn5VFle+wfF.jpg","imageWidth":2448,"type":1},{"imageHeight":1088,"imageUrl":"http://fast.scloud.systoon.com/f/Z0XKMYsp9NpNB1V2WQEB8hGBd6qbtiZF65pzPNX3FCMfF.jpg","imageWidth":816,"type":1},{"localUrl":"/storage/emulated/0/toon/voice/1487666133264.amr","duration":4,"resUrl":"http://rssqiniu.systoon.com/HUAWEIP6-C00_1487666137427_261878_1630.mp3","text":"音频","type":4}],"feedId":"c_1471338782784416","feedIdList":[],"permissionType":1,"readReceiptStatus":1}“}


 */

export function chooseRichText(callback, errorHandler,opt) {
  let flagTimeRandom = new Date().getTime()+"";
  var params = {
      "text":{"count_min":0,"count_max":20},
      "image":{"count_min":0,"count_max":8},
      "title":{"char_min":0,"char_max":20},
      "locationEnable":false,
      "spreadEnable":false,
      "repeiptEnable":false,
      "video":{"source":0,"time":10,"count":3},
      "cloud":{"type":2}
    }
  // if(opt){
  //   params = opt
  // }
  window.location.href = "toon://trends/editor?params="+JSON.stringify(params);
  axse('params={"flagId":' + (flagTimeRandom) + '}',function(e){
    if(callback){callback(e)}
  },function(e){
    console.log(e)
    if(errorHandler){errorHandler(e)}
  } );
}

/**
 * 打开在线客服页面
 */
export function openOnlineService(callback, errorHandler,opt) {
  let flagTimeRandom = new Date().getTime()+"";
  var params = {
      "accessId":"785550d0-7747-11e7-9354-4fad5f9e96ea"
    }
  window.location.href = "toon://customerservices/open?params="+JSON.stringify(params);
  window.$$Message("toon://customerservices/open?params="+JSON.stringify(params))
  axse('params={"flagId":' + (flagTimeRandom) + '}',function(e){
    if(callback){callback(e)}
  },function(e){
    console.log(e)
    if(errorHandler){errorHandler(e)}
  } );
}

/**
 * 震动
 */
export function verbFn(callback, errorHandler,opt) {
  let flagTimeRandom = new Date().getTime()+"";
  var params = {
      flagId:flagTimeRandom
    }
  window.location.href = "toon://mwap/vibrate?params="+JSON.stringify(params);

  axse('params={"flagId":' + (flagTimeRandom) + '}',function(e){
    if(callback){callback(e)}
  },function(e){
    console.log(e)
    if(errorHandler){errorHandler(e)}
  } );
}
/**
 * 获取名片
 */
export function chooseCard(callback, errorHandler) {
  let flagTimeRandom = new Date().getTime()+"";
  let params = {
    "flagId":flagTimeRandom,
    "type":"0"
  };
  window.location.href = "toon://card/chooseCard?params="+JSON.stringify(params);
  axse('params={"flagId":' + (flagTimeRandom) + '}',function(msg){
    if(callback){callback(msg)}
  },function(){
    if(errorHandler){errorHandler()}
  } );
}
/**
 * 获取GPS
 */
export function gps(callback, errorHandler) {
  let flagTimeRandom = new Date().getTime()+"";
  let params = {
    "flagId":flagTimeRandom,
    "type":"0"
  };
  window.location.href = "toon://mwap/gps?params="+JSON.stringify(params);
  axse('params={"flagId":' + (flagTimeRandom) + '}',function(msg){
    if(callback){callback(msg)}
  },function(){
    if(errorHandler){errorHandler()}
  } );
}
/**
 * 获取GPS
 */
export function map(option ,callback , errorHandler ) {
  if (typeof option == "undefined") {
    option = {};
  }
  let defaultOpt={
    zb:[]
  }
  let newOption=Object.extend(defaultOpt, option);

  let flagTimeRandom = new Date().getTime()+"";
  let params = {
    "flagId":flagTimeRandom,
    "type":"0"
  };
  if(newOption.zb&&newOption.zb[0]){params.latitude = newOption.zb[0]}
  if(newOption.zb&&newOption.zb[1]){params.longitude = newOption.zb[1] }
  window.location.href = "toon://mwap/map?params="+JSON.stringify(params);
  axse('params={"flagId":' + (flagTimeRandom) + '}',function(msg){
    if(callback){callback(msg)}
  },function(){
    if(errorHandler){errorHandler()}
  } );
}
/**
 * 获取网络状态
 */
export function network(callback , errorHandler ) {
  let flagTimeRandom = new Date().getTime()+"";
  let params = {
    "flagId":flagTimeRandom
  };
  window.location.href = "toon://mwap/network?params="+JSON.stringify(params);
  axse('params={"flagId":' + (flagTimeRandom) + '}',function(msg){
    if(callback){callback(msg)}
  },function(){
    if(errorHandler){errorHandler()}
  } );
}
/**
 * 打开相机
 */
export function openCamera(callback,errorHandler,option,size){
  //如果不在toon内
  if( !/toon/.test( navigator.userAgent.toLowerCase() ) ){
    var fileByInput = document.getElementById("fileByInput") || false ;
    if( ! fileByInput ){
      fileByInput = document.createElement('input');
      fileByInput.id="fileByInput";
      fileByInput.type="file";
      fileByInput.style="display:none; ";
      fileByInput.accept=".png,.jpg,.jpeg,.gif";
      document.body.appendChild(fileByInput);
    }
    var changefn = function(){
      var file = this.files[0];
      //判断类型是不是图片
      if(!/image\/\w+/.test(file.type)){
        alert("请确保文件为图像类型");
        return false;
      }
      //判断图片大小
      if((this.files[0].size / 1024).toFixed(0)>size){
        alert("请上传"+size+"KB以下大小的图片");
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e){
        if(callback){
          var res = {data:{"base64" : this.result.substr( this.result.indexOf(";base64,")+8 )}}
          callback( res.data  );
        }
        if(fileByInput.parentNode){ fileByInput.parentNode.removeChild(fileByInput);}
      }
    };
    var clickfn = function(){
      this.value = "" ;
    };
    if (fileByInput.eventList === undefined) {
      fileByInput.eventList = {};
    }
    var hasClick=false;
    var hasChange=false;
    for (var key in fileByInput.eventList)
    {
      if (key === 'click') {
        hasClick=true;
      }
      if (key === 'change') {
        hasChange=true;
      }
    }
    if(!hasClick){
      fileByInput.addEventListener("click" , clickfn ,false);
      fileByInput.eventList['click'] = true;
    }
    if(!hasChange){
      fileByInput.addEventListener("change" , changefn ,false);
      fileByInput.eventList['change'] = true;
    }

    fileByInput.click();

    return  false ;
  }
  //如果在toon内
  if (typeof option == "undefined") {
    option = {};
  }
  let flagTimeRandom = new Date().getTime()+"" ;
  let defaultOpt={
    //x:100,
    //y:100,
    "flagId":flagTimeRandom,
    functionType:2,
    "nameSpace": "demo.systoon.com",
    "type":1,
    "ratio":.3,
    "maxCount":1 ,
    "filterMimeType":"image/png,image/jpeg"
  }
  let newOption=Object.extend(defaultOpt, option);
  //if(_x && _y ){
  //  params.aspectX = x ;
  //  params.aspectY =y ;
  //  params.xLength = x ;
  //  params.yLength = y ;
  //}
  window.location.href = "toon://mwap/photo?params=" + JSON.stringify(newOption);
  axse('params={"flagId":' + (flagTimeRandom) + '}',function(msg){
    if(callback && msg.data){
      if(msg.data.base64){
        callback(msg.data)
      }else {
        callback( msg.data.imageArr )
      }
    }
  });
}
export function closeWindow(){
  var params={
    "functionType":1
  };
  window.location.href = "toon://mwap/window?params="+ JSON.stringify(params);
}

/**
 * 自动裁剪，压缩图片，加水印
 * @param src
 * @param complete
 * @param options
 * @param mark
 */
export function imageOperation(options, complete , error  ){
  console.log( options.width  )
  var canvas=document.createElement( "canvas" )
  var ctx= canvas.getContext('2d')
  var imgType = ["jpeg","png"]
  //默认配置
  var defaults = {
    //图片url
    src:null ,
    type:0, //0:jpeg,1:png
    width: null,
    height: null,
    //水印
    mark:{
      src:null,
      x:null,
      y:null,
      w:null,
      h:null
    }
  };
  //覆盖默认参数
  // this.options = options || {}
  for (var opt  in options) {
    defaults[opt] = options[opt]
  }
  if(!defaults.src){
    return  ;
  }
  loadimage(defaults.src, function (img) {
    var toWidth = defaults.width ? defaults.width : defaults.height ?   defaults.height / img.height * img.width : img.width
    var toHeight = defaults.height  ? defaults.height : defaults.width ?   defaults.width / img.width * img.height : img.height
    var size = getSize({
      Wt: toWidth,
      Ht: toHeight,
      W: img.width,
      H: img.height,
    })
    canvas.width = toWidth
    canvas.height = toHeight
    //如果是jpeg ,  则填充背景色
    if(defaults.type == 0 ){
      ctx.fillStyle="#fff"
      ctx.fillRect(0,0,toWidth,toHeight )
    }
    ctx.drawImage(img, size.x , size.y, size.w  ,size.h  , 0 , 0 , toWidth , toHeight )
    //如果有水印
    if (defaults.mark && defaults.mark.src  && defaults.mark.x   && defaults.mark.y   && defaults.mark.w   && defaults.mark.h    ) {
      loadimage(defaults.mark.src, function (img) {
        ctx.drawImage(img, defaults.mark.x  , defaults.mark.y , defaults.mark.w, defaults.mark.h)
      })
    }
    setTimeout(function () {
      if(complete){
        let image = canvas.toDataURL("image/"+imgType[defaults.type]).replace("image/"+imgType[defaults.type],"image/octet-stream")
        //如果没有水印，并且无裁剪，则根据大小返回原图或剪裁后的图
        if(  ( !defaults.mark ||  !defaults.mark.src  ) && ( !defaults.width || !defaults.height ) &&  defaults.src.length  >10000 &&  image.length > defaults.src.length   ){
          complete( defaults.src.replace("image/png|image/jpg","image/octet-stream") )
        }else{
          complete(canvas.toDataURL("image/"+imgType[defaults.type]).replace("image/"+imgType[defaults.type],"image/octet-stream"))
        }
      }
    })
  })
  //加载图片
  function loadimage(src, load) {
    //加载图片
    var img = new Image()
    img.src = src
    img.onload = function () {
      load(img)
    }
  }
  /**
   * 获取裁剪尺寸
   * @param obj  obj.toW:裁剪宽  obj.toH:裁剪高  obj.W:图片宽  obj.H:图片高
   * @returns {{x: x轴位移, y: y轴位移, w: 裁剪后宽, h: 裁剪后高}}
   */
  function getSize(obj) {
    //缩放系数
    var ratio = 1;
    var newObj = {};
    if (obj.Wt / obj.Ht > obj.W / obj.H) {
      ratio = obj.W / obj.Wt;
      obj.Wt = obj.Wt * ratio;
      obj.Ht = obj.Ht * ratio;
      newObj.w = obj.W;
      newObj.h = obj.W * obj.Ht / obj.Wt;
      newObj.x = 0;
      newObj.y = (obj.H - newObj.h) / 2
    } else {
      ratio = obj.H / obj.Ht;
      obj.Wt = obj.Wt * ratio;
      obj.Ht = obj.Ht * ratio;
      newObj.w = obj.H * obj.Wt / obj.Ht;
      newObj.h = obj.H;
      newObj.x = ( obj.W - newObj.w ) / 2;
      newObj.y = 0;
    }
    return newObj;
  }
}


