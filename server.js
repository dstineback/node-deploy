'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const errorHandler = require(__dirname + '/lib/error_handling');

const dbPort = process.env.MONGODB_URI || 'mongodb://localhost/dev_db';
console.log('dbPort', dbPort);
mongoose.connect(dbPort);

const dogRouter = require(__dirname + '/routes/dog-route');
const catRouter = require(__dirname + '/routes/cat-route');
// const ageRouter = require(__dirname + '/routes/age');

app.use(morgan('dev'));
app.use('/dogs', dogRouter);
app.use('/cats', catRouter);
// app.use('/age', ageRouter);

app.use(errorHandler);

app.use((req, res)=> {
  res.status(404).json({msg: 'page not found test'});
});
app.listen(process.env.PORT || 3000, () => console.log('server is up on ' + process.env.PORT || 3000));
