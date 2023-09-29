const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned CoordsIP:' , ip);
// });


///////

// const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   // success, print out the deets!
//   printPassTimes(passTimes);
// });


//Test code for fetch cords
fetchCoordsByIP("75.158.146.3", (error, coords) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("My coordinates are:", coords);
  }
});


fetchISSFlyOverTimes({ latitude: 53.544389, longitude: -113.4909267 }, (error, coords) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("My passes:", coords);
  }
});



// module.exports = { fetchMyIP, fetchCoordsByIP };

// Testing code
// fetchCoordsByIP((error, ip) => {
//   if (error) {
//     console.error("Error:", error);
//   } else {
//     console.log("My IP address is:", ip);
//   }
// });