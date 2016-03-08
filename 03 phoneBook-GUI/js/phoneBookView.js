/*
* this layer is all about talking to the DOM
* */

var viewLayer = (function(){
    var directory = document.getElementById('directory');
    function displayDirectory(item){
        var item = item || modalLayer.getAllItems;

        if (item.name){
            directory.innerHTML('<li>'+item.name+'</li>');
            directory = directory.firstElementChild;
            if (item.items > 0){
                directory.innerHTML='<ul>';
                directory = directory.firstElementChild;
                item.items.forEach(function(childItem){
                    displayDirectory(childItem);
                });
            directory.innerHTML='</ul>';
            directory = directory.firstElementChild;

            }
        }
    }
    function displayCurrentGroup(){
        var title = document.querySelector("#current-group-title");
        var currentGroup = modalLayer.currentGroup;
        console.log(currentGroup.name);
        if (currentGroup.name == '~'){
            title.innerText = 'Phone Book';
        }
        else{
            title.innerText = currentGroup.name ;
        }

    }

    function displayCurrentGroupContacts(){
        var currentGroup = modalLayer.currentGroup;
        var table ="";
        if (currentGroup.items > 0){
            currentGroup.items.forEach(function(item){
                if(item.firstName){
                    table = table + item.firstName, item.lastName, item.phoneNum ,item.id + "</br>";
                }
            })
            var tableContainer = document.getElementById("contacts");
            tableContainer.innerHTML = table;
        }


    }

    function createGroupForm(){

    }

    function createContactForm (){

    }

    function deleteGroupView(){

    }

    function displaySearchResults(){

    }


    return {
        displayDirectory:displayDirectory,//done
        displayCurrentGroup:displayCurrentGroup,//done
        displayCurrentGroupContacts:displayCurrentGroupContacts,
        createGroupForm:createGroupForm,
        createContactForm:createContactForm,
        deleteGroupView:deleteGroupView,
        displaySearchResults:displaySearchResults,
    }
})();


