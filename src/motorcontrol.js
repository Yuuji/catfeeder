var gpio = require('onoff').Gpio;

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
        check: new Gpio(this.config_.check, 'in')
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
    this.hardware_.motor.enable.writeSync(0);
    this.hardware_.motor.a.writeSync(0);
    this.hardware_.motor.b.writeSync(0);
    
    this.hardware_.vibration.enable.writeSync(0);
    this.hardware_.vibration.a.writeSync(0);
    this.hardware_.vibration.b.writeSync(0);
};

/**
 * Feed the cat!
 */
motorcontrol.prototype.feed = function() {
    
};

module.exports = motorcontrol;