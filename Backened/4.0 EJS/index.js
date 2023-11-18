import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.get("/", (req, res) => {
  const today = new Date();
  let day = today.getDay();

  let type = "A weekDay";
  let adv = "It's time to work hard";

  if(day === 0 || day === 6){
    type = "The weekEnd";
    adv = "It's time to have some fun";
  }

  console.log(day);
  res.render("index.ejs", {
    dayType: type,
    advise: adv,
  });
});

// app.post("/submit", (req, res) => {
//     res.render("index.ejs",{
//         day: day,
//     })
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
