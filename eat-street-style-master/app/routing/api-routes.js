var EatStreet = require('eatstreet');
var ES = new EatStreet("c013f8582019268b");

var reverse = require('reverse-geocode');

module.exports = function (app) {

    app.get('/api/restlist/:latitude/:longitude', function (req, res) {
        // zip = process.argv[2] === undefined ? '20005' : process.argv[2];
        var searchWord = "";
        var lat = req.params.latitude;
        var long = req.params.longitude;
        console.log("lat: " + lat + "   long: " + long);
        addrJSON = reverse.lookup(lat, long, 'us');
        
        //console.log(addrJson.zipcode);
        zip = addrJSON.zipcode;

        // if reverse.lookup didn't return a value, default zip to 20005
        if (zip === undefined) {
            zip = '20005'
            console.log("defaulting zip code to 20005");
        }
        var params = {
            address: zip, // Street Address or Zip to Search. 
            radius: 1,
            search: searchWord,  // key word to search can be provided also
        }

        ES.SearchRestaurants(params, function (err, data) {
            if (err) {
                console.log(err);
            }
            var restaurantData = [];
            var eat = data['restaurants'];
            console.log(eat.length);
            restaurantData.push(zip);
            for (var i = 0; i < 5; i++) {
/*                 
                console.log(eat[i].name);
                console.log(eat[i].streetAddress);
                console.log(eat[i].url + "\n");
 */
                var eatResult = {};
                eatResult.restName = eat[i].name;
                eatResult.restAddress = eat[i].streetAddress;
                eatResult.restUrl = eat[i].url;
                //console.log("i : " + i + "   " + eatResult.restName);

                restaurantData.push(eatResult);
            }
            res.json(restaurantData);
            
        });

    });

}