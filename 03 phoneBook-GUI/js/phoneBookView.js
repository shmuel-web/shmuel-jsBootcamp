/*
* this layer is all about talking to the DOM
* */

var viewLayer = (function(){

    var directory = document.getElementById('directory');
    function displayDirectory(item){
        var item = item || modalLayer.getAllItems;

        if (item.name){

            var li = document.createElement('li');
            li.innerHTML = item.name;
            directory.appendChild(li);
            if (item.items.length > 0){
                var ul = document.createElement('ul');
                directory = directory.appendChild(ul);
                item.items.forEach(function(childItem){
                    displayDirectory(childItem);
                });
                directory = directory.parentNode;
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
        console.log(currentGroup);
        var table ="";
        if (currentGroup.items > 0){
            currentGroup.items.forEach(function(item){
                if(item.firstName){
                    table = table + item.firstName, item.lastName, item.phoneNum ,item.id + "</br>";
                }
            });
            var tableContainer = document.getElementById("contacts");
            console.log(table);

        }


    }

    function reDisplayDirectory (){
        var directory = document.getElementById('directory');
        directory.innerHTML = "";
        displayDirectory();
    }



    function deleteGroupView(){

    }

    function displaySearchResults(){

    }


    return {
        displayDirectory:displayDirectory,//done
        reDisplayDirectory:reDisplayDirectory,
        displayCurrentGroup:displayCurrentGroup,//done
        displayCurrentGroupContacts:displayCurrentGroupContacts,
        deleteGroupView:deleteGroupView,
        displaySearchResults:displaySearchResults,

    }
})();


