const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const moment = require('moment')

const app = express()
const port = 5000

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));



app.use(expressLayouts)
app.set('layout','./layouts/default')
app.set('view engine', 'ejs')

function getCurrentTimeToString() {
    const d = new Date();
    let day = d.getDay();
    return day;
}

function getDiff(moment) {
    var x = moment().diff(moment().day('7').hour(9).minute(0).second(0), 'milliseconds');
    var y = moment().valueOf();
    return -x+y;
}

function getClosingHour(moment) {  // i will add the closing hour to the moment later i could not find a way to do it for every day.
    var hour = moment().hour(17).minute(0).second(0);
    return hour;
}


app.get('/', (req, res, next) => {
    req.day = getCurrentTimeToString();
    req.time = getDiff(moment);
    next();
}, (req, res) => {
    if (req.day == 1 || req.day == 2 || req.day == 3 || req.day == 4 || req.day == 5) {
        res.render('index', { title: "Home" })
    } else 
        if (req.day == 6 || req.day == 7) {
            app.set('layout', './timer.ejs')
            res.render('timer', {title: getDiff(moment) })
        }
        
}
)

app.get('/Services', (req, res) => {
    res.render('OurServices', {title : "Our Services"})
})

app.get('/Contact', (req, res) => {
    res.render('Contact', {title : "Contact Us"})
})
app.post('/Contact', (req, res) => {
    res.render('Contact', { title: "Contact Us" })
})

app.listen(port, () => console.info(`App listening on port ${port}`))