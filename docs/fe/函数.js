/*
1.高阶函数
定义：一个函数可以接收另一个函数作为参数，我们称这个函数为高阶函数。
参数和返回值都是函数
*/
// 传递函数作为参数
function fun (data, fn) {
    // 匿名函数
    return fn(data)
}
fun(-1, Math.abs)

// node 中文件读取
// fs.readFile(path, 'utf8', (err, data) => {
// })

// map
function pow (x) {
    return x * x
}
var arr = [1,2,3,4,5]
// console.log(arr.map(pow))

// reduce
// Math.ceil 向上取整
// Math.floor 向下取整
// Math.round 四舍五入
var numbers = [15.5, 2.3, 1.1, 4.7];
function getSum(total, num) {
    return total + Math.round(num)
}
numbers.reduce(getSum, 0)

arr.sort((a, b) => {
    // 从小到大
    return a - b
    // return b - a 从大到小
})
arr.sort((a, b) => {
    // 从小到大
    if (a > b) {
        return 1
    }
    if (a < b) {
        return -1
    }
    return 0
})
arr.sort((a, b) => {
    // 从大到小
    if (a < b) {
        return 1
    }
    if (a > b) {
        return -1
    }
    return 0
})

/*
2.面向切面编程 Aspect Oriented Programming
通过预编译方式和运行期间动态代理实现程序功能的统一维护的一种技术。
独立于业务逻辑，不影响业务逻辑但能实现特定功能的代码。
日志记录，性能统计，安全控制，事务处理，异常处理等等
*/
Function.prototype.before = function (callback) {
    return (val) => {
        callback()
        this(val)
    }
}

Function.prototype.beforeFunc = function (callback) {
    var self = this
    return function (val) {
        callback()
        self(val)
        // self.apply(self, arguments)
        // self.call(null, val)
        // self.call(self, val)
        // self.call(window, val)
    }
}

function fn (val) {
    console.log('函数执行一定的功能', val)
}

var newFn = fn.before(() => {
    console.log('在函数执行之前执行此语句')
})
var newFn2 = fn.beforeFunc(() => {
    console.log('在函数执行之前执行此语句')
})
/*
newFn 实际上是
newFn = () => {
    callback()
    this()
}
可以进行传参
*/

newFn2('你好啊')

// 3. after
var after = function (times, callback) {
    return function () {
        if (--times === 0) {
            callback()
        }
    }
}

var newFunc = after(3, function () {
    console.log('你该回家吃饭了')
})
newFunc()
newFunc()
newFunc()


var afterBoth = function (timer, callback) {
    var results = {}
    return function (key, value) {
        results[key] = value
        if (--timer === 0) {
            callback(results)
        }
    }
}

var newFunc1 = afterBoth(2, function (results) {
    console.log(results)
})


var fs = require('fs')
fs.readFile(__dirname+'/name.txt', 'utf8', (err, data) => {
    if (err) return err
    newFunc1('name', data)
})
fs.readFile(__dirname+'/age.txt', 'utf8', (err, data) => {
    if (err) return err
    newFunc1('age', data)
})






