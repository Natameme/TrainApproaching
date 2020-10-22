//MBTA API Link
const api_url = 'https://api-v3.mbta.com/vehicles?filter[route]=CR-Worcester&include=stop';
//Pulls train data from MBTA
async function getTrain()
	{
	const response = await fetch (api_url);
	const Tdata = await response.json();
//pulls vehicle number, next stop, and vehicle direction
		for(i=0;i<=4;i++)
		{
		const stops = Tdata.included[i].id;
		const dir =  Tdata.data[i].attributes.direction_id;
		var inf = stops + ' ' + dir;
//Prints Data to Console
		console.log(inf);
//Conditional Logic to see if there is a Train Approaching
			switch(inf)
			{
				case "Boston Landing O":
				console.log('Train Approaching Outbound');
				
				break;
				case "Yawkey 1":
				console.log('Train Approaching Inbound');
				break;
				default:
				null
			}
		}
	}

	setInterval(getTrain(),3000);
