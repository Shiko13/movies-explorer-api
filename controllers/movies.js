const mongoose = require('mongoose');
const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const CastError = require('../errors/CastError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getAllMyMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Неверные данные'));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Запрашиваемый фильм не найден');
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('У вас недостаточно прав для удаления данного фильма');
      }
      movie.deleteOne()
        .then(() => res.send({ movie }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Не удаётся считать id'));
      } else {
        next(err);
      }
    });
};
