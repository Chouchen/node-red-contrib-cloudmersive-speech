module.exports = function(RED) {
    function RemoteServerNode(n) {
        RED.nodes.createNode(this,n);
        this.apiKey = n.apiKey;
    }
    RED.nodes.registerType("cloudmersive-speech-client", RemoteServerNode);
}