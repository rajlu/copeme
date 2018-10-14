'use strict';
chrome.storage.local.get({
    itemNameStorage: '',
    itemColorStorage: '',
    imagesStorage: '',
    cssStorage: ''
}, function (cop) {
    console.log(cop.cssStorage);
    if (cop.cssStorage == true) {
        var element = document.querySelector('[rel="stylesheet"]');
        var stylesheet = element.sheet || element.styleSheet;
        //console.log(stylesheet);
        stylesheet.disabled = true;
    }
    if (window.location.href.includes("cart") === true) {
        console.log("2 if");
        console.log("cart");
    } else {
        chrome.runtime.sendMessage({
            imageCheckout: cop.imagesStorage
        });
        var eleichild = document.getElementById("container").childNodes,
            itemNameRegExp = new RegExp(cop.itemNameStorage, "i"),
            itemColorRegExp = new RegExp(cop.itemColorStorage, "i");
        for (var a = 0, eleichildlength = eleichild.length; a < eleichildlength; a++) {
            var tldr = eleichild[a].getElementsByClassName("inner-article")[0].getElementsByTagName("h1")[0].getElementsByClassName("name-link")[0];
            var tldr2 = eleichild[a].getElementsByClassName("inner-article")[0].getElementsByTagName("p")[0].getElementsByClassName("name-link")[0];
            //            console.log("start() count: " + a);
            if (tldr.innerHTML.search(itemNameRegExp) >= 0) {
                if (tldr2.innerHTML.search(itemColorRegExp) >= 0) {
                    window.location.href = tldr.href;
                    chrome.runtime.sendMessage({
                        notifyPop: "true",
                        title: "ITEM TO BE ADDED",
                        message: "Item name: " + tldr.innerHTML + " | " + "Item color: " + tldr2.innerHTML
                    });
                    break;
                }
            } else {
                if (a + 1 == eleichildlength) {
                    chrome.storage.local.get({
                        refreshStorage: '',
                        refreshTStorage: '',
                        timerStorage: ''
                    }, function (cop) {
                        if (cop.timerStorage == true) {
                            var date = new Date().toLocaleTimeString(),
                                hh = date.substr(0, 2),
                                mm = date.substr(3, 2),
                                ss = date.substr(6, 2),
                                totalss = 0,
                                supremedrop = 25200; //43200 - 12:00
                            hh = parseInt(hh, 10);mm = parseInt(mm, 10);ss = parseInt(ss, 10);
                            hh *= 3600;
                            mm *= 60;
                            totalss = hh + mm + ss;
                            totalss = supremedrop - totalss;
                            totalss *= 1000;
                            setTimeout(function () {
                                chrome.storage.local.set({
                                    timerStorage: false,
                                }, function () {});
                                location.reload();
                            }, totalss);
                        } else {
                            if (window.location.href.includes("checkout") === false && cop.refreshStorage === true && window.location.href.includes("cart") === false) {
                                setTimeout(function () {
                                    location.reload();
                                }, cop.refreshTStorage);
                            }
                        }
                    })
                }
            }
        }
    }
});