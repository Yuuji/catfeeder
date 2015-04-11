var Motorcontrol = require('./motorcontrol');
var motorcontrol = new Motorcontrol();

motorcontrol.init();
motorcontrol.feed();


process.on('SIGINT', function() {
    motorcontrol.shutdown();
    process.exit();
});