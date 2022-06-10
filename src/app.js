const express = require('express');
const { getAPIdata, ACTIONS_LIST } = require('./api-helpers');
const app = express();

const handleRequest = async(res, action) => {
    let response;
    let isRequestSuccesful = false;
    try {
        response = await getAPIdata(action);
        isRequestSuccesful = true;
    } catch (error) { response = error; }
    if (isRequestSuccesful) res.send(response.data)
    else res.send("Error")
}

app.get('/trending/movie/week', async(req, res) => {
    await handleRequest(res, {
        type: ACTIONS_LIST.SEARCH_TRENDS
    })
})

app.get('/search/:searchParam', async(req, res) => {
    await handleRequest(res, {
        type: req.params.searchParam == 'movie' ?
            ACTIONS_LIST.SEARCH_FOR_MOVIES : ACTIONS_LIST.SEARCH_FOR_ARTIST,
        searchedMovie: req.query.query,
        searchedArtist: req.query.query
    });
})

app.get('/movie/:movieId', async(req, res) => {
    await handleRequest(res, {
        type: ACTIONS_LIST.SEARCH_FOR_MOVIE_DETAILS,
        movieId: req.params.movieId
    })
})

app.get('/movie/:movieId/credits', async(req, res) => {
    await handleRequest(res, {
        type: ACTIONS_LIST.SEARCH_FOR_MOVIE_CREDITS,
        movieId: req.params.movieId
    })
})

app.get('/person/:artistId', async(req, res) => {
    await handleRequest(res, {
        type: ACTIONS_LIST.GET_ARTIST_DATA,
        artistId: req.params.artistId
    })
})

app.get('/person/:artistId/movie_credits', async(req, res) => {
    await handleRequest(res, {
        type: ACTIONS_LIST.GET_FEATURING_MOVIES,
        artistId: req.params.artistId
    })
})

app.get('*', (req, res) => { res.send("URL not a valid as a Endpoint") })

let server = app.listen(3000, function() {
    let host = server.address().address
    let port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})