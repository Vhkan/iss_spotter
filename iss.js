const request = require('request');

//Implement the fetchMyIP function, using request to fetch the IP
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const apiUrl = `https://api.ipify.org?format=json`;

  // Making a GET request
  request(apiUrl, (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // Parse the JSON data from the response body
    const data = JSON.parse(body);

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    //pass the IP address to the callback if everything is ok
    const ip = data.ip;
    callback(null, ip);
  });
};

//make the request to the API, and have it pass back the relevant (lat/lng) data as an object via callback.
const fetchCoordsByIP = function(ip, callback) {
  // use request to fetch IP address from JSON API
  const apiUrl2 = `http://ipwho.is/${ip}`;

  // Making a GET request
  request(apiUrl2, (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // Parse the JSON data from the response body
    const parsedBody = JSON.parse(body);

    // Check for latitude and longitude in server responce
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = parsedBody;

    callback(null, { latitude, longitude });
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };





// //Test code for fetch cords
// fetchCoordsByIP("75.158.146.3", (error, coords) => {
//   if (error) {
//     console.error("Error:", error);
//   } else {
//     console.log("My coordinates are:", coords);
//   }
// });

// module.exports = { fetchMyIP, fetchCoordsByIP };

// // Testing code
// fetchCoordsByIP((error, ip) => {
//   if (error) {
//     console.error("Error:", error);
//   } else {
//     console.log("My IP address is:", ip);
//   }
// });
