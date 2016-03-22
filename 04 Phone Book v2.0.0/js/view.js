var app = app || {};

//todo add a input LI to the group view when the add group btn is clicked
//todo

app.phoneBook = new app.PhoneBook;

app.view = (function view(phoneBookObj) {

    var phoneBook = phoneBookObj;

    var groupFAB = $('#group-FAB');

    var contactFAB = $('#contact-FAB');

    var title = $('#title');
    var upBtn = $("#up-btn");
    var childItemsContainer = $('.collection');
    var phoneNumbersContainer = childItemsContainer;

    function displayItem(id) {
        var item = phoneBook.getItemById(id);
        if (item.name) {
            var group = item;
            //    add the parent id to the up btn

            upBtn.attr('data-parent', item.parent.id);
            //    print group name
            title.html(item.name);
            //    print child items
            printGroupChildItems(item.childItems);

            showGroupFAb();

        }
        else if (item.fName) {
            var contact = item;
            //    add the parent id to the up btn
            upBtn.attr('data-parent', item.parent.id);
            //    print contact name
            title.html(item.fName+''+item.lName);
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

        phoneNumArray.forEach(function(number){
            phoneNumbersContainer.empty();
            phoneNumbersContainer.prepend(
                '<li class="collection-item"> ' +
                    '<a class="waves-effect waves-teal btn-flat"> ' +
                    '<i class="material-icons left teal-text">call </i> ' +
                    '</a>'+ number +' ' +
                '</li>'
            )
        });
/*        phoneNumbersContainer.append(
            '<li class="collection-item"> ' +
                '<a class="waves-effect waves-teal btn-flat"> ' +
                    '<i class="material-icons left teal-text"> add </i> ' +
                '</a> ' +
                '<input type="text" placeholder="add phone number ">' +
            '</li>'
        )*/
    }

    function addGroupInput(){
        childItemsContainer.prepend(
            '<li class="collection-item avatar"> ' +
                '<i class="material-icons circle blue">group</i> ' +
                '<input type="text" placeholder="add group name ">' +
            '</li>'
        )
    }

    function addContactInput(){
        childItemsContainer.prepend(
            '<li class="collection-item avatar"> ' +
            '<i class="material-icons circle blue">person</i> ' +
            '<input type="text" placeholder="first name ">' +
            '<input type="text" placeholder="last name ">' +
            '<input type="text" placeholder="phone number ">'+
            '</li>'
        )
    }

    function addPhoneNumInputField (){
        phoneNumbersContainer.prepend(
            '<li class="collection-item"> ' +
            '<a class="waves-effect waves-teal btn-flat"> ' +
            '<i class="material-icons left teal-text"> add </i> ' +
            '</a> ' +
            '<input type="text" placeholder="add phone number ">' +
            '</li>'
        );
    }

    function showGroupFAb(){
        groupFAB.show();
        contactFAB.hide();
    }

    function showContactFAb(){
        contactFAB.show();
        groupFAB.hide();
    }



    return {
        displayItem: displayItem,
        changeCurrentItem: changeCurrentItem,
        addGroupInputField:addGroupInput,
        addContactInputField:addContactInput,
        addPhoneNumInputField:addPhoneNumInputField,
    }

})(app.phoneBook);
