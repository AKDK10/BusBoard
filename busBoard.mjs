import fetch from "node-fetch";

async function busBoard(){


   
    const busStopCode = "490008660N"; 
    const fetchArrivalData = await fetch(`https://api.tfl.gov.uk/StopPoint/${busStopCode}/Arrivals`);
    const busArrivalInfo = await fetchArrivalData.json();

    //console.log(busArrivalInfo)


    for(let i = 0; i < busArrivalInfo.length; i++){

        const NextBusInfo = busArrivalInfo[i];

        console.log(`Next bus arriving is ${NextBusInfo.lineName} in ${NextBusInfo.timeToStation} seconds `)
    }
}

busBoard()