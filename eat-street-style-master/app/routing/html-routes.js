var path = require('path');

module.exports = function (app) {

    app.get('/restaurants', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/restaurants.html'));
    }); 

    app.use( function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    });
}