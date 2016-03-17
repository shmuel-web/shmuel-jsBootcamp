/*
 * this file contains all the UI event listeners
 * separated to UI components
 * */
var phoneBook = new PhoneBook;
console.log(phoneBook);


(function tabzNavigation() {
    var tabList = document.querySelectorAll('nav li'); //gets a node list of all nav btn'z
    var tabArray = Array.prototype.slice.call(tabList); // converts NodeList to Array

    tabArray.forEach(function (tabBtn) {
        tabBtn.addEventListener('click', function (e) {
            phoneBook.view.showPanel(e);//todo move to the controller
        });
    });

})();

(function formz() {
    //adding some more event  listenerz
    var form = document.querySelector(".create-contact")

    form.addEventListener('submit', function (e) {
        phoneBook.controller.createContactFormHandler(e);
    });

    form = document.querySelector(".create-group");
    form.addEventListener('submit', function (e) {
        phoneBook.controller.createGroupFormHandler(e);

    });

    form = document.querySelector("#delete-group");
    form.addEventListener('submit', function (e) {
        phoneBook.controller.deleteGroupFormHandler(e);
    });

    var addPhoneNumbers = document.getElementById('add-Phone-num');
    addPhoneNumbers.addEventListener('click', function (e) {
        phoneBook.controller.addPhoneNumber(e);
    })
})();

(function groupsDirectoryTree() {
    var directory = document.getElementById('directory');


    directory.addEventListener('click', function (e) {
        phoneBook.controller.directoryClick(e);
    });

    var resetBtn = document.querySelector('#reset');
    resetBtn.addEventListener('click', function () {
        phoneBook.controller.restoreDefault();
    })
})();

(function deleteContact() {
    var table = document.getElementById('contacts-table');
    table.addEventListener('click', function (e) {
        phoneBook.controller.tableClick(e);
    });
    var table = document.getElementById('result-table');
    table.addEventListener('click', function (e) {
        phoneBook.controller.tableClick(e);
        phoneBook.controller.deleteContactFromSearchBar();

    });
})();

(function searchBar() {
    var searchBtn = document.querySelector('#search-icon');
    searchBtn.addEventListener('click', function (e) {
        phoneBook.controller.searchContact(e);
    })
})();

(function init() {
    window.onload = function () {
        phoneBook.model.readFromLocalStorage();
        phoneBook.view.displayDirectory();
        phoneBook.view.displayCurrentGroup();
        (function panel1Init() {
            var panel = document.getElementById("1");
            panel.setAttribute('style', ' display: block');
            phoneBook.view.displayCurrentGroupContacts();
        })();
    }
})();










