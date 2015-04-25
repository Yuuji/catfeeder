var express    = require('express');
var bodyParser = require('body-parser');


var API = function(config) {
    this.config_ = config || {
        port: 8080
    };
};

API.prototype.config_ = null;

API.prototype.app_ = null;

API.prototype.router_ = null;

API.prototype.init = function() {
    this.app_ = express();
    
    // configure app to use bodyParser()
    // this will let us get the data from a POST
    this.app_.use(bodyParser.urlencoded({ extended: true }));
    this.app_.use(bodyParser.json());
    
    this.router_ = express.Router();
    
    this.router_.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });   
    });
    
    this.app_.use(express.static('public'));
    this.app_.use('/api', this.router_);
    this.app_.listen(this.config_.port);
    console.log('Webserver started on port ' + this.config_.port);
};

module.exports = API;