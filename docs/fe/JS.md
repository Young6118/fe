# JavaScript

1.数据类型

## 对象

JavaScript中一切引用类型都是对象，对象就是属性的集合。

Array类型、Function类型、Object类型、Date类型、RegExp类型等都是引用类型。

## 原型链

对象及其原型组成的链就叫做原型链

1. 原型存在的意义就是组成原型链：引用类型皆对象，每个对象都有原型，原型也是对象，也有它自己的原型，一层一层，组成原型链。
2. 原型链存在的意义就是继承：访问对象属性时，在对象本身找不到，就在原型链上一层一层找。说白了就是一个对象可以访问其他对象的属性。
3. 继承存在的意义就是属性共享：好处有二：一是代码重用，字面意思；二是可扩展，不同对象可能继承相同的属性，也可以定义只属于自己的属性。

创建方式主要有两种，一种是`new`操作符后跟函数调用，另一种是字面量表示法

## 如何判断数据类型

``` JavaScript
let checkArray = function (val) {
    if (typeof Array.isArray === 'function') {
    return Array.isArray(val)
    }
    return ({}).toString.call(val) === '[object Array]'
    // return Object.prototype.toString.call(val) === '[object Array]'
}
```

## 检测所有数据类型的通用方法

``` JavaScript
let checkType = function (obj) {
    if (obj == null) {
    return null + ''
    }
    return typeof obj === 'object' || typeof obj === 'function' ? ({}).toString.call(obj) || 'object' : typeof obj
}
```

函数与表达式

## 箭头函数

基本用法
`=>`
举例
`var f = v => v`

``` JavaScript
// 等同于
var f = function (v) {
    return v
}
```

// 无参数箭头函数
```var f = () => 5```

// 多参数箭头函数
var f = (v1, v2) => { 
    return v1 + v2
}
// 或
var f = (v1, v2) => v1 + v2

// 返回对象
var f = (v) => ({ v })

// 解构
var f = ({ v }) => v

箭头函数能简化回调写法
[].map/every/filter/forEach(v => v * 2)

## 箭头函数与普通函数区别

箭头函数

1. 函数体内this为定义时对象，非调用时的对象，从作用域上层继承this

2. 没有自己的this，不能使用new，不能使用call，apply，因为 new 的时候需要将构造函数的propertype赋值给新对象的__proto__

## new 实现

``` JavaScript
function newFunc (parent, ...rest) {
    var res = {}
    res.__proto__ = parent.prototype
    var res1 = parent.apply(res, rest)
    if (
        (typeof res1 === 'object' || typeof res1 !== null)
    ) {
        return res1
    }
    return res
}
```

3.无arguments对象，可用参数结构方式(rest参数)替代

4.不可用yield命令，不能用作Generator函数

5.没有 prototype 其指向undefined

## 函数柯里化

和bind/apply/call一样 提供了强大的动态函数创建的功能
curry 只接受fn函数参数，而其他接收object对象
使用闭包返回一个函数
``` javascript
function add (a, b) {
    return a + b
}

function curriedAdd (a) {
    return add(a, 5)
}

var 5Add = curriedAdd
5Add(2) // 7
```

## curry 函数
``` javascript
function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1))
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments)
        var finalArgs = args.concat(innerArgs)
        return fn.apply(null, finalArgs)
    }
}
```

// 使用示例 1
``` javascript
var curriedAdd = curry(add, 2, 5)
curriedAdd() // 7
```

// 使用示例 2
var curriedAdd = curry(add, 2)
curriedAdd(5) // 7



三、排序算法
## 冒泡排序

``` javascript
let unsort_array = [ 7, 8, 9, 4, 3, 2, 1, 5, 6 ]

// # 实现冒泡排序
// def bubble_sort(array)
//   # write your code here
//   return array
// end

// pp bubble_sort(unsort_array)
for (let i = 0; i < unsort_array.length - 1; i++) {
  for (let j = 0; j < unsort_array.length - i - 1; j++) {
    if (unsort_array[j] > unsort_array[j+1]) {
      let temp = unsort_array[j]
      unsort_array[j] = unsort_array[j+1]
      unsort_array[j+1] = temp
    } 
  }
}
console.log(unsort_array)
```


