from . import bp as api
from app.blueprints.auth.authy import token_auth
from flask import request, make_response, g, abort
from flask_login import current_user
from app.models import *
from helpers import require_admin
import requests
import os


@api.get('/movie')
@token_auth.login_required
def get_movies():
    movies = Movie.query.all()
    if not movies:
        abort(404)
    movies_dict = [movie.to_dict() for movie in movies]
    return make_response({"movies":movies_dict}, 200)

@api.get('/movie/trending')
@token_auth.login_required
def get_trending():
    url = f"https://api.themoviedb.org/3/trending/movie/week?api_key={os.getenv('API_KEY')}"
    response = requests.get(url)
    data= response.json()
    return make_response({"data":data}, 200)

@api.get('/movie/toprated')
@token_auth.login_required
def get_toprated():
    url = f"https://api.themoviedb.org/3/movie/top_rated?api_key={os.getenv('API_KEY')}"
    response = requests.get(url)
    data= response.json()
    return make_response({"data":data}, 200)

@api.get('/movie/action')
@token_auth.login_required
def get_action():
    url = f"https://api.themoviedb.org/3/discover/movie?api_key={os.getenv('API_KEY')}&with_genres=28"
    response = requests.get(url)
    data= response.json()
    return make_response({"data":data}, 200)

@api.get('/movie/comedy')
@token_auth.login_required
def get_comedy():
    url = f"https://api.themoviedb.org/3/discover/movie?api_key={os.getenv('API_KEY')}&with_genres=35"
    response = requests.get(url)
    data= response.json()
    return make_response({"data":data}, 200)

@api.get('/movie/drama')
@token_auth.login_required
def get_drama():
    url = f"https://api.themoviedb.org/3/discover/movie?api_key={os.getenv('API_KEY')}&with_genres=18"
    response = requests.get(url)
    data= response.json()
    return make_response({"data":data}, 200)

@api.get('/movie/horror')
@token_auth.login_required
def get_horror():
    url = f"https://api.themoviedb.org/3/discover/movie?api_key={os.getenv('API_KEY')}&with_genres=27"
    response = requests.get(url)
    data= response.json()
    return make_response({"data":data}, 200)

@api.get('/movie/romance')
@token_auth.login_required
def get_romance():
    url = f"https://api.themoviedb.org/3/discover/movie?api_key={os.getenv('API_KEY')}&with_genres=10749"
    response = requests.get(url)
    data= response.json()
    return make_response({"data":data}, 200)

@api.get('/movie/scifi')
@token_auth.login_required
def get_scifi():
    url = f"https://api.themoviedb.org/3/discover/movie?api_key={os.getenv('API_KEY')}&with_genres=878"
    response = requests.get(url)
    data= response.json()
    return make_response({"data":data}, 200)

@api.get('/movie/genre/<int:id>')
@token_auth.login_required
def get_movies_by_genre(id):
    url = f"https://api.themoviedb.org/3/discover/movie?api_key={os.getenv('API_KEY')}&with_genres={id}"
    response = requests.get(url)
    data= response.json()
    return make_response({"data":data}, 200)

@api.get('/movie/tmdb/<int:id>')
@token_auth.login_required
def get_movie_by_tmdb_id(id):
    url = f"https://api.themoviedb.org/3/movie/{id}?api_key={os.getenv('API_KEY')}"
    response = requests.get(url)
    data= response.json()
    return make_response({"data":data}, 200)

@api.get('/movie/cast/<int:id>')
@token_auth.login_required
def get_cast_by_movie(id):
    url = f"https://api.themoviedb.org/3/movie/{id}/credits?api_key={os.getenv('API_KEY')}"
    response = requests.get(url)
    data= response.json()
    return make_response({"data":data}, 200)

@api.get('/movie/providers/<int:id>')
@token_auth.login_required
def get_providers_by_movie(id):
    url = f"https://api.themoviedb.org/3/movie/{id}/watch/providers?api_key={os.getenv('API_KEY')}"
    response = requests.get(url)
    data= response.json()
    return make_response({"data":data}, 200)

@api.get('/movie/reviews/<int:id>')
@token_auth.login_required
def get_reviews_by_movie(id):
    url = f"https://api.themoviedb.org/3/movie/{id}/reviews?api_key={os.getenv('API_KEY')}"
    response = requests.get(url)
    data= response.json()
    return make_response({"data":data}, 200)

@api.get('/movie/search/<string:title>')
@token_auth.login_required
def get_movies_by_search(title):
    url = f"https://api.themoviedb.org/3/search/movie?api_key={os.getenv('API_KEY')}&query={title}"
    response = requests.get(url)
    data= response.json()
    return make_response({"data":data}, 200)

