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

创建对象方式主要有两种，一种是`new`操作符后跟函数调用，另一种是字面量表示法

## 对象继承

## ajax

``` javascript
var xhr；
xhr = new XMLHttpRequest()； //创建一个异步对象
xhr.open("Get"， "/test"， true)；//Get 方式括号中的三个参数分别为：1.发送请求的方式 2. 样请求的页面 3.是否异步
//xhr.open("post"，"test.ashx"，true)；
//xhr.setRequestHeader("Content-Type"， "application/x-www-form-urlencoded")； Post
方式发送数据
//这个回调函数主要用来检测服务器是否把数据返回给异步对象
xhr.setRequestHeader("If-Modified-Since"，"0")；//设置浏览器不使用缓存
xhr.onreadystatechange = function () {
  if (xhr.readystate == 4) {
  //readyState 属 性 指 出 了 XMLHttpRequest 对 象 在 发 送 / 接 收 数 据 过 程 中 所 处 的 几 个 状 态 。
    // XMLHttpRequest 对象会经历 5 种不同的状态。
    //0：未初始化。对象已经创建，但还未初始化，即还没调用 open 方法；
    //1：已打开。对象已经创建并初始化，但还未调用 send 方法；
    //2：已发送。已经调用 send 方法，但该对象正在等待状态码和头的返回；
    //3：正在接收。已经接收了部分数据，但还不能使用该对象的属性和方法，因为状态和响应头不完整；
    //4：已加载。所有数据接收完毕
    if(xhr.status==200){ //检测服务器返回的响应报文的状态码是否为 200
      alert(xhr.responseText)；//服务器返回的 Response 数据
      //解析服务器返回的 json 格式的数据
      var s=xhr.responseText；
      console.log(s)
    }
  }；
}；
xhr.send({})；//异步对象发送请求
//xhr.send("txtName=roger&txtPwd=123")； 以 post 方式发送数据
```

ajax 中 get 和 post 方式请求数据都是明文的。

get发送数据是写在open()里的url后面，而post写在send()

### get post

第一，在HTTP协议中，GET是安全的，也是幂等的。POST既不是安全的，也不是幂等的。

这里的安全是不论对某资源调用多少次，状态是不会改变的。幂等是无论操作多少次，结果都一样。因此GET返回的内容可以被浏览器，Cache缓存起来。POST你可以理解下字面意思，追加，添加。每次对POST的使用，代码都会认为这个操作会修改对象的的状态，所以缓存服务器是不会对他进行缓存。

第二，会有人理解成GET会有长度限制，POST的数据传输量大

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

``` javascript
new Promise((resolve,reject)=>{
    console.log(1);
    setTimeout(()=>{
        console.log(2);
    });
    resolve();
}).then(()=>{
    console.log(3);
}).then(()=>{
    return new     Promise((resolve,reject)=>{
   console.log(4);
 }).then(()=>{
  console.log(5);
 });
}).then(()=>{
console.log(6);
});
console.log(7);
```

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

## EventLoop 事件循环

event loop是一个执行模型，在不同的地方有不同的实现。浏览器和NodeJS基于不同的技术实现了各自的Event Loop。

- 浏览器的Event Loop是在html5的规范中明确定义。
- NodeJS的Event Loop是基于libuv实现的。可以参考Node的官方文档以及libuv的官方文档。
- libuv已经对Event Loop做出了实现，而HTML5规范中只是定义了浏览器中Event Loop的模型，具体的实现留给了浏览器厂商。

## 宏队列和微队列

宏队列，macrotask，也叫tasks。 一些异步任务的回调会依次进入macro task queue，等待后续被调用，这些异步任务包括：

- setTimeout
- setInterval
- setImmediate (Node独有)
- requestAnimationFrame (浏览器独有)
- I/O
- UI rendering (浏览器独有)

微队列，microtask，也叫jobs。 另一些异步任务的回调会依次进入micro task queue，等待后续被调用，这些异步任务包括：

- process.nextTick (Node独有)
- Promise
- Object.observe
- MutationObserver
（注：这里只针对浏览器和NodeJS）

## 浏览器的Event Loop

