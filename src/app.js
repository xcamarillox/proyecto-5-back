const express = require('express');
const { getAPIdata, ACTIONS_LIST } = require('./api-helpers');
const app = express();

app.get('', function(req, res) {
    res.send('Hello World');
})

const handleFullfilledRequest = (res, isRequestSuccesful, response) => {
    if (isRequestSuccesful) res.send(response.data)
    else res.send("Error")
}

app.get('/trending/movie/week', async(req, res) => {
    let isRequestSuccesful = false;
    let response;
    try {
        response = await getAPIdata({
            type: ACTIONS_LIST.SEARCH_TRENDS
        });
        isRequestSuccesful = true;
    } catch (error) { response = error; }
    handleFullfilledRequest(res, isRequestSuccesful, response)
})

app.get('/search/:searchParam', async(req, res) => {
    let isRequestSuccesful = false;
    let response;
    try {
        response = await getAPIdata({
            type: req.params.searchParam == 'movie' ? ACTIONS_LIST.SEARCH_FOR_MOVIES : ACTIONS_LIST.SEARCH_FOR_ARTIST,
            searchedMovie: req.query.query,
            searchedArtist: req.query.query
        });
        isRequestSuccesful = true;
    } catch (error) { response = error; }
    handleFullfilledRequest(res, isRequestSuccesful, response)
})

app.get('/movie/:movieId', async(req, res) => {
    let isRequestSuccesful = false;
    let response;
    try {
        response = await getAPIdata({
            type: ACTIONS_LIST.SEARCH_FOR_MOVIE_DETAILS,
            movieId: req.params.movieId
        });
        isRequestSuccesful = true;
    } catch (error) { response = error; }
    handleFullfilledRequest(res, isRequestSuccesful, response)
})

app.get('/movie/:movieId/credits', async(req, res) => {
    let isRequestSuccesful = false;
    let response;
    try {
        response = await getAPIdata({
            type: ACTIONS_LIST.SEARCH_FOR_MOVIE_CREDITS,
            movieId: req.params.movieId
        });
        isRequestSuccesful = true;
    } catch (error) { response = error; }
    handleFullfilledRequest(res, isRequestSuccesful, response)
})

app.get('/person/:artistId', async(req, res) => {
    let isRequestSuccesful = false;
    let response;
    try {
        response = await getAPIdata({
            type: ACTIONS_LIST.GET_ARTIST_DATA,
            artistId: req.params.artistId
        });
        isRequestSuccesful = true;
    } catch (error) { response = error; }
    handleFullfilledRequest(res, isRequestSuccesful, response)
})

app.get('/person/:artistId/movie_credits', async(req, res) => {
    let isRequestSuccesful = false;
    let response;
    try {
        response = await getAPIdata({
            type: ACTIONS_LIST.GET_FEATURING_MOVIES,
            artistId: req.params.artistId
        });
        isRequestSuccesful = true;
    } catch (error) { response = error; }
    handleFullfilledRequest(res, isRequestSuccesful, response)
})

let server = app.listen(3000, function() {
    let host = server.address().address
    let port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})