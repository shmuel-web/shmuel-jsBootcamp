var app = app || {};

//
//
//
app.phoneBook = new app.PhoneBook;

app.view = (function view(phoneBookObj) {

    var phoneBook = phoneBookObj;

    var currentItem = phoneBook.root;

    var title = $('#title');
    var upBtn = $("#up-btn");
    //
    //
    //
    function displayItem(id) {
        var item = phoneBook.getItemById(id);
        if (item.name) {
            var group = item;
            //    add the parent id to the up btn

            upBtn.attr('data-parent', item.parent.id);
            //    print group name
            console.log(item.name,title);
            title.html(item.name);
            //    print child items
            printGroupChildItems(item.childItems);

        }
        else if (item.fName) {
            var contact = item;
            //    add the parent id to the up btn
            //    print contact name
            //    print contact phone numbers
        }
    }

    function changeCurrentItem() {

    }

    function displaySearchResults() {
        //geting the results from the bl

    }

    function printGroupChildItems(itemsArray){
        var childItemsContainer = $('.collection');
        itemsArray.forEach(function(item){
            if(item.name){
                childItemsContainer.append(
                    '<li class="collection-item avatar"> ' +
                        '<i class="material-icons circle blue">group</i> ' +
                        '<span class="title">'+ item.name +'</span> ' +
                        '<p class="grey-text">'+ item.childItems.length +'sub items </p> ' +
                        '<a data-id="'+ item.id +'" class="secondary-content"><i class="material-icons">send</i></a>' +
                    '</li>'
                );
            }
            else if(item.fName){
                childItemsContainer.append(
                    '<li class="collection-item avatar">' +
                        '<i class="material-icons circle green">person</i> ' +
                        '<span class="title">'+item.fName,item.lName+'</span> ' +
                        '<p>'+item.phoneNum+'</p> ' +
                        '<a data-id="'+item.id+'" class="secondary-content"><i class="material-icons">send</i></a> ' +
                    '</li>'
                );
            }

        });
    }

    return {
        displayItem: displayItem,
        changeCurrentItem: changeCurrentItem,//this function will change the cuurent viewd item & rerender the view acordingly
    }

})(app.phoneBook);
