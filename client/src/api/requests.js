const requests = {
    allGenres:`/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
    trendingMovies:`/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
    topRatedMovies:`/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
    actionMovies:`/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=28`,
    comedyMovies:`/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=35`,
    dramaMovies:`/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=18`,
    horrorMovies:`/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=27`,
    romanceMovies:`/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=10749`,
    scifiMovies:`/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=878`,
    moviesByGenre:`/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=`,
    custom: `?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
}


export default requests;

