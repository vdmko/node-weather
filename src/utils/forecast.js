const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=db3f13d4d10493cd5e86322dec81613a&query=${longitude},${latitude}`;

    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback("Unable to connect to forecast service!")
        } else if (body.error) {
            callback("Unable to find forecast")
        } else {
            const currentWeather = body.current;
            callback(undefined, `${currentWeather.weather_descriptions[0]} It's currently ${currentWeather.temperature}. It feels like ${currentWeather.feelslike} degress out. Observation time is ${currentWeather.observation_time}`);
        }
    });
}

module.exports = forecast;
