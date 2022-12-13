//JS for Gauge elements in popup.html
const politicalBiasRating = document.querySelector(".gaugeTop");
const genderBiasRating = document.querySelector(".gaugeBottom");

//const biasTypeString = " Political";


function setPoliticalGaugeValue(gauge, value) {
  if (value < 0 || value > 1) {
    return;
  }

  gauge.querySelector(".gaugeFillTop").style.transform = `rotate(${value / 2 }turn)`;

  gauge.querySelector(".gaugeCoverTop").textContent = `${Math.round( value * 100 )}%`;
}
function setGenderGaugeValue(gauge, value) {
  if (value < 0 || value > 1) {
    return;
  }

  gauge.querySelector(".gaugeFillBottom").style.transform = `rotate(${value / 2 }turn)`;

  gauge.querySelector(".gaugeCoverBottom").textContent = `${Math.round( value * 100 )}%`;
}

//document.querySelector(".biasType").textContent = biasTypeString;
//set gauge to random value.


// when implementing api, change value of random1/random2 to hook into backend.
var random1 = `${Math.random()}`;
var random2 = `${Math.random()}`;
window.onload = setPoliticalGaugeValue(politicalBiasRating, random1);
window.onload = setGenderGaugeValue(genderBiasRating, random2);