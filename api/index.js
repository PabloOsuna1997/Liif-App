const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
let jsonProviders = require('./providers.json');
let jsonAlChilazo = require('./AlChilazo.json');
let jsonCreditosYa = require('./creditosya.json');
const Credits = require('./models/Credits');
const app = express();

const { mongoose } = require("./config/database");
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

app.post('/addrequest', async (req, res) => {
    const { Cod } = req.body;
    const {  Name, LastName, IdNumber, Gender, Income, Address, Country } = req.body.fieldsValues;
    console.log(req.body)
    try {
        const newCredit = new Credits({
          Cod: Cod,
          Name: Name,
          LastName: LastName,
          IdNumber: IdNumber,
          Gender: Gender,
          Income: Income,
          Address: Address,
          Country: Country
        });
        console.log(newCredit)
        const result = await newCredit.save();
        res.status(200).json({Cod: "Sol-2021XX", id: result._id});
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: "something go wrong" });
      }
});


app.listen(app.get('port'), () => {
    console.log("app running in port ", app.get('port'))
})