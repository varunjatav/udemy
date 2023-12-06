import express from "express";
import axios from "axios";

const app = express();
const port = 3000;


app.use(express.static("public"));

app.get("/", async(req, res) => {
    try {
        const result = await axios.get(`https://official-joke-api.appspot.com/random_joke`);
        console.log(result.data);
        res.render("index.ejs", {joke: result.data});
    } catch (error) {
       console.log(error.message);
        // res.status(500);
    }
})

app.listen(port, () => {
    console.log(`listening on ${port}`);
})