(function(){
  "use strict";

  var fs = require('fs');
  var path = require('path');
  var debug = require('debug')('memo:memo');

  module.exports = function(memo, msgChoosedKey){
    var configuredMessages = memo.messages || 
            {
              "default": {
                "title": "Default memo message",
                "content": "This is a default message for 'memo' node package. The use of this message is only for test purposes, and not recommended for your current SCM environment."
                        }
            };

    if(!msgChoosedKey){ msgChoosedKey = "default"; }

    var msgChoosed = memo.messages[msgChoosedKey];

    var err;
    if(!msgChoosed.title){
      err = new Error("The choosed message not have a title.");
      throw err;
    }

    if(!msgChoosed.content){
      err = new Error("The choosed message not have a content.");
      throw err;
    }

    var msgTitle = "## " + msgChoosed.title;
    var msgContent = msgChoosed.content; 

    // loading the changelog file and extract the infos about the most recent version.
    if(memo.changelogFile){

      var changelogFilePath = path.join(process.cwd(), memo.changelogFile);
      if(!fs.existsSync(changelogFilePath)){
        err = new Error("The changelog file is not found.");
        throw err;
      }

      var changelog = fs.readFileSync(changelogFilePath, "utf8");
      var changelogArray = changelog.split("\n");
      var buff = "";
      var flag = false;
      for(var i = 0; i < changelogArray.length; i++){
        var line = changelogArray[i];
        debug("line = ", line);

        if(line.startsWith("<")){
          // all lines started with '<' will be ignored
          debug("line ignored");
          continue;
        }

        if(line.match(/^##\s+(\[)?([0-9]+\.){2}[0-9]+/)){
          
          if(!flag){
            // the first file topic will be read.
            debug('first line of version');
            flag = true;
          }else{
            // all lines of most recent version are read. Break
            debug('all lines are read. done.');
            break;
          }

        }

        // any other line, buff
        if(line.startsWith("#")){ line = "#" + line; }
        buff += line + "\n";
      }

      debug(buff);
      msgContent += "\n\n" + "## CHANGELOG" + "\n\n" + buff;
    }

    if(memo.slack){
      require('./slack-memo.js')(memo, msgTitle, msgContent);
    }
    
    if(memo.email){
      //require('email-memo')(memo);
    }

  
  };
})();
