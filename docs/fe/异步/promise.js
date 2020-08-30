// promise 承诺
// 状态： pending-等待 fullfilled-成功 rejected-失败
// promise 一旦成功就不能失败 一旦失败就不能成功
// 执行器内同步执行 then是异步

let promise = new Promise((resolve, reject) => {
    console.log(1)
    // throw new Error('出错')
    // 等待态
    // resolve(100) // 成功态
    // reject(200) // 失败态
    setTimeout(() => {
        resolve(100)
    }, 1000)

})
l
console.log(2)

promise.then(data => {
    console.log(3)
    console.log('成功', data)
}, err => {
    console.log("失败", err)
})

console.log(4)