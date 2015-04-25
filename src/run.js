//var Motorcontrol = require('./motorcontrol');
var API = require('./api');

//var motorcontrol = new Motorcontrol();
var api = new API();

//motorcontrol.init();
//motorcontrol.feed();
api.init();

/* process.on('SIGINT', function() {
    motorcontrol.shutdown();
    process.exit();
});
*/