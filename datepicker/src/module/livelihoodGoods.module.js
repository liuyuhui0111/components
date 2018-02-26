

import {getQueryString} from 'src/assets/js/util.js'

let API_HOST = CONFIG.DEV ?  CONFIG.API_DEV : CONFIG.API_HOST
//获取交流圈
$http.defaults.headers.sessionId = sessionStorage.getItem("sessionId") || "" 
export function getSessionIdByCode(params) {
  window.code = window.code  || getQueryString("code") || "";
  if(sessionStorage.getItem("sessionId")) return
  let url = '/open/getSessionId'
  return $http.post(API_HOST+url,  {
  "code": code
}).then(function (res) {
  	let sessionId = res.data.sessionId
  	sessionStorage.setItem("sessionId",sessionId)
  	$http.defaults.headers.sessionId = sessionId
    return Promise.resolve(res)
  }).catch(function (res) {
    return Promise.reject(res)
  })
}
function sessionStorageClear(response) {
    sessionStorage.removeItem("sessionId") ;
    $http.defaults.headers.sessionId =  undefined ;
}



export function getTypes(params) {
  let url = '/hood/getTypes'
  return $http.post(API_HOST+url, params).then(function (res) {
    return Promise.resolve(res)
  }).catch(function (res) {
    return Promise.reject(res)
  })
}
export function queryShopList(params) {
  let url = '/hood/getPrice'
  return $http.post(API_HOST+url, params).then(function (res) {
    return Promise.resolve(res)
  }).catch(function (res) {
    return Promise.reject(res)
  })
}

export function getPriceTrend(params) {
  let url = '/hood/getPriceTrend'
  return $http.post(API_HOST+url, params).then(function (res) {
    return Promise.resolve(res)
  }).catch(function (res) {
    return Promise.reject(res)
  })
}




