const fs = require("fs"); //File System

fs.readFile("arquivo.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  }

  console.log(data);
});
