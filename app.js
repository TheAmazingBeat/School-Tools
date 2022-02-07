const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/favicon.ico', function (req, res) {
	res.sendFile(__dirname + '/favicon.ico');
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/prioritizer', function (req, res) {
	res.sendFile(__dirname + '/public/src/prioritizer.html');
});

app.get('/calculator', function (req, res) {
	res.sendFile(__dirname + '/public/src/calculator.html');
});

app.get('/planner', function (req, res) {
	res.sendFile(__dirname + '/public/src/planner.html');
});

const port = 5000;
app.listen(process.env.PORT || port, function () {
	console.log(`Server is running at http://localhost:${port}`);
});
