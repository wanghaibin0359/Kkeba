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
                // this[dir] && this[dir](node,exp)
                this.update(node, exp, dir)
            }
        })
    }
    isDirective(attr) {
        return attr.indexOf("k-") == 0;
    }
    update(node, exp, dir) {
        const fn = this[dir + "Updater"]
        fn && fn(node, this.vm[exp])
        new Watch(this.vm, exp, (val) => {
            fn && fn(node, val)
        })
    }
    //k-text
    text(node, exp) {
        node.textContent = this.vm[exp]
    }

    textUpdater(node, val) {
        node.textContent = val
    }
}