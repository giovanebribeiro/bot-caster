(function(){
  "use strict";

  var Slack = require('slack-node');
  var Pkg = require('./package.json');

  var webhookUri = "https://hooks.slack.com/services/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";
  var option = process.argv[2];
  var text = "["+Pkg.name+"] Version "+Pkg.version;
  switch(option){
    case "release":
      text+=" released.";
      break;
    case "deploy":
      text+=" deployed";
      break;
    case "deploy:staging":
      text+=" deployed to 'homolog' environment";
      break;
    case "deploy:prod":
      text+=" deployed to 'production' environment";
      break;
    default:
      text= "["+Pkg.name+"] I don't know the status of version "+Pkg.version+" because someone called me with wrong options... :unamused: Have a nice day.";
  }

  var slack = new Slack();
  slack.setWebhook(webhookUri);
  slack.webhook({
    channel: "#general",
    username: "tars",
    text: text
  }, function(err, response){
    console.log(response);
  });
})();
