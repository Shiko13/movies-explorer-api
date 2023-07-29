const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(err.statusCode).send({
    message: statusCode === 500 ? 'Ошибка на сервере' : message,
  });

  next();
};

module.exports = errorHandler;
