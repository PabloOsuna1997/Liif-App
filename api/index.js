const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
let jsonProviders = require('./providers.json');
let jsonAlChilazo = require('./AlChilazo.json');
let jsonCreditosYa = require('./creditosya.json');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.set('port', process.env.PORT || 3000);


app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(jsonProviders));
});
app.get('/alchilazo', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(jsonAlChilazo));
});
app.get('/creditosya', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(jsonCreditosYa));
});

app.listen(app.get('port'), () => {
    console.log("app running in port ", app.get('port'))
})