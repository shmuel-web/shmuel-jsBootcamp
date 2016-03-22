var rl = require('readline-sync');
var fs = require('fs');

var root = createGroup("~");
var currentGroup = root;
var nextId = 0;



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
        addContact();
    }
    else if(command == Menu.ADD_NEW_GROUP) {
        addGroup();
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

function addContact(){
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

function addGroup(){
    var name = readNonEmptyString("Name: ");

    var group = createGroup(name);
    addItem(group);
}

function changeCurrentGroup(arg) {
    var name = arg || readNonEmptyString("Name: ");
    if (name == "..") {
        if (!currentGroup.parent) {
            return;
        }

        currentGroup = currentGroup.parent;
    }
    else {
        var subGroup = findGroup(name);
        if (!subGroup) {
            console.log("Group with name " + name + " was not found")
        }
        else {
            currentGroup = subGroup;
        }

    }
}

function print() {
    currentGroup.items.forEach(function(childItem){
        if(childItem.name){
            printGroup(childItem);
        }
        else if (childItem.firstName){
            printContact(childItem);
        }
    })
}

function printAll() {
}

function find(){

}

function deleteItem(){

}

function exit(){
    writeToFile();
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
}

function generateNextId(){
    return nextId++;
}


function printGroup(group){
    console.log(group.name);
}

function printContact(contact){
    console.log(contact.firstName,contact.lastName,contact.phoneNumbers);
}

function readNonEmptyString(message) {
    while(true) {
        var line = rl.question(message).trim();
        if(line){
            return line;
        }
    }
}

function writePhoneBook(item, PhoneBookItemsArray ) {
    var PhoneBookItems = PhoneBookItemsArray || [];
    if (!item){
        item = root;
    }
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
            PhoneBookItems.push(itemJson);
        }
        else if (item.name) {
            //is group
            itemJson = {
                "name": item.name,
                "items": item.items.length
            };
            PhoneBookItems.push(itemJson);
            item.items.forEach(function (childItem) {
                writePhoneBook(childItem,PhoneBookItems);
            })

        }
        return PhoneBookItems;
    }
}

function writeToFile(){
    var phoneBookArrey = writePhoneBook();
    var jsonPhonebook = JSON.stringify(phoneBookArrey);
    //todo write to file here
    fs.writeFileSync('phonebook.json',jsonPhonebook,'utf8');
    console.log(jsonPhonebook);
}

function findGroup(name){
    var subGroup = false;
    currentGroup.items.forEach(function (item){
        if (item.name == name){
            subGroup = item;
        }
    })
    return subGroup;
}

function readFile() {
    var phonebook = fs.readFileSync('phonebook.json', 'utf8');
    //console.log(phonebook);
    phonebook = JSON.parse(phonebook);

    phonebook.forEach(function(item,index,array){
        load(item,index,array);
    })
}

function load (item,index,array){
    if (item.firstName){
        var contact = createContact(item.firstName,item.lastName,item.phoneNumbers);
        addItem(contact);
    }
    else if(item.name && item.name !== "~"){
        var group = createGroup(item.name);
        addItem(group);

        if (item.items > 0){
            currentGroup = group;

            for (var i = ++index; i < index + item.items; i++){ //etarating over his childern
                load(array[i],i,array);
            }
            array.splice(index,item.items);//removing the added items so that the for each loop cold continue properly
            currentGroup = group.parent;
        }
    }
    else if (item.name == "~"){
        if (item.items > 0){

            for (var i = ++index; i < index + item.items; i++){
                load(array[i],i,array);
            }
            array.splice(index,item.items);
            currentGroup = root;
        }
    }
}

readFile();
run();

