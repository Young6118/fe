# Vue

## 基本介绍

以前，我们通过命令语句操作DOM，即使有了jQuery，也是十分复杂。而 Vue 则是声明式，通过描述节点状态，实现与DOM之间的映射，从而实现JS渲染网页。

Vue也是一个渐进式框架，最核心的视图层可以单文件编写，支持组件编写，复杂项目可依次引入路由vue-router、集中状态管理vuex，以及使用构建工具。

Vue 的渲染流程主要是：模板编译，生成渲染函数，渲染函数生成vNode，最终渲染界面。

Vue 是一个MVVM框架，实现了数据双向绑定，即数据发生变化，视图也会跟着变化，而当视图发生变化，数据也会跟着变化。

Vuex中数据是单向流动的，我们在全局中使用，便于数据变化的追踪。

局部数据使用Vue的数据双向绑定，便于操作。

## 数据双向绑定

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>forvue</title>
</head>
<body>
    <div id="app">
        <input type="text" v-model="text">
        {{ text }}
    </div>
    <script>
        function compile(node, vm) {
            var reg = /\{\{(.*)\}\}/;

            // 节点类型为元素
            if (node.nodeType === 1) {
                var attr = node.attributes;
                // 解析属性
                for (var i = 0; i < attr.length; i++) {
                    if (attr[i].nodeName == 'v-model') {
                        var name = attr[i].nodeValue; // 获取v-model绑定的属性名
                        node.addEventListener('input', function (e) {
                            // 给相应的data属性赋值，进而触发属性的set方法
                            vm[name] = e.target.value;
                        })


                        node.value = vm[name]; // 将data的值赋值给该node
                        node.removeAttribute('v-model');
                    }
                }
            }

            // 节点类型为text
            if (node.nodeType === 3) {
                if (reg.test(node.nodeValue)) {
                    var name = RegExp.$1; // 获取匹配到的字符串
                    name = name.trim();
                    node.nodeValue = vm[name]; // 将data的值赋值给该node
                }
            }
        }

        function nodeToFragment(node, vm) {
            var flag = document.createDocumentFragment();
            var child;

            while (child = node.firstChild) {
                compile(child, vm);
                flag.appendChild(child); // 将子节点劫持到文档片段中
            }
            return flag;
        }

        function Vue(options) {
            this.data = options.data;
            var data = this.data;

            observe(data, this);

            var id = options.el;
            var dom = nodeToFragment(document.getElementById(id), this);
            // 编译完成后，将dom返回到app中。
            document.getElementById(id).appendChild(dom);
        }

        var vm  = new Vue({
            el: 'app',
            data: {
                text: 'hello world'
            }
        });



        function defineReactive(obj, key, val) {
            // 响应式的数据绑定
            Object.defineProperty(obj, key, {
                get: function () {
                    return val;
                },
                set: function (newVal) {
                    if (newVal === val) {
                        return;
                    } else {
                        val = newVal;
                        console.log(val); // 方便看效果
                    }
                }
            });
        }

        // 递归侦测所有 key
        function observe (obj, vm) {
            Object.keys(obj).forEach(function (key) {
                defineReactive(vm, key, obj[key]);
            });
        }


    </script>

</body>
</html>
```

通过ES5的Object.defineProperty()方法修改特性值，该方法接收三个参数：属性所在的对象、属性的名字和一个描述符对象。

以上示例的第三个参数是访问器属性，不包含数据值，而是包含一对get和set函数。读取访问器属性时，调用getter；写入访问器属性，调用setter并传入新值。

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
function remove (arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

export default class Dep {
    constructor () {
        this.subs = []
    }

    addSub (sub) {
        this.subs.push(sub)
    }

    removeSub (sub) {
        remove(this.subs, sub)
    }

    depend () {
        if (window.traget) {
            this.addSub(window.target)
        }
    }

    notify () {
        const subs = this.subs.slice()
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}
```

改造 defineReactive:

``` javascript
function defineReactive (data, key, val) {
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            dep.depend()
            return val
        },
        set: function () {
            if (val === newVal) {
                return
            }
            val = newVal
            dep.notify()
        }
    })
}
```

watcher实现

``` javascript
const bailRe = /[^\w.$]/

function parsePath (path) {
    if (bailRe.test(path)) {
        return
    }
    const segments = path.slit('.')
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return
            obj = obj[segments[i]]
        }
        return obj
    }
}

class Watcher {
    constructor (vm, expOrFn, cb) {
        this.vm = vm
        // 执行 this.getter() 就可以读取data.a.b.c的内容
        this.getter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.get()
    }

    get () {
        window.target = this
        let valjue = this.getter.call(this.vm, this.vm)
        window.target = undefined
        return value
    }

    update () {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
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
