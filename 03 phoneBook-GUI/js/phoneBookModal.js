/*
 * this layer is all about data manipulation
 * */
var currentGroup;

var modalLayer = (function () {

    var root = createGroup("~");

    var nextId = 0;

    currentGroup = root;

    function addNewContact(firstName, lastName, phoneNumbers) {
        var newContact = createContact(firstName, lastName, phoneNumbers);
        addItem(newContact);
    }


    function addNewGroup(name) {
        var group = createGroup(name);
        addItem(group);
    }

    function changeCurrentGroupByName(name) {
        var group = findGroupByName(name);
        currentGroup = group;

    }

    function getCurrentGroupContacts() {
        var currentContacts = [];
        currentGroup.items.forEach(function (childItem) {
            if (childItem.firstName) {
                currentContacts.push(childItem);
            }
        });

        return currentContacts;
    }

    //gets a search parameter returns every item the string is in
    function find(searchParam, item, foundItems) {
        var foundItems = foundItems || [];
        var sParam = searchParam.toUpperCase();
        if (!item) {
            item = root;
        }

        if (item.firstName) {
            if (item.firstName.toUpperCase() == sParam || item.lastName.toUpperCase() == sParam) {
                foundItems.push(item);
            }
        }
        else if (item.name) {
            if (item.name.toUpperCase() == sParam) {
                foundItems.push(item);
            }
            if (item.items.length > 0) {
                item.items.forEach(function (childItem) {
                    find(sParam, childItem, foundItems);
                });
            }
        }
        return foundItems;
    }

    function findGroupByName(name, phonbookItem) {
        var item = phonbookItem || root;
        if (item.name == name) {
            return item;
        }
        else if (item.items) {
            var result = null;
            for (var i = 0; result == null && i < item.items.length; i++) {
                result = findGroupByName(name, item.items[i]);
            }
            return result;
        }
        return null;
    }

    function findItemById(id, phonbookItem, foundItem) {
        foundItem = foundItem || false;
        var item = phonbookItem || root;

        if (item.id == id) {
            foundItem = item;
        }
        else if (item.items && item.items.length > 0 && !foundItem) {
            item.items.forEach(function (childItem) {
                foundItem = findItemById(id, childItem, foundItem);
            });
        }
        return foundItem;
    }

    //gets id num and deletes the item
    function deleteItem(id) {

        if (!isNaN(id)) {
            var item = findItemById(id);
            item.parent.items.forEach(function (childItem, index, array) {
                if (childItem.id == id) {
                    array.splice(index, 1);
                }
            });
            currentGroup = item.parent;
        }

    }

    function createContact(firstName, lastName, phoneNumbers) {
        return {
            id: generateNextId(),
            firstName: firstName,
            lastName: lastName,
            phoneNumbers: phoneNumbers
        }
    }

    function createGroup(name) {
        if (name != '~') {
            var groupWithSameNameExists = findGroupByName(name);
        }
        else {
            groupWithSameNameExists = false;
        }

        if (groupWithSameNameExists) {
            throw 'group name is already used';
        }
        else {
            return {
                id: generateNextId(),
                name: name,
                items: []
            }
        }
    }

    function addItem(item) {
        if (currentGroup.item) {
            throw Error("Item with id " + item.id + " was already added to group: " + item.currentGroup.id);
        }
        currentGroup.items.push(item);
        item.parent = currentGroup;
    }

    function generateNextId() {
        return nextId++;
    }

    function findGroup(name) {
        var subGroup = false;
        currentGroup.items.forEach(function (item) {
            if (item.name == name) {
                subGroup = item;
            }
        });
        return subGroup;
    }

    //this function takes all the phone book and turns it into an array of JSON objects
    //and saves the tree structure relationships between the objects
    //in every object the 'items' property saves the number of child nodes he has and they wil be the next items in the array
    function phoneBookToArray(item, PhoneBookItemsArray) {
        var PhoneBookItems = PhoneBookItemsArray || [];

        if (!item) {
            item = root;
        }

        if (item) {
            var itemJson;
            if (item.firstName) {
                //this means it's a contact
                itemJson = {
                    "firstName": item.firstName,
                    "lastName": item.lastName,
                    "phoneNumbers": item.phoneNumbers,
                    "items": 0
                };
                PhoneBookItems.push(itemJson);
            }
            else if (item.name) {
                //this means it's a group
                itemJson = {
                    "name": item.name,
                    "items": item.items.length
                };
                PhoneBookItems.push(itemJson);
                item.items.forEach(function (childItem) {
                    phoneBookToArray(childItem, PhoneBookItems);
                });
            }
            return PhoneBookItems;
        }
    }

    //saves the current phone book items to local storage
    function writeToLocal() {
        var phoneBookArray = phoneBookToArray();
        localStorage.setItem("phoneBookArray", JSON.stringify(phoneBookArray));
    }

    //reads the phone bok items from local storage
    function readFromLocal() {
        var phoneBookArray = JSON.parse(localStorage.getItem("phoneBookArray"));
        if (phoneBookArray) {
            phoneBookArray.forEach(function (item, index, array) {
                load(item, index, array);
            })
        }
    }

    //this function loads every phone book item from the array in to the program
    function load(item, index, array) {
        if (item) {
            if (item.firstName) {
                var contact = createContact(item.firstName, item.lastName, item.phoneNumbers);
                addItem(contact);
            }
            else if (item.name && item.name !== "~") {
                var group = createGroup(item.name);
                addItem(group);

                if (item.items > 0) {
                    currentGroup = group;
                    for (var i = ++index; i < index + item.items; i++) { //iterating over his children & inserting them
                        load(array[i], i, array);//recurse
                    }
                    array.splice(index, item.items);//removing the added items so that the for each loop cold continue properly
                    currentGroup = group.parent;
                }
            }
            else if (item.name == "~") {
                if (item.items > 0) {

                    for (var i = ++index; i < index + item.items; i++) {
                        load(array[i], i, array);
                    }
                    array.splice(index, item.items);
                    currentGroup = root;
                }
            }
        }
    }

    //this function restores the program to a default condition
    function resetData() {
        localStorage.phoneBookArray =
            '[{"name":"~","items":6},{"name":"family","items":0},{"name":"friends","items":1},{"name":"best-friends","items":0},{"name":"work","items":0},{"name":"milueim","items":0},{"firstName":"jhon ","lastName":"doe","phoneNumbers":["04-8759918"],"items":0},{"firstName":"jane","lastName":"doe","phoneNumbers":["04-8759918"],"items":0}]';
        root.items = [];
        currentGroup = root;
    }

    return {
        getAllItems: root,//done
        getCurrentGroupContacts: getCurrentGroupContacts,//done
        createContact: addNewContact,//done
        createGroup: addNewGroup,//done
        find: find,//done
        deleteContact: deleteItem,//done
        deleteGroup: deleteItem,//done
        writeToLocalStorage: writeToLocal,//done
        readFromLocalStorage: readFromLocal,//done
        changeCurrentGroupByName: changeCurrentGroupByName,
        resetData: resetData,
    }
})();