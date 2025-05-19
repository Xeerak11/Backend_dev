// const express = require('express')
// const app = express()
// const port = 3000

// app.use(express.static('public'))

// // app.get or app.post or app.put or app.delete(path, handler)
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.get('/about', (req, res) => {
//     res.send('About us')
// })

// app.post('/', (req, res) => {
//     res.send('Hey man its a post request')
//     console.log("Post request aayi ha")
// })

// app.get('/contact', (req, res) => {
//     res.send('Hello contact me!')
// })

// app.get('/blog', (req, res) => {
//     res.send('Hello blog!')
// })
// app.get('/index', (req, res) => {
//     res.sendFile('templates/index.html',{root: __dirname})
//     console.log("Request for index.html")
// })

// app.get('/blog/:slug', (req, res) => {
//     // logic to fetch {slug} from the db
//     // For URL: http://localhost:3000/blog/intro-to-padosi?mode=dark&region=in
//     console.log(req.params) // will output { slug: 'intro-to-padosi' }
//     console.log(req.query) // will output { mode: 'dark', region: 'in' }

//     res.send(`hello ${req.params.slug}`)
// })

// // app.get('/blog/intro-to-js', (req, res) => {
// //     // logic to fetch intro to js from the db
// //     res.send('Hello intro-to-js!')
// // })

// // app.get('/blog/intro-to-python', (req, res) => {
// //     // logic to fetch intro to python from the db
// //     res.send('Hello intro-to-python!')
// // })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })



const express = require('express')
const blog = require('./routes/blog')
const shop = require('./routes/shop')
 


const app = express()
const port = 3000
const path = require('path');

// Make sure this comes *after* your express.json() middleware 
// if you want to parse JSON bodies
app.post('/index.html', (req, res) => {
//   console.log(req.body);      // whatever Postman sent
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.use(express.static("public"))
app.use('/blog', blog)
app.use('/shop', shop)

app.get('/', (req, res) => {
    console.log("Hey its a get request")
    res.send('Hello World21!')
}).post('/', (req, res) => {
    console.log("Hey its a post request")
    res.send('Hello World post!')
})

app.put('/', (req, res) => {
    console.log("Hey its a put request")
    res.send('Hello World put!')
})

app.get("/index", (req, res) => {
    console.log("Hey its index")
    res.sendFile('templates/index.html', { root: __dirname })
})

app.get("/api", (req, res) => {
    res.json({ a: 1, b: 2, c: 3, d: 4, name: ["harry", "jerry"] })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})