/**
 * Created by shaobochen on 17/10/24.
 */
import Vue from 'vue'
const LoadingConstructor = Vue.extend(require('./loading.vue'))
let removeDom = event => {
  event.target.parentNode.removeChild(event.target);

};
LoadingConstructor.prototype.close = function() {

  this.visible = false;
  this.$el.addEventListener('transitionend', removeDom);

};
const loading = (options = {}) => {
  var instance = new LoadingConstructor().$mount(document.createElement('div'))
  //let duration = options.duration || 2500;
  //instance.message = typeof options === 'string' ? options : options.message
  //instance.position = options.position || 'middle'
  if(!options.close){
    document.body.appendChild(instance.$el);
    instance.visible = true;
  }
  Vue.nextTick(() => {
    if(options.close){
      instance.close();
    }
    //instance.timer = setTimeout(function() {
    //  instance.close();
    //}, duration);
  })

  return instance
}
export default loading
