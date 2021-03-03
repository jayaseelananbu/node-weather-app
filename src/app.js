const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// assets settings
const publicAssetLocation = path.join(__dirname, '../public')
const viewsLocation = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//handlebar settings
app.set('view engine', 'hbs')
app.set('views', viewsLocation)
app.use(express.static(publicAssetLocation))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', { title: 'Weather', message: 'Welcome to my site', name: "Jayaseelan A" })
})

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help', message: 'Help page content goes here', name: "Jayaseelan A" })
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About", message: "About page with contents", name: "Jayaseelan A" })
})

app.get('/weather', (req, res) => {
    console.log(req.query)

    if (!req.query.address) {
        return res.send({
            error: "You must provide address to get weather."
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            // console.log("Location : " + location)
            //console.log(forecastData)

            res.send(
                [{
                    forecast: forecastData,
                    location,
                    address: req.query.address
                }]
            )

        })

    })

})

app.get('/help/*', (req, res) => {
    res.render('404', { title: '404 page', name: 'Jayaseelan A', message: 'Help article not found..!' })
})

app.get('*', (req, res) => {
    res.render('404', { title: '404 page', name: 'Jayaseelan A', message: 'Page not found..!' })
})

app.listen(3000, () => {
    console.log('app running on port 300')
})
