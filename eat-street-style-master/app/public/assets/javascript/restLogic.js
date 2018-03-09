//
//   .js file invoked by restaurants.html 
//

$(document).ready(function () {

// display spinner with five second fade out to distract from the time it takes to get gps coordinates in the browser, preventing the need to enter zipcode
$(".se-pre-con").fadeOut(5000);

  var lat = 0;
  var long = 0;
  function getLocation() {
    //if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    // } else {
    //x.innerHTML = "Geolocation is not supported by this browser.";
    //    }
    console.log("back here now");
  }
  function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log("SP lat: " + lat);
    console.log("SP long: " + long);
    //alert(" Latitude: " + position.coords.latitude +
     // " Longitude: " + position.coords.longitude);

      var currentURL = window.location.origin;

    $.get('/api/restlist/' + lat + "/" + long, function (restaurantData) {

      //console.log("------------------------------------");
     // console.log("URL: " + currentURL + "/api/restlist");
      //console.log("------------------------------------");
      zip = restaurantData.shift();
      console.log(zip);
      console.log(restaurantData);
      //console.log("------------------------------------");

      $("#zipcode").text(zip); 

      // Loop through and display each of the customers
      for (var i = 0; i < restaurantData.length; i++) {

        // Create the HTML Well (Section) and Add the table content for each reserved table
        var tableSection = $("<div>");
        tableSection.addClass("well");
        tableSection.attr("id", "tableWell-" + i + 1);
        $("#tableSection").append(tableSection);

        var tableNumber = i + 1;

        // Then display the remaining fields in the HTML (Section Name, Date, URL)
        $("#tableWell-" + i + 1).append("<h2><span class='label label-primary'>" + tableNumber + "</span> | " + restaurantData[i].restName + "</h2><p>" + restaurantData[i].restAddress + "</p><a href=" + restaurantData[i].restUrl + " target='_blank'>place an order</a>");
        //<a href="/api/tables">API Table Link</a>
      }
    });
  }

  function restaurantQuery() {

    getLocation();

    console.log("lat: " + lat);
    console.log("long: " + long);

    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    //$.ajax({ url: currentURL + "/api/tables", method: "GET" })
    // .done(function (restaurantData) {
  }
  function clearTable() {

    var currentURL = window.location.origin;
    $.ajax({ url: currentURL + "/api/clear", method: "POST" });
  }

  $("#clear").on("click", function () {
    alert("Clearing...");
    clearTable();

    // Refresh the page after data is cleared
    location.reload();

  });

  restaurantQuery();
});