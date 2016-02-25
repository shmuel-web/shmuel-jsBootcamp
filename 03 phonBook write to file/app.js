var rl = require('readline-sync');
var fs = require('fs');

var root = createGroup("~");
var currentGroup = root;
var nextId = 0;
var allPhoneBookItems = [];

var Menu = {
    ADD_NEW_CONTACT: 1,
    ADD_NEW_GROUP: 2,
    CHANGE_CURRENT_GROUP: 3,
    PRINT: 4,
    PRINT_ALL: 5,
    FIND: 6,
    DELETE: 7,
    EXIT: 8
};

function printMenu() {
    console.log();
    console.log("1) Add new contact");
    console.log("2) Add new group");
    console.log("3) Change current group");
    console.log("4) Print");
    console.log("5) Print All");
    console.log("6) Find");
    console.log("7) Delete");
    console.log("8) Exit");
}

function run(){
    while(true) {
        printMenu();

        var command = rl.question("Contact Book> ");
        handleCommand(command);
    }
}

function handleCommand(line) {
    var command = parseInt(line);

    if (command == Menu.ADD_NEW_CONTACT) {
        addNewContact();
    }
    else if(command == Menu.ADD_NEW_GROUP) {
        addNewGroup();
    }
    else if(command == Menu.CHANGE_CURRENT_GROUP) {
        changeCurrentGroup();
    }
    else if(command == Menu.PRINT) {
        print();
    }
    else if(command == Menu.PRINT_ALL) {
        printAll();
    }
    else if(command == Menu.FIND) {
        find();
    }
    else if(command == Menu.DELETE) {
        deleteItem();
    }
    else if(command == Menu.EXIT) {
        exit();
    }
}

function addNewContact(){
    var firstName = readNonEmptyString("First Name: ");
    var lastName = readNonEmptyString("Last Name: ");

    var phoneNumbers = [];
    while(true){
        var phoneNumber = rl.question("Phone Number (press enter when done): ");
        if(!phoneNumber){
            break;
        }

        phoneNumbers.push(phoneNumber);
    }

    var contact = createContact(firstName, lastName, phoneNumbers)
    addItem(contact);
}

function addNewGroup(){
    var name = readNonEmptyString("Name: ");

    var group = createGroup(name);
    addItem(group);
}

function changeCurrentGroup(){
    var name = readNonEmptyString("Name: ");
    if(name == ".."){
        if(!currentGroup.parent){
            return;
        }

        currentGroup = currentGroup.parent;
    }
    else {
        var sunGroup = findGroup(currentGroup, name);
        if(!subGroup){
            console.log("Group with name " + name + " was not found")
        }

        currentGroup = subGroup;
    }}

function print() {
    for(var item in currentGroup.items){
        if(item.type == "Group"){
            printGroup(item);
        }
        else{
            printContact(item);
        }
    }
}

function printAll() {
}

function find(){

}

function deleteItem(){

}

function exit(){
    process.exit(0);
}

function createContact(firstName, lastName, phoneNumbers) {
    var contact = {
        id: generateNextId(),
        firstName: firstName,
        lastName: lastName,
        phoneNumbers: phoneNumbers,
    };

    return contact;
}

function createGroup(name) {
    var group = {
        id: generateNextId(),
        name: name,
        items: [],
    };

    return group;
}

function addItem(item) {
    if(currentGroup.item){
        throw Error("Item with id " + item.id + " was already added to group: " + item.currentGroup.id);
    }

    currentGroup.items.push(item);

    item.parent = currentGroup;
    //todo dont send the intaier root for every time the a new item is created
    writeToFile();

}

function generateNextId(){
    return nextId++;
}

function printGroup(group){
    console.log(group.name);
}

function printContact(cpntact){
    console.log(contact.name);
}

function readNonEmptyString(message) {
    while(true) {
        var line = rl.question(message).trim();
        if(line){
            return line;
        }
    }
}

run();


function writePhoneBook(item) {
    if (item) {
        var itemJson;
        if (item.firstName) {
            //    is contact
            itemJson = {
                "firstName": item.firstName,
                "lastName": item.lastName,
                "phoneNumbers": item.phoneNumbers,
                "items": 0
            };
            allPhoneBookItems.push(itemJson);
        }
        else if (item.name) {
            //is group
            itemJson = {
                "name": item.name,
                "items": item.items.length
            };
            allPhoneBookItems.push(itemJson);
            item.items.forEach(function (item) {
                writePhoneBook(item);
            })

        }
        return  allPhoneBookItems;
    }
}

function writeToFile(){
    var phoneBookArrey = writePhoneBook(root);
    var jsonPhonebook = JSON.stringify(phoneBookArrey);
    fs.writeFile("json", jsonPhonebook, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
    console.log(jsonPhonebook);

}




