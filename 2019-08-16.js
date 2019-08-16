const debounce = function(fn, wait = 500, isImmediate, ctx = this) {
  let timeout
  return function(...params) {
      if(timeout) clearTimeout(timeout)
      if (isImmediate) {
        let callNow = !timeout
        if(callNow) {
          fn.apply(ctx, params)
        }
      } 
      timeout = setTimeout(() => {
        fn.apply(ctx, params)
      }, wait)   
  }
}

export default {
  name: 'Debounce',
  abstract: true,
  props: {
      // 时间
      time: {
          type: Number,
          default: 500
      }, 
      // 需要debounce的事件，用逗号隔开
      events: {
          type: String,
          default: 'click'
      }, 
      // 是否立即执行
      isImmediate: { 
          type: Boolean,
          default: true
      }
  },
  created() {
      this.eventKeys = this.events.split(',')
      this.originMap = {}
      this.debouncedMap = {}
  },
  render() {
      // 获取插槽的第一个组件，也就是需要防抖的组件
      const vnode = this.$slots.default[0]
      this.eventKeys.forEach((key) => {
          try {
              // 监听的事件
              // 需要注意的是如果同一个事件监听了两次那么target是一个数组
              // 比如<input v-model="name" @input="func">这里v-model监听了一次，@input监听了一次
              const target = vnode.data && vnode.data.on && vnode.data.on[key]
              if (target === this.originMap[key] && this.debouncedMap[key]) {
                  vnode.data.on[key] = this.debouncedMap[key]
              } else if (target) {
                  this.originMap[key] = target
                  this.debouncedMap[key] = debounce(target, this.time, this.isImmediate, vnode)
                  vnode.data.on[key] = this.debouncedMap[key]
              }
          } catch (err) {}
      })
      return vnode
  }
}