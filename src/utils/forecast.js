//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request = require('request')

const forecast = (lat,lon,callback) => {
    const url = 'https://api.weatherapi.com/v1/current.json?key=64c0f09038694d60b8553339240206&q='+ lat +','+lon

    request({url, json:true}, (error,{body}) => {
        if(error)
        {
            callback("Unable to connect to weather forcast service",undefined)
        }
        else if(body.error)
        {
            callback("Unable to find location given in q", undefined)
        }
        else
        {
            callback(undefined, "It is currently "+body.current.temp_c+" out. It feels like "+body.current.feelslike_c+" degrees out in "+body.location.name)
            // callback(undefined, {
            //     current_temp : response.body.current.temp_c,
            //     feelslike_c : response.body.current.feelslike_c,
            //     location : response.body.location.name
            // })
        }
    })
 }

 module.exports = forecast