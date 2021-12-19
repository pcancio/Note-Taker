// dependencies
const express = require('express');
const PORT = process.env.port || 3001;
const app = express();
const html = require('./routes/html');
const api = require('./routes/api');

// use 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// use routes
app.use('/api', api);
app.use('/', html);

// listen
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});