---
## vue2+webpack 单页应用框架 ， 【可使用多模块，多页】
  update: 2017-08-30 | author: 周吉求 - 陈少博

## 主要功能
  0、单页多页应用可根据业务场景需求自由选择
  1、多页面多入口，目录结构按模块划分，适合团队协助开发，提高效率
  2、全局统一的公共模块库`common.js`
  3、支持字体图标,推荐`iconfont`
  4、webpack提取自定义的公共模块
  5、构建时，支持对css打包成文件；支持`less`、`sass`css预处理
  6、单页路由js异步`require.ensure`加载；
  7、发送ajax请求，采用`axios`库代替`vue-resource`，axios融合了promise，功能更强大
  8、屏幕适配采用`flexible`
  9、本地开发支持热更新
  10、demo实例模拟cnode中文社区，分别从单页和多页实现了列表页、详情页的功能
  11、demo实例实现了后退保留滚动条位置的功能
  12、UI库采用自己开发的另外一个vue组件库项目[toon-ui](https://github.com/zhoujiqiu/toon-ui)
  13、底部无限加载数据是基于`toon-ui`组件库的`InfiniteLoading`

### 使用方法
``` bash
# 安装
npm install

# 调试环境 serve with hot reload at http://localhost:8089/
npm run dev

# 生产环境 build for production with minification
npm run build

```

### 目录结构
``` bash
xwtoon-mpa
    |---build webpack配置文件
    |---dist 生产环境打包
    |---src  开发目录
        |---assets 静态资源
            |---common.css  公共css
            |---common.js  公共js
            |---font/  字体图标
            |---img/   公共图片
        |---components 组件库
              |---toast.vue  消息组件
              |---dialog.vue 弹框组件
        |---module 所有业务模块
              |---multi 多页应用模块
                  |--- list 列表页
                        |--- app.vue
                        |--- index.html
                        |--- commodity.js
                  |--- detail 详情页
                        |--- app.vue
                        |--- index.html
                        |--- commodity.js
              |---single 单页应用模块
                  |--- home
                        |--- app.vue
                        |--- index.html
                        |--- commodity.js
                        |--- routers.js
                        |--- detail.vue
                        |--- list.vue


```

从目录结构上，各种组件、页面模块、公共资源等都按类新建了文件夹，方便我们储存文件。
我们所有的文件，最主要都是放在`module`文件夹里；
在`module`里下级文件夹，一个文件夹就是一个html，`js``vue template` 都统一放在当前文件夹里，当然你也可以继续放其他的资源，例如css、图片等，webpack会打包到当前页面里。
如果项目不需要这个页面了，可以直接把这个文件夹直接删除掉，干净项目。

`注意：`请保持module下的各模块的目录结构一致；



### webpack主要配置说明
1、在webpack中配置项目公用的JS文件，并提取打包到指定目录；
由于是多页应用，必然会有多个入口，本架构会将`module`下的所有js文件作为入口文件；所以公共文件的提取需要在入口文件处单独处理，配置如下：
``` bash
# 入口文件
var entries = getEntry('./src/module/**/**/*.js');

# 指定公共JS资源，并打包到指定的目录
entries['static/common/vendors'] = ['vue','axios','n-zepto','./src/assets/common.js'];

```

2、配置js(html)输出路径
如下文件输出路径请根据项目结构需要做相应修改。
``` bash
# 输出路径
glob.sync(globPath).forEach(function (entry) {
  basename = path.basename(entry, path.extname(entry));
  //过滤非入口文件的JS：routers.js和vuex/*.js
  if(basename.indexOf('routers') !== -1 || entry.indexOf('vuex/') !== -1) return;
  // 原路径：entry = ‘src/module/multi/list/commodity.js’
  tmp = entry.split('/').splice(-3);
  // 分解后：tmp = [multi,list,commodity.js]
  pathname =  tmp.slice(0, 2).join('/') + '/' + basename;
  // 正确输出js和html的路径: pathname = 'multi/list/index'
  entries[pathname] = entry;
});
```

3、配置静态资源输出
将静态资源输出到static文件夹
``` bash
# css
{
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
},
# 图片
{
  test: /\.(png|jpe?g|gif)(\?.*)?$/,
  loader: 'url',
  query: {
    limit: 8192,
    name: 'static/images/[name].[hash:7].[ext]'
  }
},
# 图标字体
{
  test: /\.((ttf|eot|woff|svg)(\?t=[0-9]\.[0-9]\.[0-9]))|(ttf|eot|woff|svg)\??.*$/,
  loader: 'url-loader?name=static/font/[name].[ext]'
}
```


### 集成单页（spa）应用架构
由于该mpa架构页面跳转会刷新页面，导致在某些业务场景下，数据传递和vue组件之间的通信会很不方便，所以在框架中集成了单页面应用架构；
``` bash
# 单页面应用结构
  |--- home  某个应用模块
      |--- index.html  入口html
      |--- commodity.js    入口js,import vue-router
      |--- app.vue     router-view 路由容器
      |--- routers.js  路由配置，通过resolve参数实现异步加载；每个路由会生成自己业务的js
      |--- detail.vue     路由1:详情模块
      |--- list.vue    路由2:列表模块

```
``` bash
# 单页面路由打包，将不是入口文件的vue-router单独打包；统一放在static/chunks目录
output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: 'static/chunks/[name].js?[chunkhash]'
}
```
