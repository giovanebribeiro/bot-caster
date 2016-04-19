(function(){
  'use strict';

  var debug = require('debug')('memo:cli');

  module.exports = function(configFile){
    var err;
    var errMsg = "Config file/properties not found. Please add the configurations on package.json or an specific file and try again.";
    try{
      var config = require(configFile);
      
      if(!config.memo){
        debug("memo configs not found.");
        err = new Error(errMsg);
        throw err;
      }

      require('./memo.js')(config.memo);

      
      return memo;
    }catch(e){
      debug("config file not found", e);
      err = new Error(errMsg);
      throw err;
    }

  };

})();
