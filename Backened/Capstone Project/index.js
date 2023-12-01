import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';
import express from "express";

const app = express();
const port = 8000;

app.use(bodyParser({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index.ejs");
});
var data = [];
app.post("/submit", (req, res) => {
  req.params.id = uuidv4();

  console.log(req.params);
  data.push({
    id: uuidv4(),
    imageUrl: req.body["url"],
    Title: req.body["title"],
    SubTitle: req.body["sub-title"],
    Comment: req.body["comment"],
  });
  console.log(data);

  res.render("posts.ejs", { data });

});
 
app.delete("/submit/:id", (req, res) => {
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
