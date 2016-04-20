(function(){
  "use strict";

  var fs = require('fs');
  var path = require('path');
  var debug = require('debug')('memo:memo');

  module.exports = function(memo, msgChoosedKey, cb){
    var configuredMessages = memo.options || 
            {
              "default": {
                "title": "Default memo message",
                "content": "This is a default message for 'memo' node package. The use of this message is only for test purposes, and not recommended for your current SCM environment."
                        }
            };

    if(!msgChoosedKey){ msgChoosedKey = "default"; }

    var msgChoosed = configuredMessages[msgChoosedKey];
    debug("msgChoosed = ", msgChoosed);

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
    var includeChangelog = msgChoosed.attachChangelog || true;

    msgTitle = msgTitle.replace("%app_name%", memo.appName);
    msgTitle = msgTitle.replace("%app_version%", memo.appVersion);
    msgContent = msgContent.replace("%app_name%", memo.appName);
    msgContent = msgContent.replace("%app_version%", memo.appVersion);

    // loading the changelog file and extract the infos about the most recent version.
    if(memo.changelogFile && includeChangelog){
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
      require('./slack-memo.js')(memo.slack, msgTitle, msgContent, function(err, response){
        if(cb){
          return cb(err,"message sent: " + msgTitle + "\n\n" + msgContent);
        }else{
          if(err) throw err;
          debug(response);
        }  
      });
    }
    
    if(memo.email){
      //require('email-memo')(memo);
    }

  
  };
})();
