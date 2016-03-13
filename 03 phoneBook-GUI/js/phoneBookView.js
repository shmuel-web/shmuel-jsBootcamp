/*
 * this layer is all about writing to the DOM
 * */

var viewLayer = (function () {

    var directory = document.getElementById('directory');

    function displayDirectory(item) {
        var item = item || modalLayer.getAllItems;

        if (item.name) {
            var li = document.createElement('li');
            li.innerHTML = item.name;
            directory.appendChild(li);
            if (item.items.length > 0) {
                var ul = document.createElement('ul');
                directory = directory.appendChild(ul);
                item.items.forEach(function (childItem) {
                    displayDirectory(childItem);
                });
                directory = directory.parentNode;
            }
        }
    }

    function displayCurrentGroupName() {
        var title = document.querySelector("#current-group-title");
        if (currentGroup.name == '~') {
            title.innerText = 'Phone Book';
            toggleDeleteGroupBtn();//removes the delete group btn because root cant be deleted
        }
        else {
            title.innerText = currentGroup.name;
            toggleDeleteGroupBtn();//displays the delete group btn for all the groups
        }
    }

    function reDrawTable(tableLocatinID, contactsArry) {
        //seting the default location to draw the table and default array of contacts to work on
        var tableLocatinID = tableLocatinID || 'contacts-table';
        var contactsArry = contactsArry ||
            currentGroup.items.filter(function (item) {//filtering the array for contacts only
                if (item.firstName) {
                    return item;
                }
            });

        var table = document.getElementById(tableLocatinID);
        //remove current table from the DOM
        table.innerHTML = "";

        var td = document.createElement('td');
        if (contactsArry.length > 0) {
            //adding the table head
            table.innerHTML = "<tr> <th>First name</th> <th>Last name</th> <th>Phone number</th> <th>delete</th> </tr>";
            //adding table row per contact
            contactsArry.forEach(function (item) {

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
                td.setAttribute('item-id', item.id);
                td.setAttribute('class', 'delete-contact-btn pointer')
                newRow.appendChild(td);
                table.appendChild(newRow);

            });
        }
        else if (tableLocatinID == 'result-table') {
            table.innerHTML = "<tr> <th>No contacts found</th> </tr>";
        }
        else {
            table.innerHTML = "<tr> <th>No contacts available </th> </tr>";
        }
    }

    function reDisplayDirectory() {
        var directory = document.getElementById('directory');
        directory.innerHTML = "";
        displayDirectory();
    }

    function toggleSearchResultPanel() {
        var resultPanel = document.querySelector('.search-result');
        var searchBtn = document.querySelector('#search-icon');
        var resultPanelState = resultPanel.getAttribute('style');
        if (resultPanelState == 'display: block') {
            resultPanel.setAttribute('style', 'display: none');
            searchBtn.setAttribute('src', 'Icon-search.svg');
            document.getElementById('search-bar').value = "";
        }
        else {
            resultPanel.setAttribute('style', 'display: block');
            searchBtn.setAttribute('src', 'Icon-x-circle.svg');
        }
    }

    function hideResultPanel() {
        var resultPanel = document.querySelector('.search-result');
        resultPanel.setAttribute('style', ' display: none');
    }

    function showContactsPanel() {
        document.getElementById('contacts-btn').click();
    }

    function showPanel(e) {
        var panelList = document.querySelectorAll('.panel');
        var panelzArray = Array.prototype.slice.call(panelList);
        var data = e.target.getAttribute("data-val");
        var panel = document.getElementById(data);

        //removing each of the panelz from screen
        panelzArray.forEach(function (panel) {
            panel.setAttribute('style', ' display: none');
        });
        //making the clicked on tab visible
        panel.setAttribute('style', ' display: block');
        //
        if (data == '1') {//this means a click event on the firs tab
            viewLayer.displayCurrentGroupContacts();//which trirgers a re draw of the current group contacts table
        }
    }

    function toggleDeleteGroupBtn(){
        var deleteTab = document.querySelector('.delete-tab');
        var deleteTabState = deleteTab.getAttribute('style');
        if (deleteTabState == 'display:none' && currentGroup.name != '~'){
            deleteTab.setAttribute('style','display:inline-block');
        }
        else if (currentGroup.name == '~'){
            deleteTab.setAttribute('style','display:none');
        }
    }

    function addPhoneNumberInput (){
        var input = document.createElement('input');
        input.setAttribute('placeholder', "Phone Numbers");
        var inputContainer = document.querySelector(".input-field-container");
        inputContainer.appendChild(input);
    }

    return {
        displayDirectory: displayDirectory,//done
        reDisplayDirectory: reDisplayDirectory,
        displayCurrentGroup: displayCurrentGroupName,//done
        displayCurrentGroupContacts: reDrawTable,
        displaySearchResultTable: reDrawTable,
        toggleSearchResultPanel: toggleSearchResultPanel,
        showPanel: showPanel,
        showContactsPanel: showContactsPanel,
        hideResultPanel: hideResultPanel,
        addPhoneNumberInput:addPhoneNumberInput,


    }
})();


