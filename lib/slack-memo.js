(function(){
  "use strict";

  var Slack = require('slack-node');
  var debug = require('debug')("slackConfigs-memo");

  module.exports = function(slackConfigs, msgTitle, msgContent, cb){

    if(!slackConfigs.webhookUri){ 
      throw new Error("if you use slack, you must provide the webhookUri property on configs. Check this link (https://my.slack.com/services/new/incoming-webhook) to obtain your slack bot url");
    }

      var msg = "*" + msgTitle + "*";
      msg += "\n\n";
      msg += msgContent;


    debug("slack function");
    debug("memo = ", memo);
    debug("msg = ", msg);

    var slack = new Slack();
    slack.setWebhook(slackConfigs.webhookUri);
    slack.webhook({
      channel: slackConfigs.channel || "#general",
      username: slackConfigs.username || "memo",
      text: msg
    }, function(err, response){
      if(cb){
        return cb(err, response);
      }else{
        if(err) throw err;
        console.log("[SLACK] Message send.");
      }
    });

  };
})();
