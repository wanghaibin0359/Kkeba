class Compile {
    constructor(vm, $el) {
        this.vm = vm;
        this.el = document.querySelector($el)

        if (this.el) {
            this.compile(this.el)
        }
    }
    compile(ele) {
        let childNodes = ele.childNodes;
        Array.from(childNodes).forEach(Node => {

            if (this.isElement(Node)) {
                //解析attr，
                this.compileElement(Node)
            }
            if (this.isInterpolation(Node)) {
                //修改文本
                this.update(Node, RegExp.$1, "text")
            }
            if (Node.childNodes && Node.childNodes.length > 0) {
                this.compile(Node);
            }
        })
    }
    isElement(node) {
        return node.nodeType == 1
    }
    isInterpolation(node) {
        return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    //编译元素
    compileElement(node) {
        let nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            let attrName = attr.name,
                exp = attr.value;
            if (this.isDirective(attrName)) {
                let dir = attrName.substr(2)
                debugger
                 this[dir] && this[dir](node, exp, dir)
            }

            if (this.isEvent(attrName)) {
                let dir = attrName.substr(1)
                this.EventHandler(node,exp, dir)
            }
        })
    }
    isDirective(attr) {
        return attr.indexOf("k-") == 0;
    }
    isEvent(attr) {
        return attr.indexOf("@") == 0
    }
    update(node, exp, dir) {
        const fn = this[dir + "Updater"]
        fn && fn(node, this.vm[exp])
        new Watch(this.vm, exp, (val) => {
            fn && fn(node, val)
        })
    }
    //@click
    EventHandler(node,exp, event) {
        let methods = this.vm.$options.methods[exp].bind(this.vm);
        node.addEventListener(event, methods)
    }
    //k-model
    model(node, exp, dir) {
        node.addEventListener("input", (e => {
            this.vm[exp]=e.target.value
        }))
        this.update(node, exp, dir)
    }
    //k-text
    text(node, exp, dir) {
       this.update(node,exp,dir)
    }

    modelUpdater(node,val) {
        //input事件
        node.value = val
    }

    textUpdater(node, val) {
        node.textContent = val
    }
}