我们先来看一张图，再看完这篇文章后，请返回来再仔细看一下这张图，相信你会有更深的理解。

browser-eventloop

这张图将浏览器的Event Loop完整的描述了出来，我来讲执行一个JavaScript代码的具体流程：

1. 执行全局Script同步代码，这些同步代码有一些是同步语句，有一些是异步语句（比如setTimeout等）；
2. 全局Script代码执行完毕后，调用栈Stack会清空；
3. 从微队列microtask queue中取出位于队首的回调任务，放入调用栈Stack中执行，执行完后microtask queue长度减1；
4. 继续取出位于队首的任务，放入调用栈Stack中执行，以此类推，直到直到把microtask queue中的所有任务都执行完毕。注意，如果在执行microtask的过程中，又产生了microtask，那么会加入到队列的末尾，也会在这个周期被调用执行；
5.`microtask queue`中的所有任务都执行完毕，此时microtask queue为空队列，调用栈Stack也为空；
6. 取出宏队列macrotask queue中位于队首的任务，放入Stack中执行；
7. 执行完毕后，调用栈Stack为空；
8. 重复第3-7个步骤；
9. 重复第3-7个步骤；

......
可以看到，这就是浏览器的事件循环Event Loop

这里归纳3个重点：

1. 宏队列macrotask一次只从队列中取一个任务执行，执行完后就去执行微任务队列中的任务；
2. 微任务队列中所有的任务都会被依次取出来执行，知道microtask queue为空；
3. 图中没有画UI rendering的节点，因为这个是由浏览器自行判断决定的，但是只要执行UI rendering，它的节点是在执行完所有的microtask之后，下一个macrotask之前，紧跟着执行UI render。

好了，概念性的东西就这么多，来看几个示例代码，测试一下你是否掌握了:

``` javascript
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
})

setTimeout(() => {
  console.log(6);
})

console.log(7);
```

这里结果会是什么呢？运用上面了解到的知识，先自己做一下试试看。

// 正确答案
1
4
7
5
2
3
6
你答对了吗？

我们来分析一下整个流程：

执行全局Script代码
Step 1

console.log(1)
Stack Queue: [console]

Macrotask Queue: []

Microtask Queue: []

打印结果：
1
Step 2

setTimeout(() => {
  // 这个回调函数叫做callback1，setTimeout属于macrotask，所以放到macrotask queue中
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});
Stack Queue: [setTimeout]

Macrotask Queue: [callback1]

Microtask Queue: []

打印结果：
1
Step 3

new Promise((resolve, reject) => {
  // 注意，这里是同步执行的，如果不太清楚，可以去看一下我开头自己实现的promise啦~~
  console.log(4)
  resolve(5)
}).then((data) => {
  // 这个回调函数叫做callback2，promise属于microtask，所以放到microtask queue中
  console.log(data);
})
Stack Queue: [promise]

Macrotask Queue: [callback1]

Microtask Queue: [callback2]

打印结果：
1
4
Step 5

setTimeout(() => {
  // 这个回调函数叫做callback3，setTimeout属于macrotask，所以放到macrotask queue中
  console.log(6);
})
Stack Queue: [setTimeout]

Macrotask Queue: [callback1, callback3]

Microtask Queue: [callback2]

打印结果：
1
4
Step 6

console.log(7)
Stack Queue: [console]

Macrotask Queue: [callback1, callback3]

Microtask Queue: [callback2]

打印结果：
1
4
7
好啦，全局Script代码执行完了，进入下一个步骤，从microtask queue中依次取出任务执行，直到microtask queue队列为空。
Step 7

console.log(data) // 这里data是Promise的决议值5
Stack Queue: [callback2]

Macrotask Queue: [callback1, callback3]

Microtask Queue: []

打印结果：
1
4
7
5
这里microtask queue中只有一个任务，执行完后开始从宏任务队列macrotask queue中取位于队首的任务执行
Step 8

console.log(2)
Stack Queue: [callback1]

Macrotask Queue: [callback3]

Microtask Queue: []

打印结果：
1
4
7
5
2
但是，执行callback1的时候又遇到了另一个Promise，Promise异步执行完后在microtask queue中又注册了一个callback4回调函数

Step 9

