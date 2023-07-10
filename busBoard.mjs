// Import fetch module to retrieve API Data
import fetch from "node-fetch";
// Import readline-sync to get user input
import * as readline_sync from "readline-sync";
// Import winston for error logging and create logger
import * as winston from "winston";
const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' })
    ]
});


async function busBoard(){
    // find longitude and latitude
    let userPostCode = readline_sync.question("Please enter a London Postcode: ");
    // let userPostCode = "n225na";
    let searchRadius = "200";

    const userCoords = await findCoordinates(userPostCode);
    const localStopPoints = await getLocalStopPoints(userCoords, searchRadius);

    printClosestArrivals (localStopPoints);
}


async function findCoordinates(userPostCode){
    
    const postCodeResponse = await fetch(`https://api.postcodes.io/postcodes/${userPostCode}`);
    const coordData = await postCodeResponse.json();

    return {
        userLon: coordData.result.longitude,
        userLat: coordData.result.latitude,
    }
}


// find local bus stops 
async function getLocalStopPoints (userCoords, searchRadius){

    const stopPointsResponse = await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${userCoords.userLat}&lon=${userCoords.userLon}&stopTypes=NaptanPublicBusCoachTram&radius=${searchRadius}`)
    const response = await stopPointsResponse.json();
    
    const stopPoints = response.stopPoints

    stopPoints.sort((stopPointA, stopPointB)=> stopPointA.distance - stopPointB.distance);

    return stopPoints;

}


//Print arrivals for 3 closest stops
async function printClosestArrivals (localStopPoints){
    
    for (let i =0; i < localStopPoints.length && i<3; i++){

        const fetchArrivalData = await fetch(`https://api.tfl.gov.uk/StopPoint/${localStopPoints[i].naptanId}/Arrivals`);
        const busArrivalInfo = await fetchArrivalData.json();



        for(let j = 0; j < busArrivalInfo.length; j++){

            const NextBusInfo = busArrivalInfo[j];

            console.log(`Next bus arriving is ${NextBusInfo.lineName} in ${NextBusInfo.timeToStation} seconds `)
        }
    }

}

busBoard();