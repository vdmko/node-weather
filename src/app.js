const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express()

const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Vadym Korotkyi"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Vadym Korotkyi"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Vadym Korotkyi",
        helpMessage: "Help message"
    })
})

app.get("/weather", (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(address, (err, {latitude, longitude, location} = {}) => {
        if (err) return res.send(err)


        forecast(latitude, longitude, (err, forecastData) => {
            if (err) return res.send(err)

            res.send({
                location,
                forecastData
            });
        })

    })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    return res.send({
        products: []
    });
})


app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404 Page",
        name: "Vadym Korotkyi",
        errorMessage: "Help article not found"
    });
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404 Page",
        name: "Vadym Korotkyi",
        errorMessage: "Page not found"
    });
})

app.listen(3000, () => {
    console.log("Server is up on port 3000 ")
});
