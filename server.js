// dependencies
const express = require('express');
const PORT = process.env.port || 3001;
const app = express();

// links to routes
const html = ('./routes/html');
const api = ('./routes/api');

// middleware
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