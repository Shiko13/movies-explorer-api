const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateCreationUser, validateSignIn } = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');

const userRoutes = require('./users');
const movieRoutes = require('./movies');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', validateSignIn, login);
router.post('/signup', validateCreationUser, createUser);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('*', () => {
  throw new NotFoundError('Этой страницы пока не существует');
});

module.exports = router;
