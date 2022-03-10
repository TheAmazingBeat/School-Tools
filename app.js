const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/favicon.ico', (req, res) => {
	res.sendFile(__dirname + '/favicon.ico');
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/prioritizer', (req, res) => {
	res.sendFile(__dirname + '/public/pages/prioritizer.html');
});

app.get('/calculator', (req, res) => {
	res.sendFile(__dirname + '/public/pages/calculator.html');
});

app.get('/planner', (req, res) => {
	res.sendFile(__dirname + '/public/pages/planner.html');
});

app.get('/essay-counter', (req, res) => {
	res.sendFile(__dirname + '/public/pages/writing-counter.html');
});

const port = 3000;
app.listen(process.env.PORT || port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

//TODO Get Calendar Holidays through an API
//TODO Store homeworks in a database and display in Prioritizer when page loads (instead of localStorage)
//TODO Store Events in a database and display in Planner when page loads (instead of localStorage)

// CANVAS LMS
