(function(){
  "use strict";

  var assert = require('chai').assert;
  var path = require('path');
  var cli = require('../cli.js');

  describe("memo tests", function(){
    var testFile;
    before(function(done){
      testFile = path.join(__dirname,'testConfigs.js');
      done();
    });

    describe("'cli' module tests", function(){
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

      it("correct file", function(done){
        var memo = cli(testFile);
        assert.ok(memo, "the 'memo' object must exist on this file.");
        done();
      });
    });

  });


})();
