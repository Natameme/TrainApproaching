//MBTA API Link
const api_url = 'https://api-v3.mbta.com/vehicles?filter[route]=CR-Worcester&include=stop';
//pulls data, and length of index (# of trains on the line)
async function getTrain(){
  const response = await fetch (api_url);
  const Tdata = await response.json();
  const L = Tdata.included.length;
  const J = L-1;


var Tstatus = ['']; /*stores output of loop*/

//loop pulls train status, stop, and direction for each train, J is L-1 (# of trains on the line) which dictates how many time the loop repeats
    for(i=0;i<=J;i++){
          var lt =  Tdata.data[i].attributes.latitude;
          var ln =  Tdata.data[i].attributes.longitude;
          var coor = lt + ' ' + ln;
          Tstatus.push(coor);
          }

      //Logs status of trains into HTML element
      console.log(Tstatus);





}
getTrain();
setInterval(function(){getTrain();}, 5000);

//Math Code lifted from user Neuron on Stack Overflow
//https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1);
      var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in km
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }
