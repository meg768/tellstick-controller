var sprintf    = require('yow/sprintf');
var random     = require('yow/random');

var isArray    = require('yow/is').isArray;
var isString   = require('yow/is').isString;

var matrix = require('./matrix-64x32.js');

//var tellstick  = require('./tellstick.js');

var x = {
  "yahoo-weather-codes": {
    "code": [
      {
        code: "0",
        description: "tornado"
      },
      {
        code: "1",
        description: "tropical storm"
      },
      {
        code: "2",
        description: "hurricane"
      },
      {
        code: "3",
        description: "severe thunderstorms"
      },
      {
        code: "4",
        description: "thunderstorms"
      },
      {
        code: "5",
        description: "mixed rain and snow"
      },
      {
        code: "6",
        description: "mixed rain and sleet"
      },
      {
        code: "7",
        description: "mixed snow and sleet"
      },
      {
        code: "8",
        description: "freezing drizzle"
      },
      {
        code: "9",
        description: "drizzle"
      },
      {
        code: "10",
        description: "freezing rain"
      },
      {
        code: "11",
        description: "showers"
      },
      {
        code: "12",
        description: "showers"
      },
      {
        code: "13",
        description: "snow flurries"
      },
      {
        code: "14",
        description: "light snow showers"
      },
      {
        code: "15",
        description: "blowing snow"
      },
      {
        code: "16",
        description: "snow"
      },
      {
        code: "17",
        description: "hail"
      },
      {
        code: "18",
        description: "sleet"
      },
      {
        code: "19",
        description: "dust"
      },
      {
        code: "20",
        description: "foggy"
      },
      {
        code: "21",
        description: "haze"
      },
      {
        code: "22",
        description: "smoky"
      },
      {
        code: "23",
        description: "blustery"
      },
      {
        code: "24",
        description: "windy"
      },
      {
        code: "25",
        description: "cold"
      },
      {
        code: "26",
        description: "cloudy"
      },
      {
        code: "27",
        description: "mostly cloudy (night)"
      },
      {
        code: "28",
        description: "mostly cloudy (day)"
      },
      {
        code: "29",
        description: "partly cloudy (night)"
      },
      {
        code: "30",
        description: "partly cloudy (day)"
      },
      {
        code: "31",
        description: "clear (night)"
      },
      {
        code: "32",
        description: "sunny"
      },
      {
        code: "33",
        description: "fair (night)"
      },
      {
        code: "34",
        description: "fair (day)"
      },
      {
        code: "35",
        description: "mixed rain and hail"
      },
      {
        code: "36",
        description: "hot"
      },
      {
        code: "37",
        description: "isolated thunderstorms"
      },
      {
        code: "38",
        description: "scattered thunderstorms"
      },
      {
        code: "39",
        description: "scattered thunderstorms"
      },
      {
        code: "40",
        description: "scattered showers"
      },
      {
        code: "41",
        description: "heavy snow"
      },
      {
        code: "42",
        description: "scattered snow showers"
      },
      {
        code: "43",
        description: "heavy snow"
      },
      {
        code: "44",
        description: "partly cloudy"
      },
      {
        code: "45",
        description: "thundershowers"
      },
      {
        code: "46",
        description: "snow showers"
      },
      {
        code: "47",
        description: "isolated thundershowers"
      },
      {
        code: "3200",
        description: "not available"
      }
    ]
  }
}
var WeatherAnimation = module.exports = function(matrix) {



	function fetchWeather() {

		return new Promise(function(resolve, reject) {
			console.log('fetching w');
			var Gopher = require('yow/gopher');
			var yahoo      = new Gopher('https://query.yahooapis.com');

			var query = {};

			query.q        = 'select * from weather.forecast where woeid = 897819 and u="c"';
			query.format   = 'json';
			query.callback = '';

			yahoo.get('v1/public/yql', {query:query}).then(function(data) {
				var channel = data.query.results.channel;
				var condition = channel.item.condition;
				var forecast = channel.item.forecast;
				console.log(forecast[1]);
				resolve(channel);

			})

			.catch (function(error) {
				reject(error);
			});

		});

	}

	matrix.socket.on('connect', function() {
		var icon = '\uf002';
		icon += '\uf000' + ' ';
		icon += '\uf001' + ' ';
		icon += '\uf002' + ' ';
		icon += '\uf003' + ' ';
		icon += '\uf004' + ' ';
		icon += '\uf005' + ' ';
		icon += '\uf006' + ' ';
		icon += '\uf007' + ' ';
		icon += '\uf008' + ' ';
		icon += '\uf009' + ' ';
		icon += '\uf03c' + ' ';
//		icon = "\f0b9";
		matrix.emit('text', {text:icon, textColor:'blue', fontSize:22, fontName:'Weather'});
	});
	fetchWeather().then(function() {

	})
	.catch(function(error){
		console.log(error);
	});

};

new WeatherAnimation(matrix);