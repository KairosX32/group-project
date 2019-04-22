const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const server = 'ds015995.mlab.com:15995';
const database = 'exodus';
const user = 'exod';
const password = 'password1';

mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, { useNewUrlParser: true })
.then(()=> {
    console.log("Connected to database successfully!");
}).catch(() => {
    console.log("Failed to connect to database!");
});
mongoose.set('useFindAndModify', false);