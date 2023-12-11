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

const checkVisited = async () => {
  let countries = [];
  const result = await db.query("SELECT country_code FROM visited_countries");
  // console.log(result.rows);

  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log("Countires : " + countries);
  return countries;
};

app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await checkVisited();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];
  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%' ",
      [input.toLowerCase()]
    );
    console.log(result.rows);

    const data = result.rows[0];
    const country_code = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [country_code]
      );
      res.redirect("/");
    } catch (error) {
      console.log("E1 :" + error);
      const countries = await checkVisited();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }
  } catch (error) {
    console.log(error);
    const countries = await checkVisited();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
