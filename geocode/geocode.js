const request = require('request');
const axios = require('axios');

const geocodeAddress = address => new Promise((resolve, reject) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
    json: true,
  }, (error, response, body) => {
    if (error) {
      reject('Unable to connect to Google results');
    } else if (body.status === 'ZERO_RESULTS') {
      reject('Unable to find address');
    } else if (body.status === 'OK') {
      resolve({
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng,
      });
    }
  })
});

const getGeocode = address =>
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`)
    .then((response) => {
      if (!response.data.results.length) {
        throw new Error('Unable to find address')
      }

      return {
        address: response.data.results[0].formatted_address,
        latitude: response.data.results[0].geometry.location.lat,
        longitude: response.data.results[0].geometry.location.lng,
      };
    });

module.exports = {
  geocodeAddress,
  getGeocode,
};