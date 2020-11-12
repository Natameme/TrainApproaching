//Variable Placeholders
var Tstatus = []; /*stores output of loop*/
var ulat;
var ulon;

//MBTA API Link
//full URL https://api-v3.mbta.com/vehicles?filter[route]=Green-B,Green-C,Green-D,Green-E,Orange,Blue,Red,Mattapan,CR-Worcester,CR-Newburyport,CR-Middleborough,CR-Greenbush,CR-Lowell,CR-Franklin,CR-Fitchburg,CR-Haverhill,CR-Providence
const api_url = 'https://api-v3.mbta.com/vehicles?filter[route]=CR-Worcester';
/*
route IDs
Green-B,Green-C,Green-D,Green-E,Orange,Blue,Red,Mattapan,CR-Worcester,CR-Newburyport,CR-Middleborough,CR-Greenbush,CR-Lowell,CR-Franklin,CR-Fitchburg,CR-Haverhill,CR-Providence
TO ADD: functionality to filter between the different lines
*/

//Gets User GeoLocation using Navigator API
async function getuloc(getTrain){
      if ('geolocation' in navigator) {
        console.log('Geolocation available');
        await navigator.geolocation.getCurrentPosition(function(position) {
      //defines ulat and ulon variables
        let ulat = position.coords.latitude;
        let ulon = position.coords.longitude;
      //logs user lat and lon to console, TO ADD: display this data in HTML element
        console.log(ulat);
        console.log(ulon);
        //var mymap = L.map('mapid').setView([ulat, ulon], 13);     NOT YET FUNCTIONAL information to be used with leaflet.js
        setInterval(function(){getTrain(ulat,ulon)}, 5000);   //calls getTrain TO ADD: interval can be updated more with an API key
        });
      } else {
        document.getElementById("notif").innerHTML = 'geolocation not available';   //Geolocation not available flag TO ADD: ability to pick a spot on the map to track from
      }
}
//Haversine formula, calculates distance between 2 lat lon points
function haversine_distance(lati,loni,ulat,ulon) {
      var R = 637107.10; // Radius of the Earth in meters
      var rlat1 = lati * (Math.PI/180); // Convert degrees to radians
      var rlat2 = ulat * (Math.PI/180); // Convert degrees to radians
      var difflat = rlat2-rlat1; // Radian difference (latitudes)
      var difflon = (ulon-loni) * (Math.PI/180); // Radian difference (longitudes)

      var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      return d;
}
//getTrain Function
async function getTrain(ulat,ulon){
  Tstatus = [];
//fetches data from MBTA API
  const response = await fetch(api_url);
  const Tdata = await response.json();
  const L = Tdata.data.length; //# of trains
  const J = L-1; //index used for loop

  //loop logs data for each train into Tstatus array
    for(i=0;i<=J;i++){
      //vehicle ID
          var vid = Tdata.data[i].relationships.route.data.id;
      //Vehicle latitude
          var lati =  Tdata.data[i].attributes.latitude;
      //Vehicle Longitude
          var loni =  Tdata.data[i].attributes.longitude;
      //Vehicle Bearing
          var headi = Tdata.data[i].attributes.bearing;
      //calls the haversine_distance function to get a distance from user for each train on the network
          var distance = haversine_distance(lati,loni, ulat, ulon);
      //Logs each variable into an array object, which is then added to the Tstatus array
          var coor = {ID: vid , Lat: lati , Lon: loni, Heading: headi, Distance: distance }
          Tstatus.push(coor);

          //conditional logic to determine if a train is nearby
            if(Tstatus[i].Distance <= 100){
              document.getElementById('stat').innerHTML = 'Train Approaching' + Tstatus[i].ID + Tstatus[i].Distance;
              body.style.backgroundColor = (237, 12, 12, 1);
            }else{
              document.getElementById('stat').innerHTML = "No Trains Nearby";
           }
  //end of loop
    }
  //sorts Tstatus by Distance from User TO ADD: different Filtering Methods
    function sortFunction(a, b) {
        if (a.Distance === b.Distance) {
            return 0;
        }
        else {
            return (a.Distance < b.Distance) ? -1 : 1;
        }
    }
  //products of getTrain
    console.log(Tstatus.sort(sortFunction));
    document.getElementById('board0').innerHTML = 'ID: '+Tstatus[0].ID+', Lat: '+Tstatus[0].Lat+', Lon: '+Tstatus[0].Lon+', Heading: '+Tstatus[0].Heading+', Distance: '+Tstatus[0].Distance;
    document.getElementById('board1').innerHTML = 'ID: '+Tstatus[1].ID+', Lat: '+Tstatus[1].Lat+', Lon: '+Tstatus[1].Lon+', Heading: '+Tstatus[1].Heading+', Distance: '+Tstatus[1].Distance;
    document.getElementById('board2').innerHTML = 'ID: '+Tstatus[2].ID+', Lat: '+Tstatus[2].Lat+', Lon: '+Tstatus[2].Lon+', Heading: '+Tstatus[2].Heading+', Distance: '+Tstatus[2].Distance;
    document.getElementById('board3').innerHTML = 'ID: '+Tstatus[3].ID+', Lat: '+Tstatus[3].Lat+', Lon: '+Tstatus[3].Lon+', Heading: '+Tstatus[3].Heading+', Distance: '+Tstatus[3].Distance;
    document.getElementById('board4').innerHTML = 'ID: '+Tstatus[4].ID+', Lat: '+Tstatus[4].Lat+', Lon: '+Tstatus[4].Lon+', Heading: '+Tstatus[4].Heading+', Distance: '+Tstatus[4].Distance;
}

getuloc(getTrain);
