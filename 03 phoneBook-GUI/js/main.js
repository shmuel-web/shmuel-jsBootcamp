/*
* this file contains all the UI functionality
* */
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
        switch(data){
            case '1':
                viewLayer.displayCurrentGroupContacts();
                break;
            case '4':
                Controller.deleteGroup();
                break;

        }
    }

    (function panel1Init (){
        var panel = document.getElementById("1");
        panel.setAttribute('style',' display: block');
        viewLayer.displayCurrentGroupContacts();
    })();
})();

(function formz(){
    //adding event listenerz
    var form = document.querySelector(".create-contact");
    form.addEventListener('submit',function(e){
        Controller.createContactFormHandler(e);
    });
    form = document.querySelector(".create-group");
    form.addEventListener('submit',function(e){
        Controller.createGroupFormHandler(e);
    });
})();

(function directory(){
    var directory = document.getElementById('directory');
    function directoryClick (e){
        //todo
        var groupName = e.srcElement.innerText;
        modalLayer.changeCurrentGroup(groupName);
        viewLayer.displayCurrentGroup();
    }

    directory.addEventListener('click',function(e){
        directoryClick(e)
    });
})();

(function init(){
    window.onload = function() {
        modalLayer.readFromLocalStorage();
        viewLayer.displayDirectory();
        viewLayer.displayCurrentGroup();
    }
})();









