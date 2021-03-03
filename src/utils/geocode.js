const request = require('postman-request')

const geocode = (address, callback) => {

    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamF5YXNlZWxhbm1hcGJveCIsImEiOiJja2xqb3d6dXQwYTNoMnFwNWV0OWwwaXlzIn0.WQKPmXyMwBoZCFnUinqheg&limit=1';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect with mapbox API', undefined)
        } else if (body.message) {
            callback('error.body.message', undefined)
        } else {
            console.log(body)
            if (body.features.length > 0) {
                place_data = body.features[0].center;
                callback(undefined, {
                    latitude: place_data[1],
                    longitude: place_data[0],
                    location: body.features[0].place_name
                })
            } else {
                callback('Unable to get location data', undefined)
            }

        }
    })
}

module.exports = geocode