/*
 this is a reviling pattern that extends the PhoneBook class controller property
 it gets PhoneBook 'this' and baiscly adds itself to the PhonBook class as the 'controller' property

 */

function controller (PhoneBook){
    return (function (PhoneBook) {

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
            PhoneBook.model.createContact(fName, lName, phoneNumbers);
            //clean up the form
            e.target.reset();
            PhoneBook.model.writeToLocalStorage();
            PhoneBook.view.showContactsPanel();
        }

        function createGroupFormHandler(e) {
            e.preventDefault();
            var inputs = document.querySelectorAll('.create-group input');
            var name = inputs[0].value;
            //create new group
            PhoneBook.model.createGroup(name);
            //clean up the form
            e.target.reset();
            PhoneBook.model.writeToLocalStorage();
            PhoneBook.view.reDisplayDirectory();
            PhoneBook.view.showContactsPanel();
        }

        function deleteGroupFormHandler() {
            PhoneBook.model.deleteGroup(PhoneBook.currentGroup.id);
            PhoneBook.view.reDisplayDirectory();
            PhoneBook.view.displayCurrentGroup();
            PhoneBook.model.writeToLocalStorage();
            PhoneBook.view.showContactsPanel();
        }

        function directoryClick(e) {
            //geting the name of the group the user clicked on
            var groupName = e.srcElement.innerText;
            PhoneBook.model.changeCurrentGroupByName(groupName);
            PhoneBook.view.displayCurrentGroup();
            PhoneBook.view.displayCurrentGroupContacts();
            PhoneBook.view.showContactsPanel();
        }

        function contactTableDeleteBtnClickHandler(e) {
            //geting the id of the contact the user wish to delete
            var itemId = e.srcElement.getAttribute('item-id');
            if (itemId) {
                PhoneBook.model.deleteContact(itemId);
                //saving changes
                PhoneBook.model.writeToLocalStorage();
                //reflecting changes to the user
                PhoneBook.view.displayCurrentGroupContacts();
            }
        }

        //this function adds another phone number input field to the create contact form
        function addPhoneNumber() {
            PhoneBook.view.addPhoneNumberInput();
        }

        function searchContact(e) {
            //    geting the search param from the DOM
            var searchParam = e.target.parentNode.previousSibling.previousSibling.value;
            //    geting the results from the modal
            var foundItems = model.find(searchParam);
            //    printing the results table
            PhoneBook.view.displaySearchResultTable('result-table', foundItems);
            //    displaying the results
            PhoneBook.view.toggleSearchResultPanel();
        }

        function deleteContactFromSearchBarResultTable() {
            //    geting the search param from the DOM
            var searchParam = document.getElementById('search-bar').value;
            //    geting the results from the modal
            var foundItems = PhoneBook.model.find(searchParam);
            //    printing the results table
            PhoneBook.view.displaySearchResultTable('result-table', foundItems);
        }

        function restoreDefault() {
            PhoneBook.model.resetData();
            PhoneBook.model.readFromLocalStorage();
            PhoneBook.view.reDisplayDirectory();
            PhoneBook.view.displayCurrentGroup();
            PhoneBook.view.displayCurrentGroupContacts();
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
    })(PhoneBook);
}

