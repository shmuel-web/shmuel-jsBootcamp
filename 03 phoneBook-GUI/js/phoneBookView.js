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

        console.log(currentGroup.name);
        if (currentGroup.name == '~'){
            title.innerText = 'Phone Book';
        }
        else{
            title.innerText = currentGroup.name ;
        }

    }

    function reDrawTable(){
        //todo remove current table from dom
        var table = document.getElementById('contacts-table');
        table.innerHTML = "";

        //todo add new table to dom
//      adding the table head
        table.innerHTML = "<tr> <th>First name</th> <th>Last name</th> <th>Phone number</th> <th>delete</th> </tr>";

        var td = document.createElement('td');

        if (currentGroup.items.length > 0){
            currentGroup.items.forEach(function(item){
                if(item.firstName){
                    var newRow = document.createElement('tr');
                    td = document.createElement('td');
                    td.innerHTML = item.firstName;
                    newRow.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = item.lastName;
                    newRow.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = item.phoneNumbers;
                    newRow.appendChild(td);
                    td = document.createElement('td');
                    td.innerHTML = "delete";
                    td.setAttribute('item-id',item.id);
                    td.setAttribute('class','delete-contact-btn pointer')
                    newRow.appendChild(td);
                    table.appendChild(newRow);

                }
            });


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
        displayCurrentGroupContacts:reDrawTable,
        deleteGroupView:deleteGroupView,
        displaySearchResults:displaySearchResults,

    }
})();


