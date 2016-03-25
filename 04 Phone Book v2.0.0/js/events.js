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
    });

    addPhoneBtn.click(function(){
        app.view.addPhoneNumInputField();
        var cancelInputBtn = $('#cancel-input');
        cancelInputBtn.click(function (){
            app.view.removeInput();
        });
    });

})();