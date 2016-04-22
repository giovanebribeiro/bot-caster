(function(){
  "use strict";

  var assert = require('chai').assert;
  var path = require('path');
  var slackMemo = require('../lib/slack-memo.js');
  var memo = require('../lib/index.js');
  var cli = require('../lib/cli.js');
  var debug = require("debug")("memo:memoTests");
  var fs = require('fs');

  describe("memo tests", function(){
    var testFile;
    before(function(done){
      testFile = path.join(__dirname,'testConfigs.json');

      // mounting the second file, for tests to indirect configurations
      var memo = require(testFile).memo;
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

    it("send the message to slack", function(done){
      var msgTitle = "Release Version %app_version%";
      var msgContent = "Lorem ipsum (%app_name%) dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.";
      var configs = require(testFile);
      assert.doesNotThrow(function(){
        try{
          slackMemo(configs.memo.slack, msgTitle, msgContent, function(err, response){
            if(err) throw err;
            done(); 
          });
        }catch(e){
          throw e;
        }
      }, Error, "function does not throw any error");
    });

    it("send the message to slack using the properties on config file", function(done){
      assert.doesNotThrow(function(){
        try{
          var configs = require(testFile);
          slackMemo(configs.memo.slack, configs.memo.options.key1.title, configs.memo.options.key1.content, function(err, response){
            if(err) throw err;
            done(); 
          });
        }catch(e){
          throw e;
        }
      }, Error, "function does not throw any error");

    });

    describe("cli tests", function(){
      var fakePackageJson;
      before(function(done){
        // create the needed files
        // file for 'direct way'
        fakePackageJson = require(testFile);
        
        // file for indirect way
        var jsonIndirectWay = fakePackageJson.memo;
        fs.writeFile(path.join(__dirname, 'indirectConfigs.json'), JSON.stringify(jsonIndirectWay), function(err){
          if(err) throw err;
          done();
        });
      });

      after(function(done){
        fs.unlink(path.join(__dirname, 'indirectConfigs.json'), function(err){
          if(err) throw err;
          done();
        });
      });

      it("direct way", function(done){
        var configs = require(testFile);
        assert.doesNotThrow(function(){
          try{
            cli(configs, "key1", function(err, response){
              if(err) throw err;
              debug(response);
              done();
            });  
          }catch(e){
            throw e;
          }
        }, Error);
      });

      it("indirect way", function(done){
        var configs = require(testFile);
        configs.memo = path.join(__dirname, 'indirectConfigs.json');
        assert.doesNotThrow(function(){
          try{
            cli(configs, "key1", function(err, response){
              if(err) throw err;
              debug(response);
              done();
            });  
          }catch(e){
            throw e;
          }
        }, Error);

      });
    });
/*
    it("Send a message using the default message (must be the last one)", function(done){
      var configs = require(testFile);
      //removing the options object to force the use of default message
      delete configs.memo.options;
      assert.doesNotThrow(function(){
        try{
          memo(configs.memo, "default", function(err, response){
            if(err) throw err;
            debug(response);
            done();  
          });
        }catch(e){
          throw e;
        }
      }, Error, "function does not throw any error");
    });
*/  
  });

})();
