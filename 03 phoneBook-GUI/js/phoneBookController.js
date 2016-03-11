/**
 * this layer is all about event handlers for the UI
 */
var controller = (function(){
    function createContactFormHandler (e) {
        e.preventDefault();
        var inputs = document.querySelectorAll('.create-contact input');
        var fName = inputs[0].value;
        var lName = inputs[1].value;
        var phoneNums = [];
        for(var i = 2; i < inputs.length - 2; i++){
            phoneNums.push(inputs[i].value);
        }
        //create new contact
        modalLayer.createContact(fName, lName, phoneNums);
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
        modalLayer.writeToLocalStorage();
    }

    function directoryClick (e){
        //todo
        var groupName = e.srcElement.innerText;
        modalLayer.changeCurrentGroupByName(groupName);
        viewLayer.displayCurrentGroup();
        viewLayer.displayCurrentGroupContacts();
        viewLayer.showContactsPanel();
    }

    function tableClick(e){
        var itemId = e.srcElement.getAttribute('item-id');
        if (itemId){
            modalLayer.deleteContact(itemId);
            modalLayer.writeToLocalStorage();
            viewLayer.displayCurrentGroupContacts();
        }
    }

    function addPhoneNumber(){
//        todo
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
        console.log(searchParam,foundItems);
        viewLayer.displaySearchResultTable('result-table',foundItems);
    //    displaying the results
        viewLayer.toggleSearchResultPanel();
    }

    return {
        createContactFormHandler:createContactFormHandler,
        createGroupFormHandler:createGroupFormHandler,
        deleteGroupFormHandler:deleteGroupFormHandler,
        directoryClick:directoryClick,
        tableClick:tableClick,
        addPhoneNumber:addPhoneNumber,
        searchContact:searchContact,
    };
})();

