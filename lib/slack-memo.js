(function(){
  "use strict";

  var Slack = require('slack-node');
  var debug = require('debug')("memo:slack-memo");

  module.exports = function(memo, msgTitle, msgContent, cb){

    if(!memo.slack.webhookUri){ 
      throw new Error("if you use slack, you must provide the webhookUri property on configs. Check this link (https://my.slack.com/services/new/incoming-webhook) to obtain your slack bot url");
    }

      var msg = "*" + msgTitle + "*";
      msg += "\n\n";
      msg += msgContent;


    debug("slack function");
    debug("memo = ", memo);
    debug("msg = ", msg);

    var slack = new Slack();
    slack.setWebhook(memo.slack.webhookUri);
    slack.webhook({
      channel: memo.slack.channel || "#general",
      username: memo.slack.username || "memo",
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
