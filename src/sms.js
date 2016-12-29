var Schedule   = require('node-schedule');
var sprintf    = require('yow/sprintf');
var random     = require('yow/random');
var Timer      = require('yow/timer');
var tellstick  = require('./tellstick.js');

var Module = module.exports = function() {

	function debug(msg) {
		console.log(msg);
	}


	function sendSMS(text) {
		var sid    = 'AC6d347f8c4600eb938fe37b692c19f018';
		var token  = '9c1471d846f5ad2e8650cba838daa6b7';
		var client = require('twilio')(sid, token);

		var now = new Date();
		var msg = sprintf('%04d-%02d-%02d:%02d:%02d - %s', now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), text);

		var options  = {};
		options.to   = ['+46702262122', '+46706291882'];
		options.from = '+46769447443';
		options.body = msg;

		client.sendSms(options, function(error, message) {
			console.log('Sending SMS:', msg);
		    if (error)
				console.log(error);
		});
	}


	function listen() {
		tellstick.getDevice('RV-01').on('ON', function() {
			// Make sure we don't get too many events at once
			_motionSensor.pauseEvents(30000);
			sendSMS('Rörelse på kontoret!');


		});

		tellstick.getDevice('RV-02').on('ON', function() {
			// Make sure we don't get too many events at once
			_motionSensor.pauseEvents(30000);
			sendSMS('Rörelse i källaren!');


		});

		tellstick.getDevice('RV-02').on('ON', function() {
			// Make sure we don't get too many events at once
			_motionSensor.pauseEvents(30000);
			sendSMS('Rörelse i källaren!');


		});

		tellstick.getDevice('VS-03').on('ON', function() {
			sendSMS('Ljusen tändes i matrummet.');
		});

		tellstick.getDevice('VS-03').on('OFF', function() {
			sendSMS('Ljusen släcktes i matrummet.');
		});


	}


	function run() {

		console.log('SMS module loaded.');

		tellstick.socket.once('connect', function() {

			console.log('SMS module connected to Tellstick.');
			sendSMS('SMS-notifiering på.');

			listen();

		});
	}
	run();
}