var sections = document.querySelectorAll('.main');

//create dot navigation
for(var i = 0; i < sections.length; i++) {
	var nav = document.querySelector('nav');
	var dot = document.createElement('button');
	nav.appendChild(dot);
}

var dots = document.querySelectorAll('nav button');
var buttons = document.querySelectorAll("button");
var slideIndex = 1;

dots[0].classList.add("activeSlider")

//dot navigation
function specificDivs(n) {
	showDivs(slideIndex = n);
	for (i = 0; i < dots.length; i++) {
		dots[i].classList.remove("activeSlider");
	}
	dots[slideIndex-1].classList.add("activeSlider");
}

function showDivs(n) {
	var i;
	if (n > sections.length){
		slideIndex = 1
	}
	if (n < 1) {
		slideIndex = sections.length
	}
	for (i = 0; i < sections.length; i++) {
		 sections[i].style.display = "none";
	}
	sections[slideIndex-1].style.display = "flex";
}

dots.forEach(function(el, index){
	el.addEventListener('click', function(){
		specificDivs(index + 1)
	})
})
