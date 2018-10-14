'use strict';
function hasClass(element, clss) {
    return (' ' + element.className + ' ').indexOf(' ' + clss + ' ') > -1;
}

function cart() {
    if (hasClass(document.getElementById("container"), "has-cart") === true) {
        document.location.href = 'https://www.supremenewyork.com/checkout';
    } else {
        setTimeout(function () {
            cart();
        }, 0);
    }
}
cart();
chrome.storage.local.get({
    itemSizeStorage: '',
    cssStorage: ''
}, function (cop) {
        console.log(cop.cssStorage);
        if(cop.cssStorage == true){
        var element = document.querySelector('[rel="stylesheet"]');
        var stylesheet = element.sheet || element.styleSheet;
        //console.log(stylesheet);
        stylesheet.disabled = true;
    }
//    try {
        var clickbttn = document.getElementById("add-remove-buttons").getElementsByClassName("button")[0];
        var dnclickbttn = document.getElementById("cart-remove");
        //            try {
        if (dnclickbttn === null) {
            var optionsD = document.getElementById("size").options,
                name = cop.itemSizeStorage;
            for (var i = 0, optionsDlength = optionsD.length; i < optionsDlength; i++) {
                if (optionsD[i].text == name) {
                    console.log(i+" supcheckout");
                    optionsD[i].selected = true;
                    clickbttn.click();
                    chrome.runtime.sendMessage({
                        notifyPop: "true",
                        title: "ADDED TO CART",
                        message: "Item size: " + name
                    });
                    chrome.runtime.sendMessage({
                        imageCheckout: "false"
                    });
                    console.log("img");
                }
            }
        }
        //            } catch (err) {
        //                clickbttn.click();
        //            }
//    } catch (err) {
//        console.log("clickshop(); error");
//        console.log(err);
//    }
    //        cart();
});
