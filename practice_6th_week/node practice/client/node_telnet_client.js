var net = require('net');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

var client = new net.Socket();
client.connect(1337,'127.0.0.1',function(){
    console.log('connected');
    client.write('hello server give me back this data please');
});

client.on('data',function(data){
    console.log('received:',decoder.write(data));
    //client.destroy();
});

client.on('error',function(err){
    console.log('error:',err);
});

client.on('close',function(){
    console.log('connection closed');
});