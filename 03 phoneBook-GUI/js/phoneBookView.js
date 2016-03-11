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

    function reDrawTable(tableLocatinID,contactsArry){
        //seting the default location to the contact table and the current group contacts
        var tableLocatinID = tableLocatinID || 'contacts-table';
        var contactsArry =contactsArry || currentGroup.items;
        //todo remove current table from dom
        var table = document.getElementById(tableLocatinID);
        table.innerHTML = "";

        //todo add new table to dom
//      adding the table head
        table.innerHTML = "<tr> <th>First name</th> <th>Last name</th> <th>Phone number</th> <th>delete</th> </tr>";

        var td = document.createElement('td');

        if (contactsArry.length > 0){
            contactsArry.forEach(function(item){
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

    function toggleSearchResultPanel(){
        var resultPanel = document.querySelector('.search-result');
        var searchBtn = document.querySelector('#search-icon');
        var resultPanelState = resultPanel.getAttribute('style');
        if (resultPanelState == 'display: block'){
            resultPanel.setAttribute('style','display: none');
            searchBtn.setAttribute('src','Icon-search.svg');
        }
        else{
            resultPanel.setAttribute('style','display: block');
            searchBtn.setAttribute('src','Icon-x-circle.svg');
        }

    }

    function hideResultPanel(){
        var resultPanel = document.querySelector('.search-result');
        resultPanel.setAttribute('style',' display: none');
    }

    function showContactsPanel(){
        document.getElementById('contacts-btn').click();
    }


    return {
        displayDirectory:displayDirectory,//done
        reDisplayDirectory:reDisplayDirectory,
        displayCurrentGroup:displayCurrentGroup,//done
        displayCurrentGroupContacts:reDrawTable,
        displaySearchResultTable:reDrawTable,
        deleteGroupView:deleteGroupView,
        toggleSearchResultPanel:toggleSearchResultPanel,
        showContactsPanel:showContactsPanel,
        hideResultPanel:hideResultPanel,


    }
})();


