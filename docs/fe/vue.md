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
export default class Dep {
    constructor () {
        this.subs = []
    }

    addSub (sub) {

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


