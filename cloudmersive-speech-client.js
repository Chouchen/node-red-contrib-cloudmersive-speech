module.exports = function(RED) {
    function RemoteServerNode(n) {
        RED.nodes.createNode(this,n);
        this.apiKey = this.credentials.apiKey;
    }
    RED.nodes.registerType("cloudmersive-speech-client", RemoteServerNode,{
        credentials: {
            apiKey: {type:"password"}
        }
    });
}