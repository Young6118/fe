// promise 是一个构造函数

// promise 有状态、有值、有原因
// 1.首先实现 resolve reject方法，状态为pending时候可以再改值再状态
// 2.基于原型链实现then方法，
function Promise (exector) {
    this.status = 'pending'
    this.value = ''
    this.reason = ''
    let self = this

    function resolve (value) {
        if (self.status=='pending') {
            self.value = value
            self.status = 'fulfilled'
        }
    }

    function reject (reason) {
        if (self.status=='pending') {
            self.reason = reason
            self.status = 'rejected'
        }
    }

    try {
        exector(resolve, reject)
    }
    
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    if (this.status==='fulfilled') {
        onFulfilled(this.value)
    }
    if (this.status==='rejected') {
        onRejected(this.reason)
    }
}

module.exports = Promise;