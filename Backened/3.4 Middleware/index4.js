import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
var bandName = "";

const app = express();
const port = 3000;

const bandNameGen = (req,res,next) => {
  console.log(req.body);
  bandName = req.body["street"] + req.body["pet"];
  console.log(bandName);
  next();
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bandNameGen)
app.get('/', (req, res) => {
  console.log(__dirname + "/public/index.html");
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send(`<h1>Your Band Name is: </h1> <h2>${bandName}✌️</h2>`)
})
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
