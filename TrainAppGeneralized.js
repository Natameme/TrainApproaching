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
//pulls data, and length of index (# of trains on the line)


function main(){
//getTrain Function
async function getTrain(){
  const response = await fetch (api_url);
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
          var coor = {ID: vid , Lat: lati , Lon: loni, Heading: headi}
          Tstatus.push(coor);
          }
          Tlength = await Tstatus.length;

          //products of getTrain
          console.log(Tstatus);
          console.log(Tlength);
}

getTrain();
//GetUserLocation
function getuloc(){
if ('geolocation' in navigator) {
  console.log('Geolocation available');
  navigator.geolocation.getCurrentPosition(function(position) {
    var ulat = position.coords.latitude;
    var ulon = position.coords.longitude;
    var ucoor = {lat: ulat, lon: ulon};
    console.log(ucoor);
  });
} else {
  console.log('geolocation not available');
}
}

getuloc();

}

main();
//Calculate Distance Between User and Trains
async function getDist() {

      for(k=0; k<Tlength; k++){
      d = Math.sqrt(Math.pow(ulat-Tstatus[k].lat, 2) + Math.cos(Tstatus[k].lat)* Math.pow(ulon-Tstatus[k].lon, 2));
      Tdist.push(d);
    }
    console.log(Tdist);
}

getDist();




////////*THE LAND OF BROKEN CODE*///////
