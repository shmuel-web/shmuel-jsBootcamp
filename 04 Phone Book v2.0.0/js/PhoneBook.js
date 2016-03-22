var app = app || {};

app.PhoneBook = (function(){
    //todo write to local storage
    //todo reset to default
    function PhoneBook() {
        this.root = {
            id: 0,
            name: 'Root',
            childItems: [],
            parent:false,
        };

        this.currentGroup = this.root;

        this.nextId = 1;
    }

    PhoneBook.prototype.addNewContact = function(firstName, lastName, phoneNumbers){
        var newContact = new app.Contact(firstName, lastName, phoneNumbers,this.currentGroup, this.nextId++);
        this.currentGroup.childItems.push(newContact);
    };

    PhoneBook.prototype.addNewGroup = function(name){
        var newGroup = new app.Group(name,this.currentGroup, this.nextId++);
        this.currentGroup.childItems.push(newGroup);
    };

    PhoneBook.prototype.deleteItem = function deleteItem(id) {
        if (!isNaN(id)) {
            var item = this.getItemById(id);
            item.parent.childItems.forEach(function (childItem, index, array) {
                if (childItem.id == id) {
                    array.splice(index, 1);
                }
            });
            currentGroup = item.parent;
        }
    };

    PhoneBook.prototype.getItemById = function getItemById(id , phoneBookItem, foundItem){
        foundItem = foundItem || false;
        var item = phoneBookItem || this.root;

        if (item.id == id){
            foundItem = item;
        }else if(item.childItems && item.childItems.length > 0 && !foundItem){
            item.childItems.forEach(function(childItem){
                foundItem = getItemById(id ,childItem, foundItem);
            });
        }
        return foundItem;
    };

    PhoneBook.prototype.changeCurrentGroup = function changeCurrentGroup(id){
        var group = this.getItemById(id);
        if (group.name){
            this.currentGroup = group;
        }

    };

    //gets a search parameter returns every item the string is in
    PhoneBook.prototype.search = function search(searchParam, item, foundItems) {
        var foundItems = foundItems || [];
        var sParam = searchParam.toUpperCase();
        var item = item || this.root;

        if (item.fName) {
            if (item.fName.toUpperCase() == sParam || item.lName.toUpperCase() == sParam) {
                foundItems.push(item);
            }
        }
        else if (item.name) {
            if (item.name.toUpperCase() == sParam) {
                foundItems.push(item);
            }
            if (item.childItems.length > 0) {
                item.childItems.forEach(function (childItem) {
                    search(sParam, childItem, foundItems);
                });
            }
        }
        return foundItems;
    };
    //
    //this function takes all the phone book and turns it into an array of JSON objects
    //while saving the tree structure relationships between the objects
    //in every object the 'items' property saves the number of child nodes he has,
    //and they wil be the next items in the array
    //
    PhoneBook.prototype.tojsonArray = function phoneBookToArray(item, PhoneBookItemsArray) {
        var PhoneBookItems = PhoneBookItemsArray || [];

        if (!item) {
            item = this.root;
        }

        if (item) {
            var itemJson;
            if (item.fName) {
                //this means it's a contact
                itemJson = {
                    "firstName": item.fName,
                    "lastName": item.lName,
                    "phoneNumbers": item.phoneNum,
                    "items": 0
                };
                PhoneBookItems.push(itemJson);
            }
            else if (item.name) {
                //this means it's a group
                itemJson = {
                    "name": item.name,
                    "items": item.childItems.length
                };
                PhoneBookItems.push(itemJson);
                item.childItems.forEach(function (childItem) {
                    phoneBookToArray(childItem, PhoneBookItems);
                });
            }
            return PhoneBookItems;
        }

    };



    return PhoneBook;

})();




