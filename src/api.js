var _ = require('lodash');
var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=42fb88b9eef1d5a3f89185bf7859b76a'

var kelvinToC= function(kelvin) {
  return Math.round(kelvin - 273.15) + ' ºC '
};

var kelvinToF= function(kelvin) {
  return Math.round((kelvin - 273.15)*1.8 + 32) + ' ºF '
};

module.exports = function(latitude, longitude) {
  var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`

  return fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      return {
        city: json.name,
        F: kelvinToF(json.main.temp),
        C: kelvinToC(json.main.temp),
        description: _.capitalize(json.weather[0].description)
      }
    });
}