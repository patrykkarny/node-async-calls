const request = require('request');
const axios = require('axios');

const API_KEY = '128021562d57fd2bb7ed903b313a4ab3';

const getWeatherRequest = ({ latitude, longitude }) => new Promise((resolve, reject) => {
  request({
    url: `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`,
    json: true,
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      resolve({
        temperature: body.currently.temperature,
      });
    } else {
      reject('Unable to fetch weather');
    }
  })
});

const getWeather = ({ latitude, longitude }) =>
  axios.get(`https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`)
    .then((response) => ({
      temperature: response.data.currently.temperature,
    }));

module.exports = {
  getWeatherRequest,
  getWeather,
}