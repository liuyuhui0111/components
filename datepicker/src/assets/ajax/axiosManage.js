import axios from 'axios'

/**  axios 标准处理，如果项目需要特殊处理，可以在接口位置单独处理 */
let axiosInstance = axios.create();

    /** 静态请求数据*/
    axiosInstance.defaults.timeout = 30000;
    axiosInstance.defaults.headers.post['Content-Type'] =   'application/json;charset=utf-8';
    axiosInstance.defaults.headers.get['Content-Type'] =  'application/json;charset=utf-8';

    /** 请求数据拦截器*/
    axiosInstance.requestData = function (config) {
       return config;
    };
    /** 返回数据拦截器*/
    axiosInstance.responseData = function (response) {
      return response;
    };
    /** 请求异常处理*/
    axiosInstance.error = function (error) {
      return error;
    };

    /** 请求拦截器*/
    axiosInstance.interceptors.request.use(function (config) {
      if($util&&$util.loading && config.loading !== false ){$util.loading.open();}
      config = requestDataByConfig(config);
      return config;
    });

    /** 请求返回拦截器*/
    axiosInstance.interceptors.response.use(function (response) {

      if($util&&$util.loading){$util.loading.close();}

      response = axiosInstance.responseData(response);
      return response.data;
    }, function (error) {

      if($util&&$util.loading){$util.loading.close();}

      error = axiosInstance.error(error);
      return Promise.reject(error.message);
    });

    /** 请求数据前，先进行一层封装 判断 ;*/
    function requestDataByConfig(config){
       /** 如果是开发模式，则调用本地json文件*/
      if(window.CONFIG.DEV){
        console.log(config.data)
        config.url += ".json";
        config.data = {} ;
        config.method = "get" ;
      }
      return  axiosInstance.requestData(config)
    }

export default axiosInstance;

