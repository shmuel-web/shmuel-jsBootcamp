var app = app || {};



app.dynamicEventListeners = (function () {

    var displayItemBtn = $('.secondary-content');

    displayItemBtn.on('click', function (e) {
        var itemId = e.target.getAttribute('data-id');
        app.view.displayItem(itemId);
        console.log(itemId);
    });
});

app.eventListeners = (function () {

    var upBtn = $('#up-btn');
    var addGroupBtn = $('#add-group');
    var addContactBtn = $('#add-contact');
    var addPhoneBtn = $('#add-phone-num');
    var deleteBtn = $('#delete-btn');
    var itemView = $('.item-view');

    upBtn.click(function (e) {
        var parentId = upBtn.attr('data-parent');
        app.view.displayItem(parentId);
        console.log(parentId);
    });

    //events for the FAB

    addGroupBtn.click(function(){
        app.view.addGroupInputField();
        var cancelInputBtn = $('#cancel-input');
        var submit = $('#submit');
        cancelInputBtn.click(function (){
            app.view.removeInput();
        });
        submit.click(function(){
            //todo
            var inputFields = $('li[data-add|="true"]');
            console.log(inputFields);
        });
    });

    addContactBtn.click(function(){
        app.view.addContactInputField();
        var cancelInputBtn = $('#cancel-input');
        cancelInputBtn.click(function (){
            app.view.removeInput();
        });
        var addContactForm = $('#add-contact');
        addContactForm.on('submit',function(e){
            e.preventDefault();
            var firstName = $('#first_name').val();
            var lastName = $('#last_name').val();
            var phoneNumber = $('#number').val();
            var itemId = itemView.attr('data-id')
            var group = app.phoneBook.getItemById(itemId);

            group.addContact(firstName,lastName,phoneNumber,function(){
                app.view.removeInput();
                Materialize.toast('a new phone book contact was created', 4000)
                app.view.showNewChildItem(itemId);
            });
        })
    });

    addPhoneBtn.click(function(){
        app.view.addPhoneNumInputField();
        var cancelInputBtn = $('#cancel-input');
        cancelInputBtn.click(function (){
            app.view.removeInput();
        });
    });

    deleteBtn.click(function(){
    //    show confermation modal
        $('#delete-modal').openModal();
        $('#delete-confirm').click(function(){
            var itemId = itemView.attr('data-id');
            //    delete from the phone book
            app.phoneBook.deleteItem(itemId,function(){
                //    dispaly items parent group by triggering a click event on the up btn
                upBtn.click();
                $('#delete-modal').closeModal();
                Materialize.toast('phone book item was deleted', 4000);
            });
        });

    });

})();