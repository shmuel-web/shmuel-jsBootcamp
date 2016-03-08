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
        displayDirectory:displayDirectory,
        displayCurrentGroup:displayCurrentGroup,//done
        displayCurrentGroupContacts:displayCurrentGroupContacts,
        createGroupForm:createGroupForm,
        createContactForm:createContactForm,
        deleteGroupView:deleteGroupView,
        displaySearchResults:displaySearchResults,
    }
})();


