(function(){
  'use strict';

  var debug = require('debug')('memo:cli');
  var path = require('path');

  module.exports = function(appPackageJson, msgKey, cb){
    var err;
    var errMsg = "Config file/properties not found. Please add the configurations on package.json or an specific file and try again.";

    if(!appPackageJson["bot-caster"]){
      throw new Error("Your package.json not have a 'bot-caster' property. Please configure it and try again.");
    }

    var memo = appPackageJson["bot-caster"];
    if(typeof memo === "string"){
      // config file
      try{
        memo = require(memo);
      }catch(e){
        throw e;
      }
    }

    memo.appName = appPackageJson.name;
    memo.appVersion = appPackageJson.version;
    debug("memo object = ", memo);
    require('./index.js')(memo, msgKey, function(err, response){
      if(cb){
        return cb(err, response);
      }else{
        if(err) throw err;
        debug(response);
      }
    });

  };

})();
