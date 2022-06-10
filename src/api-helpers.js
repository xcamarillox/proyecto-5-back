const axios = require('axios').default;
const APP_API_KEY = process.env.API_KEY_MOVIEDB;

const ACTIONS_LIST = {
    SEARCH_TRENDS: 1,
    GET_ARTIST_DATA: 2,
    SEARCH_FOR_ARTIST: 3,
    SEARCH_FOR_MOVIES: 4,
    GET_FEATURING_MOVIES: 5,
    SEARCH_FOR_MOVIE_DETAILS: 6,
    SEARCH_FOR_MOVIE_CREDITS: 7,
}

const getAPIdata = async(action) => {
    const endpointPrefix = `https://api.themoviedb.org/3`;
    const endpointSuffix = `&language=en-US&page=1&include_adult=false`;
    let endpointFull;
    if (action.type == ACTIONS_LIST.SEARCH_TRENDS) {
        endpointFull = `${endpointPrefix}/trending/movie/week?api_key=${APP_API_KEY + endpointSuffix}`
    } else if (action.type == ACTIONS_LIST.SEARCH_FOR_MOVIES) {
        endpointFull = `${endpointPrefix}/search/movie?query=${action.searchedMovie}&api_key=${APP_API_KEY + endpointSuffix}`
    } else if (action.type == ACTIONS_LIST.SEARCH_FOR_ARTIST) {
        endpointFull = `${endpointPrefix}/search/person?query=${action.searchedArtist}&api_key=${APP_API_KEY + endpointSuffix}`
    } else if (action.type == ACTIONS_LIST.SEARCH_FOR_MOVIE_DETAILS) {
        endpointFull = `${endpointPrefix}/movie/${action.movieId}?api_key=${APP_API_KEY + endpointSuffix}`
    } else if (action.type == ACTIONS_LIST.SEARCH_FOR_MOVIE_CREDITS) {
        endpointFull = `${endpointPrefix}/movie/${action.movieId}/credits?api_key=${APP_API_KEY + endpointSuffix}`
    } else if (action.type == ACTIONS_LIST.GET_ARTIST_DATA) {
        endpointFull = `${endpointPrefix}/person/${action.artistId}?api_key=${APP_API_KEY + endpointSuffix}`
    } else if (action.type == ACTIONS_LIST.GET_FEATURING_MOVIES) {
        endpointFull = `${endpointPrefix}/person/${action.artistId}/movie_credits?api_key=${APP_API_KEY + endpointSuffix}`
    } else throw new Error('Nothing to fetch: no match for action.type');
    return await axios.get(endpointFull);
}

module.exports = { getAPIdata, ACTIONS_LIST };