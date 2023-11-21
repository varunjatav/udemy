import bodyParser from "body-parser";
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
  data.push({
    imageUrl: req.body["url"],
    Title: req.body["title"],
    SubTitle: req.body["sub-title"],
    Comment: req.body["comment"],
  });
  console.log(data);

  res.render("posts.ejs", { data });

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
