const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.static('public'));

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

const port = 3000;
app.listen(process.env.PORT || port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

//TODO Get Calendar Holidays through an API
//TODO Store homeworks in a database and display in Prioritizer when page loads (instead of localStorage)
//TODO Store Events in a database and display in Planner when page loads (instead of localStorage)

// CANVAS LMS
const canvas_user_token = '5604~bGH7g0L4oUWTCVag0m4DmZ9FpIokztG3c0OBvHyAZz5v7m2p8Y3N3QVYISecfqsK';
const course_id = 73509;
app.get('/poop', (req, res) => {
	const URL = `https://garlandisd.instructure.com/api/v1/courses/${course_id}/assignments?access_token=${canvas_user_token}`;
	axios
		.get(URL)
		.then((response) => {
			console.log(response);
			res.send(response);
		})
		.catch((err) => {
			console.log(err);
		});
});
