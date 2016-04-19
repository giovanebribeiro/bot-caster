(function(){
  'use strict';

  var debug = require('debug')('memo:cli');

  module.exports = function(configFile){
    var err;
    try{
      var config = require(configFile);
      
      if(!config.memo){
        debug("memo configs not found.");
        err = new Error();
        throw err;
      }

      var memo = config.memo;
      console.log("memo = ", memo);

      return memo;
    }catch(e){
      debug("config file not found", e);
      var errMsg = "Config file/properties not found. Please add the configurations on package.json or an specific file and try again.";
      err = Error(errMsg);
      throw err;
    }

  };

})();
