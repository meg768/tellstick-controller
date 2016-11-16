var Schedule   = require('node-schedule');
var sprintf    = require('yow').sprintf;
var random     = require('yow').random;
var suncalc    = require('suncalc');
var tellstick  = require('./tellstick.js');

var Module = function() {

	var _lightSwitch = tellstick.getDevice('FK-01-01');
	var _motionSensor = tellstick.getDevice('RV-01');


	function debug(msg) {
		console.log(msg);
	}

	function getSunTime(name) {
		var suntimes = suncalc.getTimes(new Date(), 55.7, 13.1833333);
		return new Date(suntimes[name]);
	}

	function today() {

		return new Date();
	}

	function turnOnTime() {
		return new Date(getSunTime('sunset').getTime() - 1000 * 60 * 60 * 1);
	}

	function turnOffTime() {
		return random(['01:07', '00:30', '00:50', '01:10']);
	}

	function getOnOffTimes() {

		var times = [
			{state:'ON',  time:turnOnTime()},
			{state:'OFF', time:turnOffTime()}
		];

		return times;
	}

	function listen() {
		_motionSensor.on('ON', function() {

			console.log('Movement in the office...')

			// Make sure we don't get too many events at once
			_motionSensor.pauseEvents(2000);

			var matrix = require('./matrix-32x32.js');

			matrix.emit('emoji', {id:random(1, 846), priority:'!'});

		});

	}


	function run() {

		console.log('Office active.');

		tellstick.socket.once('connect', function() {

			function setupTimer() {
				_lightSwitch.setTimer(getOnOffTimes());
			}

			var rule    = new Schedule.RecurrenceRule();
			rule.hour   = 0;
			rule.minute = 0;

			Schedule.scheduleJob(rule, function() {
				setupTimer();
			});

			setupTimer();

			listen();

		});

	}

	run();
}

module.exports = new Module();
