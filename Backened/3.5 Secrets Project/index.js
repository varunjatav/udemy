//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var isUserAuthenticated = false;

app.use(bodyParser.urlencoded({ extended: true }));

const passwordCheck = (req, res, next) => {
  const password = req.body["password"];
//   console.log(password);
  if (password === "ILoveProgramming") {
    isUserAuthenticated = true;
  }
  next();
};
app.use(passwordCheck);



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
   if(isUserAuthenticated){
    res.sendFile(__dirname+ "/public/secret.html");
   }else{
    res.sendFile(__dirname + "/public/index.html");
   }
});

app.listen(port, () => {
  console.log(`App is listening on: ${port}`);
});
