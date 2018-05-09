var express = require('express');
var SockJS = require('sockjs-client/dist/sockjs.js');
var Stomp = require('@stomp/stompjs');

express()
  .use(express.static('static'))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', index)
  .get('/index.html', index)
  .listen(3010)

function index(req, res) {
  res.render('index.ejs');
}


var onConnect = function() {
    console.log("connecte");
    client.subscribe("exchange/power/C0", callback);
    // called back after the client is connected and authenticated to the STOMP server
  };

var error_callback = function(error) {
    // display the error's message header:
    console.log(error);
  };

var callback = function(message) {
   // called when the client receives a STOMP message from the server
   console.log("connect");
   client.subscribe("exchange/power/C0", callback);
   // if (message.body) {
   //   console.log("got message with body " + message.body)
   // } else {
   //   console.log("got empty message");
   // }
 };

var url = new SockJS('https://app.jouliette.net/stomp/');
// console.log(url);
// var client = Stomp.client('wss://app.jouliette.net/stomp/317/srlf3u51/websocket');
// var client = Stomp.client(url);
// var url = new WebSocket('wws://app.jouliette.net/stomp/');
console.log(url);
var client = Stomp.client(url);
// var client = Stomp.over(function(){
//        return new WebSocket('https://app.jouliette.net/stomp/')
//      });

 client.connect('web', 'mnwdTGgQu5zPmSrz', onConnect, error_callback, "/");
// client.subscribe("exchange/power/C0", callback);


// client.reconnect_delay = 5000;
console.log("loaded");
