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
    }

    function tableClick(e){
        var itemId = e.srcElement.getAttribute('item-id');
        if (itemId){
            modalLayer.deleteContact(itemId);
            modalLayer.writeToLocalStorage();
            viewLayer.displayCurrentGroupContacts();
        }
    }

    function addPhoneNumber(e){
//        todo
        var input = document.createElement('input');
        input.setAttribute('placeholder',"Phone Numbers");
        var inputContainer = document.querySelector(".input-field-container");
        inputContainer.appendChild(input);

        /*        form = document.querySelector(".create-contact");
                var btn = e.targete
                var input = document.createElement('input');
                input.setAttribute('placeholder',"Phone Numbers");
                var inputPhoneNumber = document.getElementById('input-phone-number');
                form.insertBefore(inputPhoneNumber,btn);*/
    }

    return {
        createContactFormHandler:createContactFormHandler,
        createGroupFormHandler:createGroupFormHandler,
        deleteGroupFormHandler:deleteGroupFormHandler,
        directoryClick:directoryClick,
        tableClick:tableClick,
        addPhoneNumber:addPhoneNumber,
    };
})();