Promise.resolve().then(() => {
  // 这个回调函数叫做callback4，promise属于microtask，所以放到microtask queue中
  console.log(3)
});
Stack Queue: [promise]

Macrotask v: [callback3]

Microtask Queue: [callback4]

打印结果：
1
4
7
5
2
取出一个宏任务macrotask执行完毕，然后再去微任务队列microtask queue中依次取出执行
Step 10

console.log(3)
Stack Queue: [callback4]

Macrotask Queue: [callback3]

Microtask Queue: []

打印结果：
1
4
7
5
2
3
微任务队列全部执行完，再去宏任务队列中取第一个任务执行
Step 11

console.log(6)
Stack Queue: [callback3]

Macrotask Queue: []

Microtask Queue: []

打印结果：
1
4
7
5
2
3
6
以上，全部执行完后，Stack Queue为空，Macrotask Queue为空，Micro Queue为空
Stack Queue: []

Macrotask Queue: []

Microtask Queue: []

最终打印结果：
1
4
7
5
2
3
6
因为是第一个例子，所以这里分析的比较详细，大家仔细看一下，接下来我们再来一个例子：

console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
  
  Promise.resolve().then(() => {
    console.log(6)
  }).then(() => {
    console.log(7)
    
    setTimeout(() => {
      console.log(8)
    }, 0);
  });
})

setTimeout(() => {
  console.log(9);
})

console.log(10);
最终输出结果是什么呢？参考前面的例子，好好想一想......

// 正确答案
1
4
10
5
6
7
2
3
9
8
相信大家都答对了，这里的关键在前面已经提过：

在执行微队列microtask queue中任务的时候，如果又产生了microtask，那么会继续添加到队列的末尾，也会在这个周期执行，直到microtask queue为空停止。

注：当然如果你在microtask中不断的产生microtask，那么其他宏任务macrotask就无法执行了，但是这个操作也不是无限的，拿NodeJS中的微任务process.nextTick()来说，它的上限是1000个，后面我们会讲到。

浏览器的Event Loop就说到这里，下面我们看一下NodeJS中的Event Loop，它更复杂一些，机制也不太一样。

NodeJS中的Event Loop
libuv
先来看一张libuv的结构图：

node-libuv

NodeJS中的宏队列和微队列
NodeJS的Event Loop中，执行宏队列的回调任务有6个阶段，如下图：

node-eventloop-6phase

各个阶段执行的任务如下：

timers阶段：这个阶段执行setTimeout和setInterval预定的callback
I/O callback阶段：执行除了close事件的callbacks、被timers设定的callbacks、setImmediate()设定的callbacks这些之外的callbacks
idle, prepare阶段：仅node内部使用
poll阶段：获取新的I/O事件，适当的条件下node将阻塞在这里
check阶段：执行setImmediate()设定的callbacks
close callbacks阶段：执行socket.on('close', ....)这些callbacks
NodeJS中宏队列主要有4个

由上面的介绍可以看到，回调事件主要位于4个macrotask queue中：

Timers Queue
IO Callbacks Queue
Check Queue
Close Callbacks Queue
这4个都属于宏队列，但是在浏览器中，可以认为只有一个宏队列，所有的macrotask都会被加到这一个宏队列中，但是在NodeJS中，不同的macrotask会被放置在不同的宏队列中。

NodeJS中微队列主要有2个：

Next Tick Queue：是放置process.nextTick(callback)的回调任务的
Other Micro Queue：放置其他microtask，比如Promise等
在浏览器中，也可以认为只有一个微队列，所有的microtask都会被加到这一个微队列中，但是在NodeJS中，不同的microtask会被放置在不同的微队列中。

具体可以通过下图加深一下理解：

node-eventloop

大体解释一下NodeJS的Event Loop过程：

