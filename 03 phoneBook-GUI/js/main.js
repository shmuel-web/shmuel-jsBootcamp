/*
 * this file contains all the UI event listeners
 * separated to UI components
 * */

(function tabzNavigation() {
    var tabList = document.querySelectorAll('nav li'); //gets a node list of all nav btn'z
    var tabArray = Array.prototype.slice.call(tabList); // converts NodeList to Array

    tabArray.forEach(function (tabBtn) {
        tabBtn.addEventListener('click', function (e) {
            viewLayer.showPanel(e);
        });
    });

})();

(function formz() {
    //adding some more event  listenerz
    var form = document.querySelector(".create-contact")

    form.addEventListener('submit', function (e) {
        controller.createContactFormHandler(e);
    });

    form = document.querySelector(".create-group");
    form.addEventListener('submit', function (e) {
        controller.createGroupFormHandler(e);

    });

    form = document.querySelector("#delete-group");
    form.addEventListener('submit', function (e) {
        controller.deleteGroupFormHandler(e);
    });

    var addPhoneNumbers = document.getElementById('add-Phone-num');
    addPhoneNumbers.addEventListener('click', function (e) {
        controller.addPhoneNumber(e);
    })
})();

(function groupsDirectoryTree() {
    var directory = document.getElementById('directory');


    directory.addEventListener('click', function (e) {
        controller.directoryClick(e);
    });

    var resetBtn = document.querySelector('#reset');
    resetBtn.addEventListener('click', function () {
        controller.restoreDefault();
    })
})();

(function deleteContact() {
    var table = document.getElementById('contacts-table');
    table.addEventListener('click', function (e) {
        controller.tableClick(e);
    });
    var table = document.getElementById('result-table');
    table.addEventListener('click', function (e) {
        controller.tableClick(e);
        controller.deleteContactFromSearchBar();

    });
})();

(function searchBar() {
    var searchBtn = document.querySelector('#search-icon');
    searchBtn.addEventListener('click', function (e) {
        controller.searchContact(e);
    })
})();

(function init() {
    window.onload = function () {
        modalLayer.readFromLocalStorage();
        viewLayer.displayDirectory();
        viewLayer.displayCurrentGroup();
        (function panel1Init() {
            var panel = document.getElementById("1");
            panel.setAttribute('style', ' display: block');
            viewLayer.displayCurrentGroupContacts();
        })();
    }
})();










