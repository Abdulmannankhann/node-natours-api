const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/usersRoutes');
const AppError = require("./utils/appError")
const globalErrorHandler = require("./controllers/errorController")

const app = express();

//1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers)
  next();
});

//ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`,404));
});

app.use(globalErrorHandler);

module.exports = app;
