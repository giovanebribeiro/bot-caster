(function(){
  "use strict";

  var assert = require('chai').assert;
  var path = require('path');
  var cli = require('../lib/cli.js');
  var slackMemo = require('../lib/slack-memo.js');

  describe("memo tests", function(){
    var testFile;
    before(function(done){
      testFile = path.join(__dirname,'testConfigs.js');
      done();
    });

    it("file where 'memo' object is not present", function(done){
      assert.throws(function(){
        try{
          cli(path.join(__dirname,'..','package.json'));
        }catch(e){
          throw e;
        }
      }, Error);
      done();
    });

    it("-> send the message to slack", function(done){
      var msg = "*Release Version*";
      msg += "\n\n";
      msg += "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";
      var configs = require(testFile);
      assert.doesNotThrow(function(){
        try{
          slackMemo(configs.memo, msg, function(err, response){
            if(err) throw err;
            console.log("[slack] Message send successfully.");
            done(); 
          });
        }catch(e){
          throw e;
        }
      }, Error, "function does not throw any error");
    });

    
/*
    it(" -> lib test", function(done){
      cli(testFile, "key1");
      //assert.ok(memo, "the 'memo' object must exist on this file.");
      done();
    });*/
  });



})();
