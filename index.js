require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
app.set('port', process.env.PORT || 8080);

if (process.env.NODE_ENV == "development") app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/schedules", require("./routes/schedules"));

mongoose.connect(process.env.MONGODB_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose
    .connection
    .once('open', function () {
        console.log("Connect DB Success!");
    })
    .on('error', function (error) {
        console.log(error.stack);
        process.exit(1);
    })
app.listen(app.get('port'), function () {
    console.log(`App listening in port %d`, app.get('port'));
})