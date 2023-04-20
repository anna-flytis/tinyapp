const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

app.set("view engine", "ejs");

//body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));




// helper functions
const { generateRandomString, findEmail, findPassword, findUserID, urlsForUser } = require("./helpers");

//cookie-session
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['7f69fa85-caec-4d9c-acd7-eebdccb368d5', 'f13b4d38-41c4-46d3-9ef6-8836d03cd8eb']
}));

// newdatabase with id
const urlDatabase = {
    b6UTxQ: { longURL: "https://www.lighthouse.ca", userID: "aJ48lW" },
    i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" }
  };
  
// user database
const users = {
    "aJ48lW": {
      id: "aJ48lW",
      email: "a.mar@g.com",
      password: bcrypt.hashSync("2", saltRounds)
    },
  };
  
//login form
app.get("/login", (req, res) => {
    const templateVars = {
      user: users[req.session["userID"]]
    };
    res.render("urls_login", templateVars);
  });
  
//register form
app.get("/register", (req, res) => {
    const templateVars = {
      user: users[req.session["userID"]]
    };
    res.render("urls_registration", templateVars);
  });
  
//main page
app.get("/urls", (req, res) => {
    const templateVars = {
      urls: urlsForUser(req.session.userID, urlDatabase),
      user: users[req.session["userID"]]
    };
    res.render("urls_index", templateVars);
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
