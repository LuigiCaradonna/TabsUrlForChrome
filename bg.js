// Listens for the click on the extension's button
chrome.action.onClicked.addListener((tab) => {
  // Gets the open tabs and sends them to the content script through a message
  getCurrentWindowTabs().then((tabs) => {
    chrome.tabs.sendMessage( tab.id, {data: tabs});
    // const id = tab.id;
    // chrome.scripting.executeScript({
    //   target: {id: {data: tabs}},
    //   files: ['cs.js']
    // });
  });
});

// Returns the open tabs
function getCurrentWindowTabs() {
  return chrome.tabs.query({currentWindow: true});
}

chrome.runtime.onMessage.addListener(
  function (request, sender) {

    // Open the stored tabs
    if (request.action != undefined && request.action == 'open_stored') {
      for (const [key, value] of Object.entries( request.data ))  {
          let url = value.url;
          chrome.tabs.create({url: url});
      }
    }
});
