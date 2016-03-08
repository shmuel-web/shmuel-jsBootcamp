/**
 * this layer is all about event handlers for the UI
 */
var Controller = (function(){
    function createContactFormHandler (e) {
        e.preventDefault();
        var inputs = document.querySelectorAll('.create-contact input');
        var fName = inputs[0].value;
        var lName = inputs[1].value;
        var phoneNums = inputs[2].value;
        //create new contact
        modalLayer.createContact(fName, lName, phoneNums);
        //clean up the form
        e.target.reset();
    }

    function createGroupFormHandler (e){
        e.preventDefault();
        var inputs = document.querySelectorAll('.create-group input');
        var name = inputs[0].value;
        //create new group
        modalLayer.createGroup(name);
        //clean up the form
        e.target.reset();
    }

    return {
        createContactFormHandler:createContactFormHandler,
        createGroupFormHandler:createGroupFormHandler,
    };
})();

