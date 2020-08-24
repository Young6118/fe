# Vue

## 生命周期

初始化、模板编译、挂载、卸载

![生命周期图示](https://cn.vuejs.org/images/lifecycle.png)

## 响应式原理-追踪变化

### 侦测变化+收集依赖方

```javascript
function defineReactive (data, key, val) {
    // 收集依赖
    let dep = []
    // ES5 defineProperty 侦测对象变化
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        // getter 中收集依赖
        get: function () {
            dep.push(window.target)
            return val
        },
        // setter 中触发依赖
        set: function (newVal) {
            if (val === newVal) {
                return
            }
            for (let i = 0; i < dep.length; i++) {
                dep[i](newVal, val)
            }
            console.log(val, newVal)
            val = newVal
        }
    })
}
```

### 面向对象写法

``` javascript
class Dep {
  // 根据 ts 类型提示，我们可以得出 Dep.target 是一个 Watcher 类型。
  static target: ?Watcher;
  // subs 存放搜集到的 Watcher 对象集合
  subs: Array<Watcher>;
  constructor() {
    this.subs = [];
  }
  addSub(sub: Watcher) {
    // 搜集所有使用到这个 data 的 Watcher 对象。
    this.subs.push(sub);
  }
  depend() {
    if (Dep.target) {
      // 搜集依赖，最终会调用上面的 addSub 方法
      Dep.target.addDep(this);
    }
  }
  notify() {
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      // 调用对应的 Watcher，更新视图
      subs[i].update();
    }
  }
}
```

## 为列表渲染设置属性 `key`

`key` 用于`Vue.js`的虚拟DOM算法中，是给每一个vnode的唯一id,可以依靠key,更准确, 更快的拿到oldVnode中对应的vnode节点。

带key的时候，会基于相同的key来进行排列。进入`patch`流程，并找出可复用的部分节点，删除变更节点，重新创建新节点并插入，产生更多开销；

带key还能触发过渡效果，以及触发组件的生命周期。

1. 更准确
因为带key就不是就地复用了，在sameNode函数 a.key === b.key对比中可以避免就地复用的情况。所以会更加准确。

2. 更快
利用key的唯一性生成map对象来获取对应节点，map会比遍历更快。

### 不带`key`

不带`key`会最大限度减少元素的变动，尽可能用相同元素。（就地复用）

省去`DOM`销毁和创建开销，只用修改`DOM`内容，这就是默认行为，只适用于渲染无状态组件。

有状态组件无`key`，[patch.js](https://github.com/vuejs/vue/blob/dev/src/core/vdom/patch.js#L424)中可以看出，会由于前后节点`key`都是`undefined`，循环标识一直自增，直到遍历到最后一个节点，最终操作最后一个节点。



遍历生成多个子组件，这些子组件有内部状态，当进行操作时，原地复用导致变更了错误的组件。

index作为key同样会导致原地复用，错误变更组件。

有状态无`key`问题在线演示：
[https://codepen.io/youngchou1997-the-sans/pen/ZEWBdOm](https://codepen.io/youngchou1997-the-sans/pen/ZEWBdOm)

## 数据双向绑定

## vue 插件

vue.use ? install

## 组件间通信

* `Props`传递数据 （常用）

> 只能父组件向子组件传递数据

父组件内：

``` vue
<template>
    <Son :value="value"/>
</template>

<script>
export default {
    data () {
        return {
            value: 2
        }
    }
}
</script>
```


子组件内写法：

``` vue
<template>
    <div>
        {{ value }}
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            default: 1
        }
    }
}
</script>
```

* `$emit` （组件封装用的较多）

> 子组件向父组件传递数据通过触发事件完成

父组件内：

``` vue
<template>
    <Son @change="handleClick"/>
</template>

<script>
export default {
    methods: {
        handleClick (val) {
            console.log(val)
        }
    }
}
</script>
```


子组件内写法：

``` vue
<template>
    <div>
        <button @click="emitChange">点点点</button>
    </div>
</template>

<script>
export default {
    methods: {
        emitChange () {
            this.$emit('change', 666)
        }
    }
}
</script>
```

* attrs & listeners

* Provide & Inject

* Ref使用
* EventBus
* Vuex通信

<iframe src="https://codesandbox.io/embed/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-markdown-editor?codemirror=1&hidedevtools=1&hidenavigation=1&theme=light" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" title="vue-20-template-compilation" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>