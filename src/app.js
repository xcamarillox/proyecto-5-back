const express = require('express');
const axios = require('axios').default;
const app = express();
const APP_API_KEY = process.env.API_KEY_MOVIEDB;

app.get('', function(req, res) {
    res.send('Hello World');
})


app.get('/api', async(req, res) => {
    const endpointPrefix = `https://api.themoviedb.org/3`
    const endpointSuffix = `&language=en-US&page=1&include_adult=false`
    let endpointFull = `${endpointPrefix}/trending/movie/week?api_key=${APP_API_KEY + endpointSuffix}`
    try {
        const response = await axios.get(endpointFull);
        console.log("Data fetched OK");
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.send("Error");
    }
})

var server = app.listen(3000, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})