var cnt = document.getElementById("count");
var water = document.getElementById("water");
var progress = document.querySelector(".progress");
var percent = cnt.innerText;

//interval
var interval1;
var interval2;
var milisec = 120;

//translate values
var x = 0;
var y;

//change values of drinks/toilets here
var drinks = 32;
var toilets = 8;
var dashoffset = 339.292 * (1 - (drinks/100));

//load drinks
interval1 = setInterval(function(){
	//keyframe
	getRule(dashoffset);

	//speed animation
	var sec = (milisec / 1000) * drinks;
	progress.style.animation = "progress " +  sec + "s linear forwards";

	//how many drinks
  percent++;
  cnt.innerHTML = percent + ' drinks';
	y = 100 - percent;
  water.style.transform = 'translate(' + x + ',' + y +'%)';
  if(percent == drinks){
    clearInterval(interval1);
  }
}, milisec);

setTimeout(function(){
	interval2 = setInterval(function(){
		//keyframe
		var dashoffsetToilet = 339.292 * (1 - (toilets/100));
		progress.style.strokeDashoffset = dashoffset;

		var sec = ((milisec / 1000) * drinks) - toilets;
		progress.style.animationPlayState = "running";
		progress.style.animation = "progress " +  sec + "s linear forwards";

		getRule(dashoffsetToilet);

		percent--;
		cnt.innerHTML = percent + ' toilet';
		var y2 = 100 - percent;
		water.style.transform = 'translate(' + x + ',' + y2 +'%)';
		if(percent == toilets){
			clearInterval(interval2);
		}
	}, milisec);
}, 8000);


// change keyframes in javascript
var cssRule;
function getRule(dashoffset) {
	var rule;
	var ss = document.styleSheets;

	for (var i = 0; i < ss.length; ++i) {
		for (var x = 0; x < ss[i].cssRules.length; ++x) {
			rule = ss[i].cssRules[x];
			if (rule.name == "progress" && rule.type == CSSRule.KEYFRAMES_RULE) {
				cssRule = rule;
				cssRule.appendRule("100% { stroke-dashoffset:" + dashoffset + "; }");
			}
		}
	}
}
