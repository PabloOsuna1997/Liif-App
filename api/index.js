const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
let jsonProviders = require('./providers.json');
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

app.listen(app.get('port'), () => {
    console.log("app running in port ", app.get('port'))
})