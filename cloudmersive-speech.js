var CloudmersiveSpeechApiClient = require('cloudmersive-speech-api-client');
var defaultClient = CloudmersiveSpeechApiClient.ApiClient.instance;
var fs = require("fs");
const { v4: uuidv4 } = require('uuid');


module.exports = function(RED) {
    'use strict';

    function Text2Speech(n) {
      
        RED.nodes.createNode(this,n);
        this.path = n.path;
        this.format = n.format;

        var node = this;
        
        node.on('input', function (msg) {
            
          const creds = RED.nodes.getNode(n.creds);
            // Configure API key authorization: Apikey
            var Apikey = defaultClient.authentications['Apikey'];
            Apikey.apiKey = creds.credentials.apiKey;

            var api = new CloudmersiveSpeechApiClient.SpeakApi()

            var reqConfig = new CloudmersiveSpeechApiClient.TextToSpeechRequest();
            reqConfig.Format = node.format || "mp3";
            reqConfig.Text = msg.payload;

            var callback = function(error, data, response) {
                if (error) {
                  console.error(error);
                } else {
                  const folder = node.path || "./";
                  const filename = folder+uuidv4()+"."+node.format;
                  fs.writeFile(filename, data, function(err) {
                      if (err) {
                        console.error(err);
                        throw err;
                      }
                      fs.realpath(filename, (error, resolvedPath) => {
                        if (error) {
                          console.log(error);
                        }
                        else {
                          node.send({payload: resolvedPath});
                        }
                      });
                  });
                }
              };
              
              api.speakTextToSpeech(reqConfig, callback);
        });
    }

    RED.nodes.registerType('cloudmersive-speech', Text2Speech);
};
