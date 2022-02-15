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

const port = 3000;
app.listen(process.env.PORT || port, function () {
	console.log(`Server is running at http://localhost:${port}`);
});

//TODO Get Calendar Holidays through an API
//TODO Store homeworks in a database and display in Prioritizer when page loads (instead of localStorage)
//TODO Store Events in a database and display in Planner when page loads (instead of localStorage)
