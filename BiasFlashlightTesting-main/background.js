// Called when the user clicks on the browser action.

//get url from content.js when more information is clicked

//call OpenAI api


//get response from api
//send response to popup.js to display

//function to run when get more info (opena AI) button is clicked in popup.html

/*This file is a background page(https://developer.chrome.com/extensions/background_pages)
The purpose of this file is to:

* Communicate with GPT3
* Format and Pass the responses to the content script for display in the bubble
*/

chrome.runtime.onMessage.addListener(receiver);


function receiver(request, sender, sendResponse) {
  console.log("Request received" + request);


}
//Function to send a message. Usually to the content.js file

function send(text) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, text, function (response) {
      console.log(response);
      //alert(response);
    });
  });
} 

//function that fetches the title of the tab in question. This title is sent to
//the backend, which is then sent to OpentheAI, to add more context to  query
function getTitle() {
   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
     tabs[0].url;     //url
     tabs[0].title;   //title
   });
   console.log("URl fetched for"+tabs[0].title);
   return tabs[0].url;
}

//Creates Context Menus shown when the user Right Clicks on a page
chrome.runtime.onInstalled.addListener(function () {
  for (let key of Object.keys(options)) {
    chrome.contextMenus.create({
      id: key,
      title: options[key],
      type:'normal',
      contexts: ['all'],
    });
  }
});

const options = {
  'more_info': 'More Info?',
  //'quantitative Score': 'bias score?', if we want to add to context menue latter
};

// add button call in tha same way as below
// chrome.browserAction.onClicked.addListener(function (tab) {

//callback to handle user option selection
chrome.contextMenus.onClicked.addListener(function (clickData, tabData) {
  if (clickData.menuItemId == 'more_info') {
    var urltocheck = tabData.url
    console.log('more_info on' + tabData.title);
    console.log("URL in question is " + urltocheck);
    var formData = new FormData();
    formData.append("url", urltocheck);

    var xhr = new XMLHttpRequest();
    send("loading");
    xhr.open("GET", "http://127.0.0.1:5000/more_info?url=" + tabData.url+"&title="+tabData.title, true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
      //alert("xhr alert " + "READY STATE IS" + xhr.readyState + "RESPONSE IS" + xhr.response);
      console.log(xhr);
      send(xhr.response)
      if (xhr.readyState == 4) {
        console.log(xhr.response);
        //alert("more info alert" + xhr.response.text);
        send(xhr.response);
      }
    }
    xhr.send();
  }
});

