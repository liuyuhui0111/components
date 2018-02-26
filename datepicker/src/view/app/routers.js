/**
 *  路由输出
 */
export default [
  // 路由跳转
  {
    name: 'index',
    path: '/',
    component: resolve => {require.ensure(['./router/index.vue'], () => {resolve(require('./router/index.vue'))})}
  },
  // 商品类目列表
  {
    name: 'typeList',
    path: '/typeList',
    component: resolve => {require.ensure(['./shopTypeList/shopTypeList.vue'], () => {resolve(require('./shopTypeList/shopTypeList.vue'))})}
  },
  // 商品列表
  {
    name: 'shopList',
    path: '/shopList',
    component: resolve => {require.ensure(['./shopList/shopList.vue'], () => {resolve(require('./shopList/shopList.vue'))})}
  },
  // 商品详情
  {
    name: 'detail',
    path: '/detail',
    component: resolve => {require.ensure(['./detail/detail.vue'], () => {resolve(require('./detail/detail.vue'))})}
  }
  
]
