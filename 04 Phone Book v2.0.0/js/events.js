var app = app || {};

app.dynamicEventListeners = (function () {

    var dispalyItemBtn = $('.secondary-content');

    dispalyItemBtn.on('click', function (e) {
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
    });

    addContactBtn.click(function(){
        app.view.addContactInputField();
    });

    addPhoneBtn.click(function(){
        console.log(addPhoneBtn);
        app.view.addPhoneNumInputField();
    });

})();