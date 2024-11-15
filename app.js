const express = require('express')
// const axios = require('axios');

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/favicon.ico', (req, res) => {
    res.sendFile(__dirname + '/favicon.ico')
})

const user = {
    userName: '',
    plannerEvents: [],
    homeworks: [],
    completedHW: 0,
}

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html');
    res.render('index', {
        pageTitle: 'Dashboard',
        userName: user.userName,
        completedHW: user.completedHW,
        events: user.plannerEvents,
        homeworks: user.homeworks,
    })
})

app.get('/prioritizer', (req, res) => {
    // res.sendFile(__dirname + '/public/pages/prioritizer.html');
    res.render('prioritizer', {
        pageTitle: 'Prioritizer',
        userName: user.userName,
    })
})

app.get('/calculator', (req, res) => {
    // res.sendFile(__dirname + '/public/pages/calculator.html');
    res.render('calculator', {
        pageTitle: 'Calculator',
        userName: user.userName,
    })
})

app.get('/planner', (req, res) => {
    // res.sendFile(__dirname + '/public/pages/planner.html');
    res.render('planner', {
        pageTitle: 'Planner',
        userName: user.userName,
    })
})

app.get('/writing-counter', (req, res) => {
    // res.sendFile(__dirname + '/public/pages/writing-counter.html');
    res.render('writing-counter', {
        pageTitle: 'Writing Counter',
        userName: user.userName,
    })
})

app.get('/timer', (req, res) => {
    res.render('timer', {
        pageTitle: 'Timer',
        userName: '',
    })
})

app.get('/snake', (req, res) => {
    res.render('snake', {
        pageTitle: 'Snake',
        userName: user.userName,
    })
})

const port = 3000
app.listen(process.env.PORT || port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

//TODO Get Calendar Holidays through an API
//TODO Store homeworks in a database and display in Prioritizer when page loads (instead of localStorage)
//TODO Store Events in a database and display in Planner when page loads (instead of localStorage)

// CANVAS LMS
