const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const orderRouter = require('./routes/order');
const cartRouter = require('./routes/cart');

// const mongoose = require('mongoose');

// const url = 'mongodb://localhost:27017/chankee';
// const connect = mongoose.connect(url, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   });

// connect.then(() => console.log('Connected correctly to server'),
//     err => console.log(err)
// );

const app = express();
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/order', orderRouter);
app.use('/cart', cartRouter);

// app.use(logger('dev'));

//for css and img folder
app.use(express.static(path.join(__dirname, 'public')));



app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
});