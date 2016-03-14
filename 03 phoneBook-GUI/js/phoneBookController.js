/**
 * this layer is all about event handlers for the UI
 */
var controller = (function () {
    function createContactFormHandler(e) {
        e.preventDefault();
        var inputs = document.querySelectorAll('.create-contact input');
        var fName = inputs[0].value;
        var lName = inputs[1].value;
        var phoneNumbers = [];
        for (var i = 2; i < inputs.length - 2; i++) {
            phoneNumbers.push(inputs[i].value);
        }
        //create new contact
        modalLayer.createContact(fName, lName, phoneNumbers);
        //clean up the form
        e.target.reset();
        modalLayer.writeToLocalStorage();
        viewLayer.showContactsPanel();
    }

    function createGroupFormHandler(e) {
        e.preventDefault();
        var inputs = document.querySelectorAll('.create-group input');
        var name = inputs[0].value;
        //create new group
        modalLayer.createGroup(name);
        //clean up the form
        e.target.reset();
        modalLayer.writeToLocalStorage();
        viewLayer.reDisplayDirectory();
        viewLayer.showContactsPanel();
    }

    function deleteGroupFormHandler() {
        modalLayer.deleteGroup(currentGroup.id);
        viewLayer.reDisplayDirectory();
        viewLayer.displayCurrentGroup();
        modalLayer.writeToLocalStorage();
        viewLayer.showContactsPanel();
    }

    function directoryClick(e) {
        //geting the name of the group the user clicked on
        var groupName = e.srcElement.innerText;
        modalLayer.changeCurrentGroupByName(groupName);
        viewLayer.displayCurrentGroup();
        viewLayer.displayCurrentGroupContacts();
        viewLayer.showContactsPanel();
    }

    function contactTableDeleteBtnClickHandler(e) {
        //geting the id of the contact the user wish to delete
        var itemId = e.srcElement.getAttribute('item-id');
        if (itemId) {
            modalLayer.deleteContact(itemId);
            //saving changes
            modalLayer.writeToLocalStorage();
            //reflecting changes to the user
            viewLayer.displayCurrentGroupContacts();
        }
    }

    //this function adds another phone number input field to the create contact form
    function addPhoneNumber() {
        viewLayer.addPhoneNumberInput();
    }

    function searchContact(e) {
        //    geting the search param from the DOM
        var searchParam = e.target.parentNode.previousSibling.previousSibling.value;
        //    geting the results from the modal
        var foundItems = modalLayer.find(searchParam);
        //    printing the results table
        viewLayer.displaySearchResultTable('result-table', foundItems);
        //    displaying the results
        viewLayer.toggleSearchResultPanel();
    }

    function deleteContactFromSearchBarResultTable() {
        //    geting the search param from the DOM
        var searchParam = document.getElementById('search-bar').value;
        //    geting the results from the modal
        var foundItems = modalLayer.find(searchParam);
        //    printing the results table
        viewLayer.displaySearchResultTable('result-table', foundItems);
    }

    function restoreDefault() {
        modalLayer.resetData();
        modalLayer.readFromLocalStorage();
        viewLayer.reDisplayDirectory();
        viewLayer.displayCurrentGroup();
        viewLayer.displayCurrentGroupContacts();
    }

    return {
        createContactFormHandler: createContactFormHandler,
        createGroupFormHandler: createGroupFormHandler,
        deleteGroupFormHandler: deleteGroupFormHandler,
        directoryClick: directoryClick,
        tableClick: contactTableDeleteBtnClickHandler,
        addPhoneNumber: addPhoneNumber,
        searchContact: searchContact,
        deleteContactFromSearchBar: deleteContactFromSearchBarResultTable,
        restoreDefault: restoreDefault,
    };
})();

