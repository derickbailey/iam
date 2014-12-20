var Configurator = require("./configurator");
var Middleware = require("./middleware");

function IAm(){
  this.configurator = new Configurator();
};

IAm.prototype.configure = function(cb){
  cb(this.configurator);
};

IAm.prototype.middleware = function(){
  var config = this.configurator.getConfig();
  var middleware = new Middleware(config);
  return middleware.handler;
};

IAm.prototype.createUserSession = function(req, res, user, cb){
  var config = this.configurator.getConfig();

  config.getUserToken(user, function(err, token){
    if (err) { return cb(err); }

    req.session._iamUserToken = token;
    req.user = user;
    res.locals.user = user;

    return cb();
  });
};

module.exports = IAm;