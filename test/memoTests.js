(function(){
  "use strict";

  var assert = require('chai').assert;
  var path = require('path');
  var cli = require('../cli.js');

  describe("'memo' tests", function(){
    var testFile;
    before(function(done){
      testFile = path.join(__dirname,'testConfigs.js');
      done();
    });

    it("cli test", function(done){
      var memo = cli(testFile);
      assert.ok(memo.slack);
      done();
    });
  });


})();
