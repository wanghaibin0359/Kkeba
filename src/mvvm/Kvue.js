class KVue{
    constructor(opt) {
        this.$options = opt
        this.$el = opt.el
        // 1. 先对数据进行响应式

        observe(opt.data)
        // 2. 进行代理
        Object.keys(opt.data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    return opt.data[key]
                },
                set(val) {
                     opt.data[key] =val
                }
            })
        })
        // 3.解析模版
        new Compile(this,this.$el)



    }
}
function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return
    }
    if (Array.isArray(obj)) {
        copyArrayProto(obj)
    } else {
         // 进行 响应式绑定
         Object.keys(obj).forEach(key => {
             defineReactive(obj, key, obj[key])
         })
    }
}

