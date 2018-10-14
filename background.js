//***************STARY EXECUTE********************************
/*chrome.webNavigation.onCompleted.addListener(function () {
    chrome.tabs.executeScript(null, {
        file: "sup.js"
    }, function(result){console.log("js execute -- "+result);})
});*/
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.imageCheckout == 'false') {
        chrome.contentSettings.images.set({
            'primaryPattern': "*://www.supremenewyork.com/*",
            'setting': 'allow'
        })
    }
    if (request.imageCheckout == true) {
        chrome.contentSettings.images.set({
            'primaryPattern': "*://www.supremenewyork.com/*",
            'setting': 'block'
        })

    }
    var opt = {
        type: "basic",
        title: request.title,
        message: request.message,
        iconUrl: "48.png"
    }
    console.log('rdy?');

    function callback() {
        console.log('done');
    }
    if (request.notifyPop == "true") {
        sendResponse(chrome.notifications.create(opt, callback));
    }
})
