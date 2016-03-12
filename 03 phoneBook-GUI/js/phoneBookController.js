/**
 * this layer is all about event handlers for the UI
 */
var controller = (function(){
    function createContactFormHandler (e) {
        e.preventDefault();
        var inputs = document.querySelectorAll('.create-contact input');
        var fName = inputs[0].value;
        var lName = inputs[1].value;
        var phoneNumbers = [];
        for(var i = 2; i < inputs.length - 2; i++){
            phoneNumbers.push(inputs[i].value);
        }
        //create new contact
        modalLayer.createContact(fName, lName, phoneNumbers);
        //clean up the form
        e.target.reset();
        modalLayer.writeToLocalStorage();
    }

    function createGroupFormHandler (e){
        e.preventDefault();
        var inputs = document.querySelectorAll('.create-group input');
        var name = inputs[0].value;
        //create new group
        modalLayer.createGroup(name);
        //clean up the form
        e.target.reset();
        modalLayer.writeToLocalStorage();
        viewLayer.reDisplayDirectory();
    }

    function deleteGroupFormHandler(){
        modalLayer.deleteGroup(currentGroup.id);
        viewLayer.reDisplayDirectory();
        viewLayer.displayCurrentGroup();
        modalLayer.writeToLocalStorage();
    }

    function directoryClick (e){
        //geting the name of the group the user clicked on
        var groupName = e.srcElement.innerText;
        modalLayer.changeCurrentGroupByName(groupName);
        viewLayer.displayCurrentGroup();
        viewLayer.displayCurrentGroupContacts();
        viewLayer.showContactsPanel();
    }

    function tableClick(e){
        //geting the id of the contact the user wish to delete
        var itemId = e.srcElement.getAttribute('item-id');
        if (itemId){
            modalLayer.deleteContact(itemId);
            //saving changes
            modalLayer.writeToLocalStorage();
            //reflecting chnges to the user
            viewLayer.displayCurrentGroupContacts();
        }
    }

    //this function adds another phone number input field to the create contact form

    function addPhoneNumber(){
        var input = document.createElement('input');
        input.setAttribute('placeholder',"Phone Numbers");
        var inputContainer = document.querySelector(".input-field-container");
        inputContainer.appendChild(input);
    }

    function searchContact (e){
        //    geting the search param from the DOM
        var searchParam = e.target.parentNode.previousSibling.previousSibling.value;
        //    geting the results from the modal
        var foundItems = modalLayer.find(searchParam);
        //    printing the results table
        viewLayer.displaySearchResultTable('result-table',foundItems);
        //    displaying the results
        viewLayer.toggleSearchResultPanel();
    }

    function deleteContactFromSearchBar(){
        //    geting the search param from the DOM
        var searchParam = document.getElementById('search-bar').value;
        //    geting the results from the modal
        var foundItems = modalLayer.find(searchParam);
        //    printing the results table
        console.log(searchParam,foundItems);
        viewLayer.displaySearchResultTable('result-table',foundItems);

    }

    return {
        createContactFormHandler:createContactFormHandler,
        createGroupFormHandler:createGroupFormHandler,
        deleteGroupFormHandler:deleteGroupFormHandler,
        directoryClick:directoryClick,
        tableClick:tableClick,
        addPhoneNumber:addPhoneNumber,
        searchContact:searchContact,
        deleteContactFromSearchBar:deleteContactFromSearchBar,
    };
})();

