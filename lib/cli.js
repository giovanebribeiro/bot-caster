(function(){
  'use strict';

  var debug = require('debug')('memo:cli');

  module.exports = function(configFile, msgKey, appName, appVersion, cb){
    var err;
    var errMsg = "Config file/properties not found. Please add the configurations on package.json or an specific file and try again.";
    try{
      var config = require(configFile);
      
      if(!config.memo){
        debug("memo configs not found.");
        err = new Error(errMsg);
        throw err;
      }

      debug("config = ", config);
      debug("msgKey = ", msgKey);

      config.memo.appName = appName;
      config.memo.appVersion = appVersion;
      require('./index.js')(config.memo, msgKey, function(err, response){
        if(cb){
          return cb(err, response);
        }else{
          if(err) throw err;
          debug(response);
        }
      });
      
      return config.memo;
    }catch(e){
      debug("config file not found", e);
      throw e;
    }

  };

})();
