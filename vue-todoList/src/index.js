import Vue from "vue"
import App from "./app.vue"
import "./assets/img/user.jpg"
import "./assets/styles/test.css"
import "./assets/styles/test-styl.styl"

const root = document.createElement("div")
document.body.appendChild(root)

new Vue({
    render: (h) => h(App)
}).$mount(root)