// Import the readline module

//import * as readline from "readline";

//const readline = require('readline-sync');

// import fetch from "node-fetch";

// async function busBoard(){
   
//     const busStopCode = "490008660N"; 
//     const fetchArrivalData = await fetch(`https://api.tfl.gov.uk/StopPoint/${busStopCode}/Arrivals`);
//     const busArrivalInfo = await fetchArrivalData.json();

//     //console.log(busArrivalInfo)


//     for(let i = 0; i < busArrivalInfo.length; i++){

//         const NextBusInfo = busArrivalInfo[i];

//         console.log(`Next bus arriving is ${NextBusInfo.lineName} in ${NextBusInfo.timeToStation} seconds `)
//     }
// }

// busBoard()

// find longitude and latitude
let userPostCode ="n225na";
let searchRadius = "200";

async function findCoordinate(userPostCode){
    
    const postCodeResponse = await fetch(`https://api.postcodes.io/postcodes/${userPostCode}`);
    const coordData = await postCodeResponse.json();

    return {
        userLon: coordData.result.longitude,
        userLat: coordData.result.latitude,
    
    }
    
    
}

const userCoords = await findCoordinate(userPostCode);

console.log(userCoords); 


// find local bus stops 
async function getLocalStopPoints (userCoords, searchRadius){

    const stopPointsResponse = await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${userCoords.userLat}&lon=${userCoords.userLon}&stopTypes=NaptanPublicBusCoachTram&radius=${searchRadius}`)
    const response = await stopPointsResponse.json();
    
    const stopPoints = response.stopPoints

    stopPoints.sort((stopPointA, stopPointB)=> stopPointA.distance - stopPointB.distance);

    return stopPoints;

}

    
    

const localStopPoints = await getLocalStopPoints(userCoords, searchRadius);

console.log(localStopPoints)


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

printClosestArrivals (localStopPoints);