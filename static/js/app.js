(function () {
  "use strict";

  const app = {
    init: function() {

    }
  };

  const api = {
    apiBasisUrl: null,
    apiKey: "",
    data: null,
    autoCompleteReq(query) {
      const _this = this;
      // Makes a promise for the XMLHttpRequest request
      const promise = new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();

        // Making the url and creating a GET request
        const url = `${_this.apiBasisUrl}?api_key=${_this.apiKey}&query=${query}`;

        request.open('GET', url, true);

        request.onload = function () {
          console.log(JSON.parse(request.responseText));
          resolve();
        };

        request.onerror = function () {
          reject("Failed to proform api req"); // Error handeling
        };

        request.send();
      });

      return promise;
    }
  }


  app.init()
})();
