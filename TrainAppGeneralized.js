//MBTA API Link
const api_url = 'https://api-v3.mbta.com/vehicles?filter[route]=Green-B,Green-C,Green-D,Green-E,Orange,Blue,Red,Mattapan,CR-Worcester,CR-Newburyport,CR-Middleborough,CR-Greenbush,CR-Lowell,CR-Franklin,CR-Fitchburg,CR-Haverhill,CR-Providence';
/*
route IDs
Green-B,Green-C,Green-D,Green-E,Orange,Blue,Red,Mattapan,CR-Worcester,CR-Newburyport,CR-Middleborough,CR-Greenbush,CR-Lowell,CR-Franklin,CR-Fitchburg,CR-Haverhill,CR-Providence
*/
//pulls data, and length of index (# of trains on the line)
async function getTrain(){
  const response = await fetch (api_url);
  const Tdata = await response.json();
  const L = Tdata.data.length;
  const J = L-1;



var Tstatus = ['']; /*stores output of loop*/

/*loop pulls train status, stop, and direction
for each train, J is L-1 (# of trains on the line)
which dictates how many time the loop repeats*/
    for(i=0;i<=J;i++){
      //vehicle ID call
          var vid = Tdata.data[i].relationships.route.data.id;
          var lati =  Tdata.data[i].attributes.latitude;
          var loni =  Tdata.data[i].attributes.longitude;
          var coor = {ID: vid , Lat: lati , Lon: loni}
          Tstatus.push(coor);
          }

      //Logs status of trains into HTML element
      console.log(Tstatus);

}

getTrain();

//Math Code lifted from user Neuron on Stack Overflow
//https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates

    function getDistanceFromLatLonInKm(lat, lon, Ulat, Ulon) {
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
