if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI: 'mongodb://mlab-0database:U8b*v2bA2npL8OMKDBZPrzNMqr^GwVX@ds113122.mlab.com:13122/production'}
} else {
    module.exports = {mongoURI: 'mongodb://users:users1@ds139775.mlab.com:39775/custinfo'}
}