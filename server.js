var express = require('express')

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

const api = {
  apiBasisUrl: "https://api.themoviedb.org/3/tv/",
  apiKey: null,
  requestPopular(pageNum) {
    const _this = this;
    // Makes a promise for the XMLHttpRequest request
    const promise = new Promise(function (resolve, reject) {
      const request = new XMLHttpRequest();

      // Making the url and creating a GET request
      const url = `${_this.apiBasisUrl}popular?api_key=${_this.apiKey}&page=${pageNum}`;

      request.open('GET', url, true);

      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          //console.log(JSON.parserequest.responseText);
          console.log(JSON.parse(request.responseText));

          resolve();
        } else {
          reject(request.status); // Error handeling
        }
      };

      request.onerror = function () {
        reject("Failed to proform api req"); // Error handeling
      };

      request.send();
    });

    return promise;
  }
};
