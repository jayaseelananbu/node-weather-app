const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=497b96fb95659adb2e3e4759e7f84168&query=' + lat + ',' + long + '&units=f';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect with weatherstack ..!", undefined)
        } else if (body.error) {
            callback('Unable to find the location...!', undefined)
        } else {
            const weather_api_response = body.current
            const temperature = weather_api_response.temperature;
            const feels_like = weather_api_response.feelslike;
            const weather_description = weather_api_response.weather_descriptions[0]
            callback(undefined, weather_description + ' Currently It is ' + temperature + ' But it feels like  ' + feels_like)
        }
    })

}

module.exports = forecast