

/*
This file is a Content Script (https://developer.chrome.com/extensions/content_scripts)
This file contains JS code that:
* Displays all overlays on top of the webpage
All the CSS used by the elements here reside in the "content.css" file
*/
//This creates the bubble that resides on top of the webpage.
//This is displayed when nothing is being queried
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'before_answer');
bubbleDOM.innerHTML = '<div><img src="https://biasflashlight-bucket.s3.ap-southeast-2.amazonaws.com/Lightbulbwhitelogo.PNG" "></div>';
document.body.appendChild(bubbleDOM);
//registering a listener. This receiver receives messages primarily
//from the background.js code. The received message contains the text
//to display in the bubbles after background.js receives the answers from GPT3
chrome.runtime.onMessage.addListener(receiver);
//this code dismisses the expanded bubble after the user views the answer
//click anywhere on the screen dismisses the bubble and it goes back to the
//"before_answer" state
window.addEventListener('mousedown', function (e) {
  if (bubbleDOM.getAttribute('class') == 'after_answer') {
    bubbleDOM.innerHTML = '<div><img src="https://biasflashlight-bucket.s3.ap-southeast-2.amazonaws.com/Lightbulbwhitelogo.PNG" "></div>';
    bubbleDOM.setAttribute('class', 'before_answer');
  }
});
//Code to change the contents/layout of the bubble when answers are available
function renderBubble(selection) {
  console.log("renderBubble called" + selection);
  bubbleDOM.setAttribute('class', 'after_answer');
  if (selection != null) {
    bubbleDOM.innerHTML = selection;
  }
  else {
    bubbleDOM.innerHTML = "Loading.."
  }
}
//Function handling the message received from background.js. Registered with the
//receiver listenerwhat_answer

function receiver(request, sender, sendResponse) {
  var textToDisplay = "base text";
  console.log("Request received");
  if (request == "loading") {
    console.log("loading");
  }
  else {
    textToDisplay = "<div class=\"answer\">" + request.more_info_answer + "</div>"
    renderBubble(textToDisplay);
  }
}



//JS for Gauge elements in popup.html
const gaugeElement = document.querySelector(".gauge");
const biasTypeString = " Political";

function setGaugeValue(gauge, value) {
  if (value < 0 || value > 1) {
    return;
  }

  gauge.querySelector(".gauge__fill").style.transform =
    `rotate(${value / 2
    }turn)`;

  gauge.querySelector(".gauge__cover").textContent =
    `${Math.round(
      value * 100
    )}%`;
}
document.querySelector(".biasType").textContent = "Main Bias Detected:" + biasTypeString;
//set gauge to random value.
var random = `${Math.random()}`;
window.onload = setGaugeValue(gaugeElement, random);

