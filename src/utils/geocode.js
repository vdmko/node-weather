const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmFkeW0ta29yb3RreWkiLCJhIjoiY2tiNmJlZXFjMHRwcTJxcGRqYXdsYmZvbyJ9.RXuHMi6HVjKoEIbXoRG4Sw&limit=1`

    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback("Unable to connect to location service!")
        } else if (body.features.length === 0) {
            callback("Unable to find geolocation")
        } else {
            const locationData = body.features[0];
            callback(undefined, {
                latitude: locationData.center[0],
                longitude: locationData.center[1],
                location: locationData.place_name
            })
        }
    })
}

module.exports = geocode