执行全局Script的同步代码
执行microtask微任务，先执行所有Next Tick Queue中的所有任务，再执行Other Microtask Queue中的所有任务
开始执行macrotask宏任务，共6个阶段，从第1个阶段开始执行相应每一个阶段macrotask中的所有任务，注意，这里是所有每个阶段宏任务队列的所有任务，在浏览器的Event Loop中是只取宏队列的第一个任务出来执行，每一个阶段的macrotask任务执行完毕后，开始执行微任务，也就是步骤2
Timers Queue -> 步骤2 -> I/O Queue -> 步骤2 -> Check Queue -> 步骤2 -> Close Callback Queue -> 步骤2 -> Timers Queue ......
这就是Node的Event Loop
关于NodeJS的macrotask queue和microtask queue，我画了两张图，大家作为参考：

node-microtaskqueue

node-macrotaskqueue

好啦，概念理解了我们通过几个例子来实战一下：

第一个例子

console.log('start');

setTimeout(() => {          // callback1
  console.log(111);
  setTimeout(() => {        // callback2
    console.log(222);
  }, 0);
  setImmediate(() => {      // callback3
    console.log(333);
  })
  process.nextTick(() => {  // callback4
    console.log(444);  
  })
}, 0);

setImmediate(() => {        // callback5
  console.log(555);
  process.nextTick(() => {  // callback6
    console.log(666);  
  })
})

setTimeout(() => {          // callback7              
  console.log(777);
  process.nextTick(() => {  // callback8
    console.log(888);   
  })
}, 0);

process.nextTick(() => {    // callback9
  console.log(999);  
})

console.log('end');
请运用前面学到的知识，仔细分析一下......

// 正确答案
start
end
999
111
777
444
888
555
333
666
222
更新 2018.9.20
上面这段代码你执行的结果可能会有多种情况，原因解释如下。

