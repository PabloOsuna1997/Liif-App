const mongoose = require('mongoose');

const urldb = 'mongodb://18.118.253.240/demo-liif';

mongoose.connect(urldb)
    .then(db => console.log('DataBases connected.'))
    .catch(err => console.error(err));


module.exports = mongoose
