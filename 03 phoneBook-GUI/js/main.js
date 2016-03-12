/*
* this file contains all the UI functionality
* */


//todo search result view
//todo show multipale phone numberz
(function tabzNavigation(){
    var navList = document.querySelectorAll('nav li'); //gets a node list
    var navArray = Array.prototype.slice.call(navList); // converts NodeList to Array

    var panelList = document.querySelectorAll('.panel');
    var panelzArray = Array.prototype.slice.call(panelList);


    navArray.forEach(function(panel){
        panel.addEventListener('click',showPanel);
    });

    function showPanel(event){
        var data = event.target.getAttribute("data-val");
        var panel = document.getElementById(data);

        //removing each of the panelz from screen
        panelzArray.forEach(function(panel){
            panel.setAttribute('style',' display: none') ;
        });
        //making the clicked on tab visible
        panel.setAttribute('style',' display: block');
        //
        if (data == '1'){//this means a click event on the firs tab
            viewLayer.displayCurrentGroupContacts();//which trirgers a re draw of the current group contacts table
        }
    }


})();

(function formz(){
    //adding event listenerz
    var form = document.querySelector(".create-contact")

    form.addEventListener('submit',function(e){
        controller.createContactFormHandler(e);
        viewLayer.showContactsPanel();
    });

    form = document.querySelector(".create-group");
    form.addEventListener('submit',function(e){
        controller.createGroupFormHandler(e);
        viewLayer.showContacts();
    });

    form = document.querySelector("#delete-group");
    form.addEventListener('submit',function(e){
        controller.deleteGroupFormHandler(e);
        viewLayer.showContactsPanel();
    });

    var addPhoneNumbers = document.getElementById('add-Phone-num');
    addPhoneNumbers.addEventListener('click',function(e){
        controller.addPhoneNumber(e);
    })
})();

(function directory(){
    var directory = document.getElementById('directory');


    directory.addEventListener('click',function(e){
        controller.directoryClick(e);
    });

    var resetBtn = document.querySelector('#reset');
    resetBtn.addEventListener('click',function(){
        modalLayer.resetData();
        modalLayer.readFromLocalStorage();
        viewLayer.reDisplayDirectory();
        viewLayer.displayCurrentGroup();
        viewLayer.displayCurrentGroupContacts();

    })
})();

(function deleteContact(){
    var table = document.getElementById('contacts-table');
    table.addEventListener('click',function (e){
        controller.tableClick(e);
    });
    var table = document.getElementById('result-table');
    table.addEventListener('click',function (e){
        controller.tableClick(e);
        controller.deleteContactFromSearchBar();

    });
})();

(function init(){
    window.onload = function() {
        modalLayer.readFromLocalStorage();
        viewLayer.displayDirectory();
        viewLayer.displayCurrentGroup();
        (function panel1Init (){
            var panel = document.getElementById("1");
            panel.setAttribute('style',' display: block');
            viewLayer.displayCurrentGroupContacts();
        })();
    }
})();

(function search() {
    var searchBtn = document.querySelector('#search-icon');
    searchBtn.addEventListener('click',function(e){
        controller.searchContact(e);
    })
})();








