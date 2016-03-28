var app = app || {};

//todo create an animation modal that will get a callback
// function that will call when the out animation is finished
//& then will complete the rest of animation

app.phoneBook = new app.PhoneBook;

app.view = (function view(phoneBookObj) {

    var phoneBook = phoneBookObj;

    var groupFAB = $('#group-FAB');

    var contactFAB = $('#contact-FAB');

    var title = $('#title');
    var upBtn = $("#up-btn");
    var backBtn = $('#back-btn');
    var childItemsContainer = $('.collection');
    var phoneNumbersContainer = childItemsContainer;
    var itemView = $('.item-view');
    var itemIcon = $('.item-view i.large');
    var itemBtnz = $('.item-btnz');


    function writeItemToDomById(id) {
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
                backBtn.hide()
            }
            else if (item.name =="Root"){
                //    print group name
                title.prepend('Phone-Book');
                //    print icon
                itemIcon.html('contact_phone');
                itemBtnz.hide();
                upBtn.hide();
                backBtn.hide();
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
            title.prepend(contact.fName+" "+contact.lName);
            //print icon
            itemIcon.empty();
            itemIcon.html('person');
            itemBtnz.fadeIn().attr('data-id',contact.id);
            backBtn.hide();
            upBtn.fadeIn();

            //    print contact phone numbers
            printPhoneNumbers(contact.phoneNum);

            showContactFAb();
        }
        app.dynamicEventListeners();
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
            '<li data-add="true" class="collection-item avatar animated slideInUp"> ' +
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
        );
    }

    function addContactInput(){
        var li  = childItemsContainer.children().first();
        var hasInput = li.attr('data-add');
        if (hasInput){
            li.remove();
        }
        childItemsContainer.prepend(
            '<li data-add="true" class="collection-item avatar animated slideInUp"> ' +
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
        );
    }

    function addPhoneNumInputField (){
        var li  = childItemsContainer.children().first();
        var hasInput = li.attr('data-add');
        if (hasInput){
            li.remove();
        }
        phoneNumbersContainer.prepend(
            '<li data-add="true" class="collection-item animated slideInUp"> ' +
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

    function hideFAB(){
        groupFAB.hide();
        contactFAB.hide();
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

    function displaySearchResults(results,searchParam){
        //remove the current item from view
        title.empty();
        itemIcon.empty();
        //    print results header
        if (results.length > 1){
            title.prepend(searchParam + '<div>was found ' +results.length + ' times</div>');
        }
        else if (results.length == 1 ) {
            title.prepend(searchParam + '<div>was found once</div>');
        }
        else if (results.length <= 0 ) {
            title.prepend(searchParam + '<div>was not found</div>');
        }
        //    print icon
        itemIcon.html('youtube_searched_for');
        itemBtnz.fadeOut();
        upBtn.hide();
        backBtn.fadeIn();
        printGroupChildItems(results);
        hideFAB();
        app.dynamicEventListeners();


    }

    function displayItem(id,revers){
        if (!revers){
            app.animation.leftOutRightInAnimation(function(){
                writeItemToDomById(id);
            });
        }
        else if (revers){
            app.animation.RightOutLeftInAnimation(function(){
                writeItemToDomById(id);
            });
        }
    }

    return {
        displayItem: displayItem,
        addGroupInputField:addGroupInput,
        addContactInputField:addContactInput,
        addPhoneNumInputField:addPhoneNumInputField,
        removeInput:removeInput,
        showNewChildItem:showNewChildItem,
        displaySearchResults:displaySearchResults,
        writeItemToDomById:writeItemToDomById,
    }

})(app.phoneBook);