setTimeout(fn, 0)不是严格的0，一般是setTimeout(fn, 3)或什么，会有一定的延迟时间，当setTimeout(fn, 0)和setImmediate(fn)出现在同一段同步代码中时，就会存在两种情况。
第1种情况：同步代码执行完了，Timer还没到期，setImmediate回调先注册到Check Queue中，开始执行微队列，然后是宏队列，先从Timers Queue中开始，发现没回调，往下走直到Check Queue中有回调，执行，然后timer到期（只要在执行完Timer Queue后到期效果就都一样），timer回调注册到Timers Queue中，下一轮循环执行到Timers Queue中才能执行那个timer 回调；所以，这种情况下，setImmediate(fn)回调先于setTimeout(fn, 0)回调执行。
第2种情况：同步代码还没执行完，timer先到期，timer回调先注册到Timers Queue中，执行到setImmediate了，它的回调再注册到Check Queue中。 然后，同步代码执行完了，执行微队列，然后开始先执行Timers Queue，先执行Timer 回调，再到Check Queue，执行setImmediate回调；所以，这种情况下，setTimeout(fn, 0)回调先于setImmediate(fn)回调执行。
所以，在同步代码中同时调setTimeout(fn, 0)和setImmediate情况是不确定的，但是如果把他们放在一个IO的回调，比如readFile('xx', function () {// ....})回调中，那么IO回调是在IO Queue中，setTimeout到期回调注册到Timers Queue，setImmediate回调注册到Check Queue，IO Queue执行完到Check Queue，timer Queue得到下个周期，所以setImmediate回调这种情况下肯定比setTimeout(fn, 0)回调先执行。
综上，这个例子是不太好的，setTimeout(fn, 0)和setImmediate(fn)如果想要保证结果唯一，就放在一个IO Callback中吧，上面那段代码可以把所有它俩同步执行的代码都放在一个IO Callback中，结果就唯一了。

更新结束

你答对了吗？我们来一起分析一下：

执行全局Script代码，先打印start，向下执行，将setTimeout的回调callback1注册到Timers Queue中，再向下执行，将setImmediate的回调callback5注册到Check Queue中，接着向下执行，将setTimeout的回调callback7注册到Timers Queue中，继续向下，将process.nextTick的回调callback9注册到微队列Next Tick Queue中,最后一步打印end。此时，各个队列的回调情况如下：
宏队列

Timers Queue: [callback1, callback7]

Check Queue: [callback5]

IO Callback Queue： []

Close Callback Queue: []

微队列

Next Tick Queue: [callback9]

Other Microtask Queue: []

打印结果
start
end
全局Script执行完了，开始依次执行微任务Next Tick Queue中的全部回调任务。此时Next Tick Queue中只有一个callback9，将其取出放入调用栈中执行，打印999。
宏队列

Timers Queue: [callback1, callback7]

Check Queue: [callback5]

IO Callback Queue： []

Close Callback Queue: []

微队列

Next Tick Queue: []

Other Microtask Queue: []

打印结果
start
end
999
开始依次执行6个阶段各自宏队列中的所有任务，先执行第1个阶段Timers Queue中的所有任务，先取出callback1执行，打印111，callback1函数继续向下，依次把callback2放入Timers Queue中，把callback3放入Check Queue中，把callback4放入Next Tick Queue中，然后callback1执行完毕。再取出Timers Queue中此时排在首位的callback7执行，打印777，把callback8放入Next Tick Queue中，执行完毕。此时，各队列情况如下：
宏队列

Timers Queue: [callback2]

Check Queue: [callback5, callback3]

IO Callback Queue： []

Close Callback Queue: []

微队列

Next Tick Queue: [callback4, callback8]

Other Microtask Queue: []

打印结果
start
end
999
111
777
6个阶段每阶段的宏任务队列执行完毕后，都会开始执行微任务，此时，先取出Next Tick Queue中的所有任务执行，callback4开始执行，打印444，然后callback8开始执行，打印888，Next Tick Queue执行完毕，开始执行Other Microtask Queue中的任务，因为里面为空，所以继续向下。
宏队列

Timers Queue: [callback2]

Check Queue: [callback5, callback3]

IO Callback Queue： []

Close Callback Queue: []

微队列

Next Tick Queue: []

Other Microtask Queue: []

打印结果
start
end
999
111
777
444
888
第2个阶段IO Callback Queue队列为空，跳过，第3和第4个阶段一般是Node内部使用，跳过，进入第5个阶段Check Queue。取出callback5执行，打印555，把callback6放入Next Tick Queue中，执行callback3，打印333。
宏队列

Timers Queue: [callback2]

Check Queue: []

IO Callback Queue： []

Close Callback Queue: []

微队列

Next Tick Queue: [callback6]

Other Microtask Queue: []

打印结果
start
end
999
111
777
444
888
555
333
执行微任务队列，先执行Next Tick Queue，取出callback6执行，打印666，执行完毕，因为Other Microtask Queue为空，跳过。
宏队列

Timers Queue: [callback2]

Check Queue: []

IO Callback Queue： []

Close Callback Queue: []

微队列

Next Tick Queue: [callback6]

Other Microtask Queue: []

打印结果
start
end
999
111
777
444
888
555
333
执行第6个阶段Close Callback Queue中的任务，为空，跳过，好了，此时一个循环已经结束。进入下一个循环，执行第1个阶段Timers Queue中的所有任务，取出callback2执行，打印222，完毕。此时，所有队列包括宏任务队列和微任务队列都为空，不再打印任何东西。
宏队列

Timers Queue: []

Check Queue: []

IO Callback Queue： []

Close Callback Queue: []

微队列

Next Tick Queue: [callback6]

Other Microtask Queue: []

最终结果
start
end
999
111
777
444
888
555
333
666
222
以上就是这道题目的详细分析，如果没有明白，一定要多看几次。

下面引入Promise再来看一个例子：

console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})

