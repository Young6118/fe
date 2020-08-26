let obj = {
    name: 'young',
    age: 23,
    location: {
        address: 'shanghai'
    },
    friends: ['tongling']
}

let arrayMethods = ['push', 'pop', 'shift', 'unshift', 'splice'];

let arrayProto = Array.prototype

let myArrayProto = Object.create(arrayProto)
// aop
arrayMethods.forEach(method => {
    myArrayProto[method] = function () {
        render()
        arrayProto[method].call(this, ...arguments)
    }
})

function render() {
    console.log('视图更新了')
}

function observer(obj) {
    if (Array.isArray(obj)) {
        obj.__proto__ = myArrayProto
        return
    }
    if (typeof obj === 'object') {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                defineReactive(obj, key, obj[key])
            }
        }
    }
}

function defineReactive (obj, key, value) {
    observer(value)
    Object.defineProperty(obj, key, {
        get () {
            return value
        },
        set (newVal) {
            if (newVal === value) return
            observer(newVal)
            render()
            value = newVal
        }
    })
}

function $set(obj, key, value) {
    defineReactive (obj, key, value)
}

observer(obj)
// obj.name = 'laowang'

// obj.location.address = 'xian'

// obj.location = {
//     address: '安康'
// }
// obj.location.address = '上海'

// obj.hobbits = 'sleep'
// $set(obj, 'hobbits', 'sleep')

// obj.hobbits = 'drinking'

obj.friends.push('yunjie')

console.log(obj.friends)