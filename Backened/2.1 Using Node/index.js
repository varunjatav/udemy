
const fs = require("fs");

// fs.writeFile("message.txt", "Hello from Varun!", (err) => {
//     if(err) throw err;
//     console.log("The message has been saved");
// });



fs.readFile('message.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });