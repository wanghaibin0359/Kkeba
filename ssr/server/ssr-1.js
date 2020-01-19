/* eslint-disable */
let app = require("express")(),
    Vue = require("vue");
const {
    createRenderer
} = require("vue-server-renderer")
const render = createRenderer()
const vm = new Vue({
    data: {
        name: "开课吧"
    },
    template: `
  <div >
    <h1>{{name}}</h1>
  </div>
 `
});

app.get("*", async (req, res) => {
    try {
        const html = await render.renderToString(vm) 
        res.send(html)
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
})
app.listen(3000, () => {
    console.log("start server 3000")
})