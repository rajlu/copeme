'use strict';
chrome.storage.local.get({
    fullName: 'Imie i nazwisko',
    email: 'email',
    tel: '000000000',
    address: 'address',
    address2: 'address2',
    address3: 'address3',
    city: 'city',
    postcode: 'postcode',
    country: 'country',
    creditCard: 'creditCard',
    creditCardNumber: 'creditCardNumber',
    month: 'month',
    year: 'year',
    ccv: 'ccv',
    delayTStorage: ''
}, function (items) {
    setTimeout(function () {
        document.getElementById("pay").getElementsByClassName("checkout")[0].click();
    }, items.delayTStorage);
    document.getElementById("order_billing_name").value = items.fullName;
    document.getElementById("order_email").value = items.email;
    document.getElementById('order_tel').value = items.tel;
    document.getElementById('bo').value = items.address;
    document.getElementById('oba3').value = items.address2;
    document.getElementById('order_billing_address_3').value = items.address3;
    document.getElementById('order_billing_city').value = items.city;
    document.getElementById('order_billing_zip').value = items.postcode;
    document.getElementById('order_billing_country').value = items.country;
    document.getElementById('credit_card_type').value = items.creditCard;
    document.getElementById('cnb').value = items.creditCardNumber;
    document.getElementById('credit_card_month').value = items.month;
    document.getElementById('credit_card_year').value = items.year;
    document.getElementById('vval').value = items.ccv;
    document.getElementById("order_terms").checked = true;
    chrome.runtime.sendMessage({
        notifyPop: "true",
        title: "DELAY PAYMENT",
        message: "= " + items.delayTStorage + "ms",
    });
});
