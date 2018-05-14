var express = require('express');
var SockJS = require('sockjs-client-node');
var Stomp = require('stompjs');
var MongoClient = require('mongodb').MongoClient;

express()
  .use(express.static('static'))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', index)
  .get('/index.html', index)
  .listen(3010)

function index(req, res) {
  let usage = engergy.getUsage().then((usage) => {
    // res.render('index.ejs');
    res.render('index.ejs', {data: usage});
    console.log(usage);
    
  })
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
  onData(data){
    let json = JSON.parse(data.body);
    
    let parseData = {
      time: Date.now(),
      solar: json.solar,
      consumption: json.consumption
    };

   parseData.time = new Date(parseData.time);
   parseData.time.setSeconds(0);
   parseData.time.setMilliseconds(0);
   parseData.time = parseData.time.getTime();

    mongo.db.collection("data").insertOne(parseData, function(err, res) { 
      if (err) throw err;
    });
  }
};


const engergy = {
  init(){

  },
  getUsage() {
    return new Promise((resolve, reject) => {
      let temp = {
        last: null,
        first: null,
        total: {
          time: null,
          consumption: null,
          solar: null
        }
      };

      this.getUsageDataFirst().then((dataFirst) => {
        temp.first = dataFirst;

        this.getUsageDataLast().then((dataLast) => {
          temp.last = dataLast;
          temp.total.time = temp.last.time - temp.first.time;
          temp.total.consumption = temp.last.consumption - temp.first.consumption;
          temp.total.solar = temp.last.solar - temp.first.solar;
          resolve(temp);
        });
      });
    });

  },
  getUsageDataFirst(){
    return new Promise((resolve, reject) => {
      let query = {time: Date.parse('14 May 2018 15:33')}
      mongo.db.collection("data").find(query).limit(10).toArray(function(err, result) {
        if (err) throw err;
        resolve(result[0]);
      });  
    });
  },
  getUsageDataLast(){
    return new Promise((resolve, reject) => {
      let query = {time: Date.parse('14 May 2018 15:43')}
      mongo.db.collection("data").find(query).limit(10).toArray(function(err, result) {
        if (err) throw err;
        resolve(result[0]);
      });  
    });
  }
};


const mongo = {
  db: null,
  init(){
    MongoClient.connect('mongodb://localhost/ceuvel', (err, client) => {
      stomp.init()
      this.db = client.db('ceuvel');
    });
  }
};

mongo.init();
