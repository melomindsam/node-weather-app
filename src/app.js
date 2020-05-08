const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const port = process.env.PORT || 3001;

const app = express();

// Define public and view paths
const publicDirectoryPath = path.join(__dirname, "../public");
console.log(publicDirectoryPath);
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handle bars and view directory to render html files dynamicly
// see www.expressjs.com

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Moustapha SAMAKE",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Moustapha SAMAKE",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Moustapha SAMAKE",
    message:
      "If you have any questions, feel free to send me an email at <a href=\"mailto:moustaphasamake@mail.com\">",
  });
});

app.get("/weather", ({ query } = {}, res) => {
  if (!query.address) {
      console.log('No address given');
      res.send({
      error: "You must provide an address to get the weather forecast",
    });
  } else {
    geocode(query.address, (error, {latitude, longitude, location} = {}) => {
      if (error) {
        return res.send({ error });
      } 
        
      forecast(latitude, longitude, (error, {description, temperature, feelslike} = {}) => {
          if (error) {
            return res.send({ error })
          } 
          res.send({
            address: query.address,
            location,
            description,
            temperature,
            feelslike
          });
        });
    });
  }

  
});

app.get("/products", ({ query } = {}, res) => {
  if (!query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Page not found.",
    message: "Help page not found",
    name: "Moustapha SAMAKE",
  });
});

// Needs to come last
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page not found",
    message: "Page not found",
    name: "Moustapha SAMAKE",
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