@api.get('/movie/<int:id>')
@token_auth.login_required
def get_movie(id):
    movie = Movie.query.get(id)
    if not movie:
        abort(404)
    movie_dict = movie.to_dict()
    return make_response(movie_dict, 200)

# @api.get('/movie/genre/<int:id>')
# def get_movies_by_genre(id):
#     genre = Genre.query.get(id)
#     if not genre:
#         abort(404)
#     movies_dict = [movie.to_dict() for movie in genre.movies]
#     return make_response({"movies":movies_dict}, 200)

@api.get('/movie/user/<int:id>')
@token_auth.login_required
def get_movies_by_user(id):
    user = User.query.get(id)
    if not user:
        abort(404)
    movies_dict = [movie.to_dict() for movie in user.movies.all()]
    return make_response({"movies":movies_dict}, 200)

@api.get('/movie/watchlist/show/<int:id>')
@token_auth.login_required
def get_wl_by_user(id):
    user = User.query.get(id)
    if not user:
        abort(404)
    movies_dict = [movie.to_dict() for movie in user.watch_list.all()]
    return make_response({"watchlist":movies_dict}, 200)


@api.post('/movie/<int:movie_id>')
@token_auth.login_required
def post_movie_to_user(movie_id):
    if g.current_user.movies.filter(Movie.tmdb_id==movie_id).first():
        return make_response(f'Movie is already is your list', 403)
    existing_movie = Movie.query.filter_by(tmdb_id=movie_id).first()
    if existing_movie:
        g.current_user.add_movie(existing_movie)
        return make_response(f'Movie {existing_movie.title} already exists and was added to your list', 200)
    movie = Movie()
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={os.getenv('API_KEY')}"
    response = requests.get(url)
    data= response.json()
    movie.register(data)
    g.current_user.add_movie(movie)
    movie.save()
    return make_response(f'Movie {movie.title} was created with an id of {movie.id}', 200)

@api.put('/movie/user/<int:movie_id>')
@token_auth.login_required
def remove_movie_from_user(movie_id):
    movie = g.current_user.movies.filter(Movie.tmdb_id==movie_id).first()
    if not movie:
        abort(404)
    g.current_user.remove_movie(movie)
    return make_response(f'Movie {movie.title} was removed from your list', 200)

@api.put('/movie/user')
@token_auth.login_required
def remove_all_movies():
    for movie in g.current_user.movies.all():
        g.current_user.remove_movie(movie)
    return make_response(f'All movies have been removed from your list', 200)

@api.post('/movie')
@token_auth.login_required
@require_admin
def post_movie():
    movie_dict = request.get_json()
    movie = Movie()
    movie.from_dict(movie_dict)
    movie.save()
    return make_response(f'Movie {movie.title} was created with an id of {movie.id}', 200)

@api.put('/movie/<int:id>')
@token_auth.login_required
@require_admin
def put_movie(id):
    movie = Movie.query.get(id)
    if not movie:
        abort(404)
    movie_dict = request.get_json()
    movie.from_dict(movie_dict)
    movie.save()
    return make_response(f'Movie {movie.title} with id {movie.id} has been updated', 200)

@api.delete('/movie/<int:id>')
@token_auth.login_required
@require_admin
def delete_movie(id):
    movie = Movie.query.get(id)
    if not movie:
        abort(404)
    movie.delete()
    return make_response(f'Movie {id} has been deleted', 200)




@api.post('/movie/watchlist/<int:movie_id>')
@token_auth.login_required
def post_movie_to_wl(movie_id):
    if g.current_user.watch_list.filter(Movie.tmdb_id==movie_id).first():
        return make_response(f'Movie is already is your list', 403)
    existing_movie = Movie.query.filter_by(tmdb_id=movie_id).first()
    if existing_movie:
        g.current_user.add_wl(existing_movie)
        return make_response(f'Movie {existing_movie.title} already exists and was added to your Watch list', 200)
    movie = Movie()
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={os.getenv('API_KEY')}"
    response = requests.get(url)
    data= response.json()
    movie.register(data)
    g.current_user.add_wl(movie)
    movie.save()
    return make_response(f'Movie {movie.title} was created with an id of {movie.id}', 200)

@api.put('/movie/watchlist/remove/<int:movie_id>')
@token_auth.login_required
def remove_movie_from_wl(movie_id):
    movie = g.current_user.watch_list.filter(Movie.tmdb_id==movie_id).first()
    if not movie:
        abort(404)
    g.current_user.remove_wl(movie)
    return make_response(f'Movie {movie.title} was removed from your Watch list', 200)

@api.put('/movie/watchlist/clear')
@token_auth.login_required
def remove_all_wl():
    for movie in g.current_user.watch_list.all():
        g.current_user.remove_wl(movie)
    return make_response(f'All movies have been removed from your Watch list', 200)