var path = require('path')
var project = {
  projectName: 'app',
  staticPath:"static",   //静态资源目录
  targetPath:"../app/livelihood-goods"  //目标文件夹
  //targetPath:"./dist"  //目标文件夹
}

var config = {
  build: {
    staticPath:project.staticPath,
    projectName:project.projectName,
    index: path.resolve(__dirname, project.targetPath+'/index.html'),
    assetsRoot: path.resolve(__dirname, project.targetPath ),
    assetsSubDirectory: '/',
    assetsPublicPath: '../', //生产环境下输出路径
    productionSourceMap: true
  },
  dev: {
    port: 8089,
    assetsPublicPath: '/', //开发环境下输出路径
    proxyTable: {}
  }
}
module.exports =  config ;
