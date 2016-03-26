var app = app || {};

app.phoneBook = new app.PhoneBook;

app.view = (function view(phoneBookObj) {

    var phoneBook = phoneBookObj;

    var groupFAB = $('#group-FAB');

    var contactFAB = $('#contact-FAB');

    var title = $('#title');
    var upBtn = $("#up-btn");
    var childItemsContainer = $('.collection');
    var phoneNumbersContainer = childItemsContainer;
    var itemView = $('.item-view');
    var itemIcon = $('.item-view i.large');
    var itemBtnz = $('.item-btnz');

    function displayItem(id) {
        var item = phoneBook.getItemById(id);
        itemView.attr('data-id',item.id);
        if (item.name ) {
            var group = item;
            //remove the current item from view
            title.empty();
            itemIcon.empty();
            //    add the parent id to the up btn
            upBtn.attr('data-parent', item.parent.id);
            if (item.name != "Root"){
                //    print group name
                title.prepend(item.name);
                //    print icon
                itemIcon.html('group');
                itemBtnz.show();
                upBtn.show();
            }
            else if (item.name =="Root"){
                //    print group name
                title.prepend('Phone-Book');
                //    print icon
                itemIcon.html('contact_phone');
                itemBtnz.hide();
                upBtn.hide();
            }
            //    print child items
            printGroupChildItems(item.childItems);
            showGroupFAB();
        }
        else if (item.fName) {
            var contact = item;
            //    add the parent id to the up btn
            upBtn.attr('data-parent', item.parent.id);
            //    print contact name
            title.empty();
            title.prepend(item.fName+" "+item.lName);
            //print icon
            itemIcon.empty();
            itemIcon.html('person');
            itemBtnz.show().attr('data-id',item.id);
            upBtn.show();
            //    print contact phone numbers
            printPhoneNumbers(item.phoneNum);

            showContactFAb();
        }
        app.dynamicEventListeners();
    }

    function changeCurrentItem() {

    }

    function displaySearchResults() {
        //geting the results from the bl

    }

    function printGroupChildItems(itemsArray){
        childItemsContainer.empty();
        itemsArray.forEach(function(item){
            if(item.name){
                childItemsContainer.prepend(
                    '<li class="collection-item avatar"> ' +
                        '<i class="material-icons circle blue">group</i> ' +
                        '<span class="title">'+ item.name +'</span> ' +
                        '<p class="grey-text">'+ item.childItems.length +' sub items </p> ' +
                        '<a class="secondary-content"><i data-id="'+ item.id +'" class="material-icons display-item">send</i></a>' +
                    '</li>'
                );
            }
            else if(item.fName){
                childItemsContainer.prepend(
                    '<li class="collection-item avatar">' +
                        '<i class="material-icons circle green">person</i> ' +
                        '<span class="title">'+item.fName+' '+item.lName+'</span> ' +
                        '<p>'+item.phoneNum+'</p> ' +
                        '<a class="secondary-content"><i data-id="'+item.id+'" class="material-icons display-item">send</i></a> ' +
                    '</li>'
                );
            }
        });
    }

    function printPhoneNumbers(phoneNumArray){
        phoneNumbersContainer.empty();
        phoneNumArray.forEach(function(number){
            phoneNumbersContainer.prepend(
                '<li class="collection-item"> ' +
                    '<a class="waves-effect waves-teal btn-flat"> ' +
                    '<i class="material-icons left teal-text">call </i> ' +
                    '</a>'+ number +' ' +
                '</li>'
            )
        });
    }

    function addGroupInput(){
        var li  = childItemsContainer.children().first();
        var hasInput = li.attr('data-add');
        if (hasInput){
            li.remove();
        }
        childItemsContainer.prepend(
            '<li data-add="true" class="collection-item avatar"> ' +
                '<i class="material-icons circle blue">group</i> ' +
                '<form id="add-group">'+
                    '<div class="input-field">' +
                        '<input id="group_name" type="text" >' +
                        '<label for="group_name">add new group</label>' +
                        '<div class="input-btnz">'+
                            '<button id="submit" class="btn waves-effect waves-light" type="submit" name="action">' +
                            'Submit ' +
                            '<i class="material-icons right">send</i>   ' +
                            '</button>' +'' +
                            '<a id="cancel-input" class="waves-effect waves-red btn-flat"> ' +
                            'cancel ' +
                            '</a> ' +
                        '</div>' +
                '</form>' +
                '</div>' +
            '</li>'
        )
    }

    function addContactInput(){
        var li  = childItemsContainer.children().first();
        var hasInput = li.attr('data-add');
        if (hasInput){
            li.remove();
        }
        childItemsContainer.prepend(
            '<li data-add="true" class="collection-item avatar"> ' +
            '<i class="material-icons circle green">person</i> ' +
                '<form id="add-contact">' +
                    '<div class="input-field">' +
                        '<input id="first_name" type="text" >' +
                        '<label for="first_name">first name</label>' +
                    '</div>' +
                    '<div class="input-field">' +
                        '<input id="last_name" type="text" >' +
                        '<label for="last_name">last name</label>' +
                    '</div>' +
                    '<div class="input-field">' +
                        '<input id="number" type="text" >' +
                        '<label for="number">phone number</label>' +
                    '</div>' +
                    '<div class="input-btnz">'+
                    '<button id="submit" class="btn waves-effect waves-light" type="submit" name="action">' +
                    'Submit ' +
                    '<i class="material-icons right">send</i>   ' +
                    '</button>' +'' +
                    '<a id="cancel-input" class="waves-effect waves-red btn-flat"> ' +
                    'cancel ' +
                    '</a> ' +
                    '</div>' +
                '</form>' +
            '</li>'
        )
    }

    function addPhoneNumInputField (){
        var li  = childItemsContainer.children().first();
        var hasInput = li.attr('data-add');
        if (hasInput){
            li.remove();
        }
        phoneNumbersContainer.prepend(
            '<li data-add="true" class="collection-item"> ' +
                '<form id="add-number">' +
                    '<div class="input-field">' +
                        '<input id="number" type="text" >' +
                        '<label for="number">phone number</label>' +
                        '<div class="input-btnz">'+
                            '<button id="submit" class="btn waves-effect waves-light" type="submit" name="action">' +
                            'Submit ' +
                            '<i class="material-icons right">send</i>   ' +
                            '</button>' +'' +
                            '<a id="cancel-input" class="waves-effect waves-red btn-flat"> ' +
                            'cancel ' +
                            '</a> ' +
                        '</div>' +
                    '</div>' +
                '</form>'+
            '</li>'
        );
    }

    function showGroupFAB(){
        groupFAB.show();
        contactFAB.hide();
    }

    function showContactFAb(){
        contactFAB.show();
        groupFAB.hide();
    }

    function removeInput(){
        var li  = childItemsContainer.children().first();
        var hasInput = li.attr('data-add');
        if (hasInput){
            li.remove();
        }
    }

    function showNewChildItem(itemId){
        //todo create a more eficent and UX aware function
        displayItem(itemId);
    }

    return {
        displayItem: displayItem,
        changeCurrentItem: changeCurrentItem,
        addGroupInputField:addGroupInput,
        addContactInputField:addContactInput,
        addPhoneNumInputField:addPhoneNumInputField,
        removeInput:removeInput,
        showNewChildItem:showNewChildItem,
    }

})(app.phoneBook);
