import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "World",
  password: "pg@Varun",
  port: 5432,
});

db.connect();

app.get("/", async (req, res) => {
  //Write your code here.
  try {
    let countries = [];
    const result = await db.query("SELECT country_code FROM visited_countries");
    // console.log(result.rows);

    result.rows.forEach((country) => {
      countries.push(country.country_code);
    });
    console.log("Countires : "+ countries);
    res.render("index.ejs", {
        countries: countries,
        total: countries.length,
      });
  } catch (error) {
    console.log("error:" + error);
  }

  
});

app.post("/add", async (req, res) => {

    const input = req.body["country"];
    const result = await db.query("SELECT country_code FROM countries WHERE country_name = $1",
    [input]
    );
    console.log(result.rows);

    if(result.rows.length !== 0) {
      const data = result.rows[0];
      const country_code = data.country_code;

      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)",
       [country_code,]);
      res.redirect("/");
    }
  
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
