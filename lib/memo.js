(function(){
  "use strict";

  module.exports = function(memo, msgChoosedKey){
    var configuredMessages = memo.messages || [
            {"default": "This is a default message for 'memo' node package. The use of this message is only for test purposes, and not recommended for your current SCM environment."}];

    if(!msgChoosedKey){ msgChoosedKey = "default"; }

    var msgChoosedContent = "";






    if(memo.slack){
      //require('slack-memo.js')(memo);
    }
    
    if(memo.email){
      //require('email-memo')(memo);
    }

  
  };
})();
