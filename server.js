const express = require('express');
const favicon = require('express-favicon');
const mongoose = require('mongoose');
const db = require('./models');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
var survey = require('./routes/survey');
var auth = require('./routes/auth');
const api = require('./routes/api/api-route');
const cors = require('cors');
const connection = mongoose.connection;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(favicon(__dirname + '/build/favicon.ico'));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ecohabit';
mongoose.Promise = require('bluebird');
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	promiseLibrary: require('bluebird')
});

connection.once('open', function callback() {
	console.log('Connected to MongoDB!');
});

app.use(cors());
app.use('/api/survey', survey);
app.use('/api/auth', auth);
app.use(api);

app.use(favicon(__dirname + '/build/favicon.ico'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`🌎 ==> API server now on port ${PORT}!`);
});

//  daily cron job
const CronJob = require('cron').CronJob;
const job = new CronJob('0 1 * * *', function() {
	db.User.find({}, { $set: { dailyCheck: false } });
});

job.start();
