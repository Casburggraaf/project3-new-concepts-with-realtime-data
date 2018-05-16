(function () {
  "use strict";

  const app = {
    init: function() {

    }
  };

	//get data from JSON
	const json = {
		data: null,
		getData() {
			const promise = new Promise(function(resolve, reject) {
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						 let tempData = JSON.parse(this.responseText);
						 resolve(tempData);
					}
				};
				xmlhttp.open("GET", "js/data.json", true);
				xmlhttp.send();
			})
			return promise;
		}
	};

	//var JSON fill
	var drinks;
	var toilets;
	var price;
	var food;
	var ingredients
	var timestamp;
	var dashoffset;
	var dashoffsetToilet;

	json.getData().then((data) => {
		drinks = data[0].drinks[0].total;
		toilets = Math.round(Number(drinks) / 3);
		price = data[0].price;
		food = data[0].food[0].name;
		timestamp = data[0].timestamp;
		ingredients = data[0].food[0].ingredients;

		dashoffset = 339.292 * (1 - (drinks/100));
		dashoffsetToilet = 339.292 * (1 - (toilets/100));

		template.init();

		var dots = document.querySelectorAll('nav button');
						dots[4].addEventListener("click", () => {
								wave.init();
						});

						var dots = document.querySelectorAll('nav button');
						dots[2].addEventListener("click", () => {
								energy.init();
						});

	});

	//STATE 1
	const template = {
		init() {
			template.renderState1();
			template.renderState3();
		},
		renderState1() {
			// document.querySelector(".timestamp span").innerHTML = timestamp/60/1000 + ' minuten';			
			document.querySelector(".timestamp span").innerHTML = Math.round(window.data.total.time /60/60) + ' minuten'

			document.querySelector(".food span").innerHTML = food
			document.querySelector(".drinks span").innerHTML = drinks + ' drankjes'
			document.querySelector(".price span").innerHTML = '€ ' + price
		},
		renderState3() {

		}
	}

	//STATE 2
	const energy = {
		interval1: null,
		interval2: null,
		Timeout: 120,
		//CAS!!
		consumption: Math.round(window.data.total.consumption /15),
		solar: Math.abs(Math.round(window.data.total.solar)),
		init() {
			console.log(this.consumption);
			
			this.interval1 = setInterval(this.fillLine, this.Timeout);
		},
		fillLine() {
			//keyframe
			var dashEnergy = 339.292 * (1 - (energy.consumption/100));
			console.log(dashEnergy)
			getRule(dashEnergy);

			//speed animation
			var sec = (energy.Timeout / 1000) * energy.consumption;
			progress2.style.animation = "progress " +  sec + "s linear forwards";

			//how many drinks
		  percent2++;
		  cnt2.innerHTML = percent2 + ' W verbruik';
			y = 100 - percent;
		  if(percent2 == energy.consumption){
		    clearInterval(energy.interval1);
				setTimeout(() => {
					energy.interval2 = setInterval(energy.emptyLine, energy.Timeout);
				}, 4000);
		  }
		},
		emptyLine() {
			//keyframe
			var dashEnergy = 339.292 * (1 - (energy.solar/100));
			getRule(dashEnergy);

			//speed animation
			var sec = (energy.Timeout / 1000) * energy.solar;
			progress2.style.animation = "progress " +  sec + "s linear forwards";

			//how many drinks
		  percent2--;
		  cnt2.innerHTML = percent2 + ' W opbrengst';
			y = 100 - percent;
		  if(percent2 == (energy.consumption - energy.solar)){
		    clearInterval(energy.interval2);
		  }
		}
	};

	//STATE 3
	//STATE 4

	//var waves
	var cnt = document.getElementById("count");
	var cnt2 = document.getElementById("countEnergy");
	var water = document.getElementById("water");
	var progress2 = document.querySelector(".state2 .progress");
	var progress4 = document.querySelector(".state4 .progress");
	var percent = cnt.innerText;
	var percent2 = cnt2.innerText;

	var x = 0;
	var y;

	const wave = {
		interval1: null,
		interval2: null,
		Timeout: 120,
		init() {
			this.interval1 = setInterval(this.fillWater, this.Timeout);
		},
		fillWater() {
			//keyframe
			getRule(dashoffset);

			//speed animation
			var sec = (wave.Timeout / 1000) * drinks;
			progress4.style.animation = "progress " +  sec + "s linear forwards";

			//how many drinks
		  percent++;
		  cnt.innerHTML = percent + ' drinks';
			y = 100 - percent;
		  water.style.transform = 'translate(' + x + ',' + y +'%)';
		  if(percent == drinks){
		    clearInterval(wave.interval1);
				setTimeout(() => {
					wave.interval2 = setInterval(wave.emptyWater, wave.Timeout);
				}, 4000);
		  }
		},
		emptyWater() {
			//keyframe
			progress4.style.strokeDashoffset = dashoffset;
			getRule(dashoffsetToilet);

			var sec = 2;
			// var sec = ((milisec / 1000) * drinks) - toilets;
			progress4.style.animation = "progress " +  sec + "s linear forwards";

			percent--;
			cnt.innerHTML = percent + ' toilet';
			var y2 = 100 - percent;
			water.style.transform = 'translate(' + x + ',' + y2 +'%)';
				console.log(toilets);
			if(percent == toilets){
				clearInterval(wave.interval2);
			}
		}
	};

	// change keyframes in javascript
	var cssRule;
	function getRule(dash) {
		var rule;
		var ss = document.styleSheets;

		for (var i = 0; i < ss.length; ++i) {
			for (var x = 0; x < ss[i].cssRules.length; ++x) {
				rule = ss[i].cssRules[x];
				if (rule.name == "progress" && rule.type == CSSRule.KEYFRAMES_RULE) {
					cssRule = rule;
					cssRule.appendRule("100% { stroke-dashoffset:" + dash + "; }");
				}
			}
		}
	}



  app.init()
})();
