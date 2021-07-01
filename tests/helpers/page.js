// const puppeteer = require('puppeteer')
// const sessionFactory = require('../factories/sessionFactory.js')
// const userFactory = require('../factories/userFactory.js')

// class CustomPage {
//     static async build() {

//         const browser = await puppeteer.lunch({
//             headless: true,
//             args:['--no-sandbox']
//         });

//         const page = await browser.newPage()
//         const customPage = new CustomPage(page)

//         return new Proxy(customPage, {
//             get: function (target, property) {
//                 return customPage[property] || page[property] || browser[property]
//             }
//         })
//     }

//     constructor(page) {
//         this.page = page
//     }

//     async login() {
//         const user = await userFactory()
//         const { session, sig } = sessionFactory(user);

//         await this.page.setCookie({ name: 'session', value: session })
//         await this.page.setCookie({ name: 'session.sig', value: sig })
//         await this.page.goto('http://localhost:3000/blogs')
//         await this.page.waitFor('a[href="/auth/logout"]')

//     }

//     async getContentsOf(selector) {
//         return this.page.$eval(selector, el => el.innerHTML)
//     }

//     get(path) {
//         return this.page.evaluate((_path) => {
//             return fetch(_path, {
//                 method: 'GET', // *GET, POST, PUT, DELETE, etc.
//                 credentials: 'same-origin', // include, *same-origin, omit
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }).then(res => res.json())
//         }, path)
//     }

//     post(path, data) {
//         return this.page.evaluate((_path, _data) => {

//             return fetch(_path, {
//                 method: 'POST', // *GET, POST, PUT, DELETE, etc.
//                 // mode: 'cors', // no-cors, *cors, same-origin
//                 // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//                 credentials: 'same-origin', // include, *same-origin, omit
//                 headers: {
//                     'Content-Type': 'application/json'
//                     // 'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//                 // redirect: 'follow', // manual, *follow, error
//                 // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//                 body: JSON.stringify(_data) // body data type must match "Content-Type" header
//             }).then(res => res.json())

//         }, path, data)
//     }

//     execRequest(actions) {
//         return Promise.all(
//             actions.map(({ method, path, data }) => {
//                 this[method](path, data)
//             })
//         );
//     }
// }

// module.exports = CustomPage
