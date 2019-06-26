const request=require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicG9vbmFtbSIsImEiOiJjangxZ2E1ZmUwMWR4NDhtZHRydDR6aXIwIn0.0lhEvUD48E__6TDEA5vVZA'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to location service!', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location .try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports=geocode