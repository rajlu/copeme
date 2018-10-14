
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('savebttn').addEventListener('click', save);
    document.getElementById('optionsbttn').addEventListener('click', optionsbttn);
    load();
});
function optionsbttn(){
    chrome.tabs.create({'url': "/options.html" });
}
function images() {
    console.log("images************************");
    if (document.getElementById('imagesCH').checked == true) {
        console.log("images block");
        chrome.contentSettings.images.set({
            'primaryPattern': "*://www.supremenewyork.com/*",
            'setting': 'block'
        })
    } else {
        chrome.contentSettings.images.set({
            'primaryPattern': "*://www.supremenewyork.com/*",
            'setting': 'allow'
        })
    }
}

function save() {
    var itemNameStorage = document.getElementById('itemNameT').value;
    var itemColorStorage = document.getElementById('itemColorT').value;
    var itemSizeStorage = document.querySelector('input[name = "sizesn"]:checked').value;
    var catStorage = document.getElementById('catT').value;
    var refreshStorage = document.getElementById('refreshCH').checked;
    var refreshTStorage = document.getElementById('refreshT').value;
    var categoryStorage = document.getElementById('categoryCH').checked;
    var delayTStorage = document.getElementById('delayT').value;
    var imagesStorage = document.getElementById('imagesCH').checked;
    var cssStorage = document.getElementById('cssCH').checked;
    var timerStorage = document.getElementById('timerCH').checked;
    chrome.storage.local.set({
        itemNameStorage: itemNameStorage,
        itemColorStorage: itemColorStorage,
        itemSizeStorage: itemSizeStorage,
        catStorage: catStorage,
        refreshStorage: refreshStorage,
        refreshTStorage: refreshTStorage,
        categoryStorage: categoryStorage,
        delayTStorage: delayTStorage,
        imagesStorage: imagesStorage,
        cssStorage: cssStorage,
        timerStorage: timerStorage,
    }, function () {
    });
    chrome.tabs.getSelected(null, function (tab) {
        var code = "chrome.storage.local.get({catStorage:''},function(cop){document.location.href = 'https://www.supremenewyork.com/shop/all/'+cop.catStorage;})";
        chrome.tabs.executeScript(tab.id, {
            code: code
        });
    });
    images();
//    chrome.tabs.create({ url: 'http://www.supremenewyork.com/shop/all/' + catStorage });
}

function load() {
    chrome.storage.local.get({
        itemNameStorage: '',
        itemColorStorage: '',
        itemSizeStorage: '',
        catStorage: '',
        refreshStorage: '',
        refreshTStorage: '',
        categoryStorage: '',
        delayTStorage: '',
        imagesStorage: '',
        cssStorage: '',
        timerStorage: '',
    }, function (cop) {
        document.getElementById('itemNameT').value = cop.itemNameStorage;
        document.getElementById('itemColorT').value = cop.itemColorStorage;
        console.log(cop.itemSizeStorage);
        document.getElementById(cop.itemSizeStorage).checked = true;
        document.getElementById('catT').value = cop.catStorage;
        document.getElementById('refreshCH').checked = cop.refreshStorage;
        document.getElementById('refreshT').value = cop.refreshTStorage;
        document.getElementById('categoryCH').checked = cop.categoryStorage;
        document.getElementById('delayT').value = cop.delayTStorage;
        document.getElementById('imagesCH').checked = cop.imagesStorage;
        document.getElementById('cssCH').checked = cop.cssStorage;
        document.getElementById('timerCH').checked = cop.timerStorage;
    });

}
