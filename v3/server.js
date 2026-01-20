// 1.  Installera nodejs (LTS): https://nodejs.org/en/download
// 2.  Testa nodejs
//   a. Öppna terminal (terminal > new terminal)
//   b. Skriv: node -v
//   c. Skriv: npm -v
//   d. Bör skriva ut versioner, t ex "v22.16.0" och "10.9.2"
// 3. Skapa projekt i nodeJS
//   a. Skapa ny mapp och se till att den är synlig i "explorer" till vänster i Visual Studio Code
//   b. Högerklicka på mappen och välj "Open in intergrated terminal"
//   c. Skriv "npm init -y"
//   d. Projektet skapas, stäng inte terminalen!
// 4.  Installera moduler, i samma terminal
//   a. Skriv (i terminalen): npm install express
//   b. Skriv (i terminalen): npm install mysql2
// 5.  Klart!

const express = require("express");
const app = express();
const db = require("./db");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

let sortDirection = "";
let sort = "filmer.titel";
app.get("/", (req, res) => {
  const getVars = req.query
  const allowedSort = {
    title:  "filmer.titel",
    year:   "filmer.ar",
    length: "filmer.langd_minuter",
    genre:  "filmer.genre",
    director: "regissor"
  };
  const newSort = (allowedSort[getVars.sort]!==undefined)?allowedSort[getVars.sort]:"filmer.titel";
  if(newSort !== sort) {
    sort = newSort;
    sortDirection = "DESC";
  } else {
    sortDirection = (sortDirection === "ASC")?"DESC":"ASC";
  }
  db.query(`SELECT 
    filmer.titel,
    filmer.ar,
    filmer.langd_minuter,
    filmer.genre,
    regissorer.namn AS regissor 
    FROM filmer 
    INNER JOIN regissorer ON regissorer.id = filmer.regissor_id 
    ORDER BY ${sort} ${sortDirection};`, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("Servern kör på http://localhost:3000");
});