// const Page = require('./helpers/page')

// let page;

// beforeEach(async () => {
//     page = await Page.build()
//     await page.goto('http://localhost:3000')

// });

// afterEach(async () => {

//     await page.close()

// })

test('Adds Two Numbers', () => {
    const sum = 1 + 2
    expect(sum).toEqual(3)
});

// test('the header has the correct text', async () => {

//     const text = await page.getContentsOf('a.brand-logo')

//     expect(text).toEqual('Blogster')
// });

// test('clicking header has the correct text ', async () => {
//     // click on a link in page
//     await page.click('.right a')
//     const url = await page.url()

//     expect(url).toMatch("/accounts\.google\.com/")
// });

// test('when signed in , shoes logout button ', async () => {
//     await page.login();

//     const text = await page.getContentsOf('a[href="/auth/logout"]')

//     expect(text).toEqual('Logout')
// });
