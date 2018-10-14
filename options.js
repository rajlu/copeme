var startYear = new Date().getFullYear();
var howmuchYear = 10;
var optionsYear = "";
for (var year = startYear; year <= startYear + howmuchYear; year++) {
    optionsYear += "<option>" + year + "</option>";
}
document.getElementById("year").innerHTML = optionsYear;

// Saves options to chrome.storage
function save_options() {
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var tel = document.getElementById('tel').value;
    var address = document.getElementById('address').value;
    var address2 = document.getElementById('address2').value;
    var address3 = document.getElementById('address3').value;
    var city = document.getElementById('city').value;
    var postcode = document.getElementById('postcode').value;
    var country = document.getElementById('country').value;
    var creditCard = document.getElementById('creditCard').value;
    var creditCardNumber = document.getElementById('creditCardNumber').value;
    var month = document.getElementById('month').value;
    var year = document.getElementById('year').value;
    var ccv = document.getElementById('ccv').value;
    chrome.storage.local.set({
        fullName: fullName,
        email: email,
        tel: tel,
        address: address,
        address2: address2,
        address3: address3,
        city: city,
        postcode: postcode,
        country: country,
        creditCard: creditCard,
        creditCardNumber: creditCardNumber,
        month: month,
        year: year,
        ccv: ccv
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
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
        ccv: 'ccv'
    }, function (items) {
        document.getElementById('fullName').value = items.fullName;
        document.getElementById('email').value = items.email;
        document.getElementById('tel').value = items.tel;
        document.getElementById('address').value = items.address;
        document.getElementById('address2').value = items.address2;
        document.getElementById('address3').value = items.address3;
        document.getElementById('city').value = items.city;
        document.getElementById('postcode').value = items.postcode;
         document.getElementById('country').value = items.country;
        document.getElementById('creditCard').value = items.creditCard;
        document.getElementById('creditCardNumber').value = items.creditCardNumber;
        document.getElementById('month').value = items.month;
        document.getElementById('year').value = items.year;
        document.getElementById('ccv').value = items.ccv;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
