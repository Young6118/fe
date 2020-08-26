let obj = {
    name: 'young',
    age: 23,
    location: {
        address: 'shanghai'
    },
    friends: ['tongling']
}

function render() {
    console.log('视图更新了')
}

let handler = {
    get (target, key) {
        if (typeof target[key] === 'object' && target[key] !== null) {
            return new Proxy(target[key], handler)
        }
        return Reflect.get(target, key)
    },
    set (target, key, val) {
        if (key === 'length') return true;
        render();
        return Reflect.set(target, key, val)
    },
}

let proxy = new Proxy(obj, handler)

// proxy.location = 'beijing'

// proxy.location.address = 'beijing'

proxy.friends.push(1)