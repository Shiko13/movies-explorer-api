const router = require('express').Router();
const {
  getAllMyMovies, createMovie, deleteMovieById,
} = require('../controllers/movies');
const { validateCreationMovie, validateMovieId } = require('../middlewares/validation');

router.get('/', getAllMyMovies);
router.post('/', validateCreationMovie, createMovie);
router.delete('/:id', validateMovieId, deleteMovieById);

module.exports = router;
