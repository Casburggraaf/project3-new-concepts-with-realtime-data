var express = require('express');
var SockJS = require('sockjs-client-node');
var Stomp = require('stompjs');

express()
  .use(express.static('static'))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', index)
  .get('/index.html', index)
  .listen(3010)

function index(req, res) {
  res.render('index.ejs', {data: data});
}

const stomp = {
  url: new SockJS('https://app.jouliette.net/stomp/'),
  client: null,
  data: [],
  init(){
    this.client = Stomp.over(this.url);
    this.client.connect('web', 'mnwdTGgQu5zPmSrz', this.onConnect, console.error, '/');
  },
  onConnect(){
    console.log("connected");

    stomp.client.subscribe("/exchange/power/C0", stomp.onData);
  },
  onData(d){
    console.log(d);
    stomp.data.push(d)
  }
};

stomp.init()
