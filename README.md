# bot-caster [![Dependencies Status](https://david-dm.org/giovanebribeiro/memo.svg)](https://david-dm.org/giovanebribeiro/memo)

Bot to deliver messages in postversion scripts on node apps.

This bot was designed to send messages to a software team when a new version 
is generated. So, the normal steps to use this tool are:

- Update your 'master' branch or trunk
- run tests
- update version in package.json
- generate/update changelog
- commit changed files
- git push && git push --tags
- bot-caster

## Installation and usage

```
$ npm install --save-dev bot-caster
```

Or, globally:

```
# npm install -g bot-caster
```

Example:

```javascript
/* package.json */
...

"scripts":{
  ...
  "postversion": "git push && git push --tags && bot-caster -m 'key1'"
},

...

"bot-caster":{
  "options": {
    "key1": {
      "title": "title for message 1",
      "content": "this is the content for message 1",
      "attachChangelog": true
    },
    "key2":{
      "title": "title to another activity (ex: deploy the version to production environment)",
      "content": "another content to this message",
      "attachChangelog": false // the changelog for this version will not be loaded.
    },
    "key3":{
      "title": "app name and app version",
      "content": "You can use %app_name% and %app_version% and the tool will replace this words with 'name' and 'version' properties from your package.json"
    }
  },
  "changelogFile": "./CHANGELOG.md",
  "slack": {
    "webhookUri":"access this link: https://my.slack.com/services/new/incoming-webhook to obtain your slack bot url",
    "channel": "#general",
    "username": "memo"
  }
}
```

## Options

The memo options goes inside the package.json file. There's two ways to write the options:

- Direct way, inside package.json
- Indirect way, writing the file path of configs and put your path indide package.json.

### Writing the direct way

Just add the object inside the 'memo' property on your package.json. The first example of usage for this tool shows the direct way. 

```
package.json

{
  "name": "my-package",
  "version": "1.0.0",
  ...
  "memo": {
    options: {
      ...
    },
    "changelogFile": { ... }
    ...
  }
}
```

### Writing the indirect way

Just write your configs in another file, and put this file on package.json.

```
/* memo-configs.js */
module.exports = {
  "memo":{
    "options": {
      "key1": {
        "title": "title for message 1",
        "content": "this is the content for message 1",
        "attachChangelog": true
      }
    },
    "changelogFile": "./CHANGELOG.md",
    "slack": {
      "webhookUri":"access this link: https://hooks.slack.com/services/my-bot-url",
      "channel": "#general",
      "username": "memo"
    }
  }
};

/* package.json */
{
...
"memo": "path/to/memo-configs.js/created/earlier"
}
```

### Available options

- *options*: Object to store the message types available to this installation. Each property have a custom key and your value is another object with:
  - *title*: The message title
  - *content*: The message content
  - *attachChangelog*: Flag to attach or not the changelog to message. Default: false.
- *changelogFile*: Path to changelog file. The tool was designed to read the changelog files generated by [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog).
- *slack*: The configurations used to publish the generated message to [slack](https://slack.com/) service.
  - *webhookUri*: The slack webhook url. Access this [link](https://my.slack.com/services/new/incoming-webhook) for details
  - *channel*: The slack channel to post the message
  - *username*: The bot's username

## Testing

To make tests, rename the testConfigs.js.example to testConfigs.json, set the needed informations and run:

```
$ npm test
```