new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})
process.nextTick(function() {
  console.log('6');
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
大家仔细分析，相比于上一个例子，这里由于存在Promise，所以Other Microtask Queue中也会有回调任务的存在，执行到微任务阶段时，先执行Next Tick Queue中的所有任务，再执行Other Microtask Queue中的所有任务，然后才会进入下一个阶段的宏任务。明白了这一点，相信大家都可以分析出来，下面直接给出正确答案，如有疑问，欢迎留言和我讨论。

// 正确答案
1
7
6
8
2
4
9
11
3
10
5
12
setTimeout 对比 setImmediate
setTimeout(fn, 0)在Timers阶段执行，并且是在poll阶段进行判断是否达到指定的timer时间才会执行
setImmediate(fn)在Check阶段执行
两者的执行顺序要根据当前的执行环境才能确定：

如果两者都在主模块(main module)调用，那么执行先后取决于进程性能，顺序随机
如果两者都不在主模块调用，即在一个I/O Circle中调用，那么setImmediate的回调永远先执行，因为会先到Check阶段
setImmediate 对比 process.nextTick
setImmediate(fn)的回调任务会插入到宏队列Check Queue中
process.nextTick(fn)的回调任务会插入到微队列Next Tick Queue中
process.nextTick(fn)调用深度有限制，上限是1000，而setImmedaite则没有
总结
浏览器的Event Loop和NodeJS的Event Loop是不同的，实现机制也不一样，不要混为一谈。
浏览器可以理解成只有1个宏任务队列和1个微任务队列，先执行全局Script代码，执行完同步代码调用栈清空后，从微任务队列中依次取出所有的任务放入调用栈执行，微任务队列清空后，从宏任务队列中只取位于队首的任务放入调用栈执行，注意这里和Node的区别，只取一个，然后继续执行微队列中的所有任务，再去宏队列取一个，以此构成事件循环。
NodeJS可以理解成有4个宏任务队列和2个微任务队列，但是执行宏任务时有6个阶段。先执行全局Script代码，执行完同步代码调用栈清空后，先从微任务队列Next Tick Queue中依次取出所有的任务放入调用栈中执行，再从微任务队列Other Microtask Queue中依次取出所有的任务放入调用栈中执行。然后开始宏任务的6个阶段，每个阶段都将该宏任务队列中的所有任务都取出来执行（注意，这里和浏览器不一样，浏览器只取一个），每个宏任务阶段执行完毕后，开始执行微任务，再开始执行下一阶段宏任务，以此构成事件循环。
MacroTask包括： setTimeout、setInterval、 setImmediate(Node)、requestAnimation(浏览器)、IO、UI rendering
Microtask包括： process.nextTick(Node)、Promise、Object.observe、MutationObserver
第3点修改：
Node 在新版本中，也是每个 Macrotask 执行完后，就去执行 Microtask 了，和浏览器的模型一致。
node队列

## 闭包

闭包可以让你从内部函数访问外部函数作用域。在 JavaScript 中，每当函数被创建，就会在函数生成时生成闭包

可以使用闭包 生成多个方法

``` javascript
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

```

可以使用闭包 模拟私有方法，避免污染外部环境

## ECMAScript 6 ES6

## JS模块化、Module 语法

模块

模块是将一个复杂程序依照规范封装成几个文件，并进行组合使用。

模块内部数据和实现是私有的，通过暴露出去接口实现与外部通信。

### CommonJS

Node 服务端使用

Node应用由模块组成，采用CommonJS模块规范。

根据这个规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。

require方法用于加载模块。

为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。

var exports = module.exports;

于是我们可以直接在 exports 对象上添加方法，表示对外输出的接口，如同在module.exports上添加一样。注意，不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系。

ES6模块规范

不同于CommonJS，ES6使用 export 和 import 来导出、导入模块。

``` javascript
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};
```

需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

``` javascript
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};

export default 命令
使用export default命令，为模块指定默认输出。

// export-default.js
export default function () {
  console.log('foo');
}
```

相关链接：

CommonJS规范，http://javascript.ruanyifeng.com/nodejs/module.html
ES6 Module 的语法，http://es6.ruanyifeng.com/#docs/module

### commonjs与ES6的module区别

两者的模块导入导出语法不同，commonjs是module.exports，exports导出，require导入；ES6则是export导出，import导入。

commonjs是运行时加载模块，ES6是在静态编译期间就确定模块的依赖。

ES6在编译期间会将所有import提升到顶部，commonjs不会提升require。

commonjs导出的是一个值拷贝，会对加载结果进行缓存，一旦内部再修改这个值，则不会同步到外部。ES6是导出的一个引用，内部修改可以同步到外部。

两者的循环导入的实现原理不同，commonjs是当模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。所以，输入变量的时候，必须非常小心。ES6 模块是动态引用，如果使用import从一个模块加载变量（即import foo from 'foo'），那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。

commonjs中顶层的this指向这个模块本身，而ES6中顶层this指向undefined。

然后就是commonjs中的一些顶层变量在ES6中不再存在：

```
arguments
require
module
exports
__filename
__dirname
```
