//Variable Placeholders
var Tstatus = []; /*stores output of loop*/
var Tdist = [];
var Tlength;
var ucoor = [];
var ulat;
var ulon;



//MBTA API Link
const api_url = 'https://api-v3.mbta.com/vehicles?filter[route]=Green-B,Green-C,Green-D,Green-E,Orange,Blue,Red,Mattapan,CR-Worcester,CR-Newburyport,CR-Middleborough,CR-Greenbush,CR-Lowell,CR-Franklin,CR-Fitchburg,CR-Haverhill,CR-Providence';
/*
route IDs
Green-B,Green-C,Green-D,Green-E,Orange,Blue,Red,Mattapan,CR-Worcester,CR-Newburyport,CR-Middleborough,CR-Greenbush,CR-Lowell,CR-Franklin,CR-Fitchburg,CR-Haverhill,CR-Providence
*/

//GetUserLocation
function getuloc(callback){
      if ('geolocation' in navigator) {
        console.log('Geolocation available');
        navigator.geolocation.getCurrentPosition(function(position) {
        let ulat = position.coords.latitude;
        let ulon = position.coords.longitude;
        console.log(ulat);
        console.log(ulon);
        var mymap = L.map('mapid').setView([ulat, ulon], 13);
        setInterval(callback(ulat,ulon), 5000);
        });

      } else {
        document.getElementById("notif").innerHTML = 'geolocation not available';
          }

  }
//Haversine formula, calculates distance between 2 latlon points
function haversine_distance(lat1,lon1,lat2,lon2) {
      var R = 637107.10; // Radius of the Earth in meters
      var rlat1 = lat1 * (Math.PI/180); // Convert degrees to radians
        var rlat2 = lat2 * (Math.PI/180); // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (lon2-lon1) * (Math.PI/180); // Radian difference (longitudes)

        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        return d;
      }

//getTrain Function
async function getTrain(ulat,ulon){
  const response = await fetch(api_url);
  const Tdata = await response.json();
  const L = Tdata.data.length;
  const J = L-1;
/*loop pulls train status, stop, and direction
for each train, J is L-1 (# of trains on the line)
which dictates how many time the loop repeats*/

    for(i=0;i<=J;i++){
      //vehicle ID call
          var vid = Tdata.data[i].relationships.route.data.id;
          var lati =  Tdata.data[i].attributes.latitude;
          var loni =  Tdata.data[i].attributes.longitude;
          var headi = Tdata.data[i].attributes.bearing;
          var distance = haversine_distance(lati,loni, ulat, ulon);
          var coor = {ID: vid , Lat: lati , Lon: loni, Heading: headi, Distance: distance }
          Tstatus.push(coor);

        //conditional logic
          if(Tstatus[i].Distance <= 50){
            alert('Train Approaching' + Tstatus[i].ID)
            document.getElementById('stat').innerHTML = "Train Approaching";
            document.getElementById('notif').innerHTML = (Tstatus[i].Distance);
          }else{
            document.getElementById("stat").innerHTML = "No Trains Nearby";
               }
          }

          //products of getTrain
          console.log(Tstatus);
}

getuloc(getTrain);
