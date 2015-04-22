var Gpio = require('onoff').Gpio;

/**
 * 
 * @constructor
 * @param {{motor: {enable: number, a: number, b: number},
 *          vibration: {enable: number, a: number, b: number},
 *          check: number}=} config
 */
var motorcontrol = function(config) {
    this.config_ = config || {
        motor: {
            enable: 25,
            a: 23,
            b: 24
        },
        vibration: {
            enable: 10,
            a: 11,
            b: 9
        },
        check: 18
    };
    
};

/**
 * Hardware config
 * 
 * @private
 * @type {{motor: {enable: number, a: number, b: number},
 *          vibration: {enable: number, a: number, b: number},
 *          check: number}?}
 */
motorcontrol.prototype.config_ = null;

/**
 * 
 * @private
 * @type {{ motor: {enable: Gpio, a: Gpio, b: Gpio},
 *          vibration: {enable: Gpio, a: Gpio, b: Gpio},
 *          check: Gpio}?}
 */
motorcontrol.prototype.hardware_ = {};

/**
 * Inits GPIO
 */
motorcontrol.prototype.init = function() {
    this.hardware_ = {
        motor: {
            enable: new Gpio(this.config_.motor.enable, 'out'),
            a: new Gpio(this.config_.motor.a, 'out'),
            b: new Gpio(this.config_.motor.b, 'out')
        },
        vibration: {
            enable: new Gpio(this.config_.vibration.enable, 'out'),
            a: new Gpio(this.config_.vibration.a, 'out'),
            b: new Gpio(this.config_.vibration.b, 'out')
        },
        check: new Gpio(this.config_.check, 'in', 'both')
    };
    
    this.reset();
};

/**
 * Prepare for shutdown
 */
motorcontrol.prototype.shutdown = function() {
    this.reset();
    
    this.hardware_.motor.enable.unexport();
    this.hardware_.motor.a.unexport();
    this.hardware_.motor.b.unexport();
    
    this.hardware_.vibration.enable.unexport();
    this.hardware_.vibration.a.unexport();
    this.hardware_.vibration.b.unexport();
    
    this.hardware_.check.unexport();
};

/**
 * Resets all outputs
 */
motorcontrol.prototype.reset = function() {
	this.stopMotor();
	this.stopVibration(); 
};

/**
 * Starts motor
 */
motorcontrol.prototype.startMotor = function() {
	this.hardware_.motor.a.writeSync(0);
	this.hardware_.motor.b.writeSync(1);
	this.hardware_.motor.enable.writeSync(1);
};

/**
 * Stops motor
 */
motorcontrol.prototype.stopMotor = function() {
    this.hardware_.motor.enable.writeSync(0);
    this.hardware_.motor.a.writeSync(0);
    this.hardware_.motor.b.writeSync(0);
};

/**
 * Starts vibration
 */
motorcontrol.prototype.startVibration = function() {
	this.hardware_.vibration.a.writeSync(1);
	this.hardware_.vibration.b.writeSync(0);
	this.hardware_.vibration.enable.writeSync(1);
};

/**
 * Stops vibration
 */
motorcontrol.prototype.stopVibration = function() {
    this.hardware_.vibration.enable.writeSync(0);
    this.hardware_.vibration.a.writeSync(0);
    this.hardware_.vibration.b.writeSync(0);
};

/**
 * Feed the cat!
 */
motorcontrol.prototype.feed = function() {
	var vibrationTimeout;
	var motorTimeout;

	this.hardware_.check.watch((function (err, value) {
		if (err) {
			throw err;
		}
		
		value = !value;

		if (value) {
			console.log('Fertig!');
			
			clearTimeout(motorTimeout);
			clearTimeout(vibrationTimeout);

			this.stopMotor();
			this.stopVibration();

			this.hardware_.check.unwatch();
		}
	}).bind(this));

	

	vibrationTimeout = setTimeout((function() {
		clearTimeout(vibrationTimeout);
		this.startVibration();

		vibrationTimeout = setTimeout((function() {
			clearTimeout(vibrationTimeout);
			this.stopVibration();
		}).bind(this), 10000);

	}).bind(this), 5000);

	motorTimeout = setTimeout((function() {
		clearTimeout(motorTimeout);
		clearTimeout(vibrationTimeout);

		console.log('Error');
		this.stopMotor();
		this.stopVibration();

	}).bind(this), (2 * 70 * 1000));

	this.startMotor();
};

module.exports = motorcontrol;
