import express from "express";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("<h1>Hello world!</h1>");
    console.log(req.rawHeaders)
})
app.get('/about', (req, res) => {
    res.send("<h1>About Page</h1>");
    // console.log(req.rawHeaders)
})
app.get('/contact', (req, res) => {
    res.send("<h1>Contact Page</h1>");
    // console.log(req.rawHeaders)
})
app.get('/*', (req, res) => {
    res.send("<h1>404 Not Found</h1>");
    // console.log(req.rawHeaders)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})