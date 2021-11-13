import Toast from './Toast'
// 插件封装
var obj = {}
obj.install = function(Vue) {
  // console.log(1);
  // const toast = `<div>11111111111111</div>`;
  // Vue.prototype.$toast = toast.$el;
  // console.log(Toast.$el);
  // document.body.appendChild(toast)

  // 1 创建组件构造器
  const toastConstructor = Vue.extend(Toast);
  // 2 new的方式，根据组件构造器，创建出来一个组件对象
  const toast = new toastConstructor();
  // 3 将组件对象，手动挂载到某一个元素上
  // console.log(toast);
  toast.$mount(document.createElement('div'));
  // 4 toast.$el 对应的就是 div
  document.body.appendChild(toast.$el);
  // console.log(toast.$el);
  Vue.prototype.$toast = toast;
}

export default obj;