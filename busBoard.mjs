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
let searchRadius = "500";

async function findCoordinate(userPostCode){
    
    const postCodeResponse = await fetch(`https://api.postcodes.io/postcodes/${userPostCode}`);
    const coordData = await postCodeResponse.json();

    // const userLon = coordData.result.longitude;
    // const userLat = coordData.result.latitude;
    const retrievedCoords = {
        userLon: coordData.result.longitude,
        userLat: coordData.result.latitude,
    };
    return retrievedCoords;
    
}

const userCoords = findCoordinate(userPostCode);

console.log(userCoords);