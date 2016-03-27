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
    var backBtn =  $('#back-btn');
    var addGroupBtn = $('#add-group');
    var addContactBtn = $('#add-contact');
    var addPhoneBtn = $('#add-phone-num');
    var deleteBtn = $('#delete-btn');
    var itemView = $('.item-view');
    var searchBar = $('#search-bar');


    searchBar.on('submit',function(e){
        e.preventDefault();
        var input = $('#search');
        var searchParam = input.val();
        var results = app.phoneBook.search(searchParam);
        app.view.displaySearchResults(results,searchParam);
        e.target.reset();
        input.blur();

    });

    upBtn.click(function (e) {
        var parentId = upBtn.attr('data-parent');
        app.view.displayItem(parentId);
        console.log(parentId);
    })

    backBtn.click(function(){
        var itemId = itemView.attr('data-id');
        app.view.displayItem(itemId)
    });

    //events for the FAB

    addGroupBtn.click(function(){
        app.view.addGroupInputField();
        var cancelInputBtn = $('#cancel-input');
        var submit = $('#submit');
        cancelInputBtn.click(function (){
            app.view.removeInput();
        });
        var addGroupForm = $('#add-group');
        addGroupForm.on('submit', function (e) {
            e.preventDefault();
            var name = $('#group_name').val();
            var itemId = itemView.attr('data-id');

            var group = app.phoneBook.getItemById(itemId);

            group.addSubGroup(name,function(){
                app.view.removeInput();
                Materialize.toast('a new phone book group was created', 4000)
                app.view.showNewChildItem(itemId);
            })
        })
    });

    addContactBtn.click(function(){
        //show the input field
        app.view.addContactInputField();
        //cancel btn
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
            //geting the current group id
            var itemId = itemView.attr('data-id');

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

        var addNumberForm = $('#add-number');
        addNumberForm.on('submit',function(e){
            e.preventDefault();
            var phoneNum = $('#number').val();
            //geting the current group id
            var itemId = itemView.attr('data-id');

            var contact = app.phoneBook.getItemById(itemId);

            contact.addPhoneNumber(phoneNum,function(){
                app.view.removeInput();
                Materialize.toast('a new phone number was added', 4000)
                app.view.showNewChildItem(itemId);
            });
        })

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