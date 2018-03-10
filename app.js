const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const { argv } = require('./commands');

(async () => {
  try {
    const responseAddress = await geocode.getGeocode(argv.address);
    const responseWeather = await weather.getWeather(responseAddress);
  
    console.log(`Actual temperature in ${responseAddress.address} - ${responseWeather.temperature} F`);
  } catch (e) {
    return (
      e.code === 'ENOTFOUND'
        ? console.log('Unable to connect to API.')
        : console.log(e.message)
    );
  }
})();
