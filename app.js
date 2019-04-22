const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const path = require('path');
require('./db/mongoose');

const publicDir = path.join(__dirname, '/public/');

const routes = require('./routes/leads');
const rIndex = require('./routes/routesIndex');
const tasksRoute = require('./routes/tasks');


//CORS Code added by Greg
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 
    'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(express.static(publicDir));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


routes(app);
rIndex(app);
tasksRoute(app);




app.listen(`${port}`);
console.log(`The server is running on port ${port}...`);


module.exports = app;