## 异步

### 发展流程

- 传统：callback 回调函数
- ES6：promise
- ES6：Generator 函数
- ES2017：async await

## Promise
Promise 是一种封装和组合未来值的易于复用机制，实现关注点分离、异步流程控制、异常冒泡、串行/并行控制等
``` javascript
const stateArr = ['pending', 'fulfilled', 'rejected']; // 三种状态
class MyPromise {
    constructor(callback) {
        this.state = stateArr[0]; // 当前状态
        this.value = null; // 完成时的返回值
        this.reason = null; // 失败原因
        this.resolveArr = [];
        this.rejectArr = [];
        
        callback(this.resolve, this.reject); // 调用此function
    }
    
    // callback中执行的resolve方法
    resolve = (value) => {
        // 判断状态是否需要是pending
            if (this.state === stateArr[0]) {
                this.state = stateArr[1]; // 更新状态为 fulfilled
                this.value = value; // 写入最终的返回值
               
                this.resolveArr.forEach(fun => fun(value)) // 循环执行then已插入的resolve方法
            }
    }
    
    // callback中执行的reject方法
    reject = (reason) => {
        // 判断状态是否需要是pending
            if (this.state === stateArr[0]) {
               this.state = stateArr[1]; // 更新状态为 fulfilled
               this.reason = reason; // 写入最终的返回值
               
               this.rejectArr.forEach(fun => fun(reason)) // 循环执行then已插入的reject方法
            }
    }
    
    // then方法
    then = (onFulilled, onRejected) => {
        // 判断onFulilled 和 onRejected是否是一个函数，如果不是函数则忽略它
        onFulilled = typeof onFulilled === 'function' ? onFulilled : (value) => value;
        onRejected = typeof onRejected === 'function' ? onRejected : (reason) => reason;

        // 如果状态为pending
        if (this.state === stateArr[0]) {
            return new MyPromise((resolve, reject) => {
                // 插入成功时调用的函数
                this.resolveArr.push((value) => {
                    try {
                        const result = onFulilled(value);
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject);
                        } else {
                            resolve(result);
                        }
                    } catch(err) {
                        reject(err);
                    }
                })
                
                // 插入失败时调用的函数
                this.rejectArr.push((value) => {
                    try {
                        const result = onRejected(value);
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject);
                        } else {
                            resolve(result);
                        }
                    } catch(err) {
                        reject(err)
                    }
                })
            })
            
        }
        
        // 如果状态是fulfilled
        if (this.state === stateArr[1]) {
            // then返回的必须是一个promise
            return new MyPromise((resolve, reject) => {
                try {
                    const result = onFulilled(this.value); // 执行传入的onFulilled方法
                    
                    // 如果onFulilled返回的是一个Promise,则调用then方法
                    if (result instanceof MyPromise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch(err) {
                    reject(err);
                }
            })
        }
        
        // 如果状态是rejected
        if (this.state === stateArr[2]) {
            // then返回的必须是一个promise
            return new MyPromise((resolve, reject) => {
                try {
                    const result = onRejected(this.reason); // 执行传入的onRejected方法
                    
                    // 如果onRejected返回的是一个Promise,则调用then方法
                    if (result instanceof MyPromise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch(err) {
                    reject(err);
                }
            })
        }
    }

    // 调用then中的reject
    catch = (reject) => {
        this.then(null, reject);
    }
}

MyPromise.resolve = (value) => {
    return new MyPromise((resolve, reject) => { resolve(value) });
}

MyPromise.resolve = (reason) => {
    return new MyPromise((resolve, reject) => { reject(reason) });
}
```

``` javascript

```
