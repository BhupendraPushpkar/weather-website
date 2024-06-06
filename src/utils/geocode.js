const request = require('request')

const geocode = (location, callback) => {
    const url = 'https://api.tomtom.com/search/2/geocode/'+ encodeURIComponent(location) +'.json?key=Mb1hfj3oFAPgYivXrHgAwg8nv1VFoKAt'

    request({url, json: true}, (error,{body} = {}) => {
        if(error)
        {
            callback("Unable to connect to location service", undefined)
        }
        else if(body.error)
        {
            callback("Location is not found", undefined)
        }
        else if(body.results.length ===0 || body.results === undefined)
        {
            callback("No Result found for this location", undefined)
        }   
        else
        {
            callback(undefined, {
                latitude : body.results[0].position.lat,
                longitude : body.results[0].position.lon,
                location : body.results[0].address.municipality
            })
        }
    })
}

module.exports = geocode