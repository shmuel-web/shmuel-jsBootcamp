/**
 * Created by shmuel-d on 17.2.2016.
 */
//    TODO create a function that listen to the user key press and return a message if not one of the options
//    TODO make it more beautiful improve all the prints in the systems

var readlineSync = require('readline-sync');
var contacts = [];
var groups = [];
var currentGroupId = 1;
var root = {
    id: 1,
    name: 'root',
    parentId: 0
}
groups.push(root);

/*
 Helper functions
 * ---------------------------------------------------------------------*/

var idPointer = 1;
function genarateID() {
    idPointer++;
    return idPointer;
}

function findContact(contactID) {
    var foundContact = null;
    contacts.forEach(function (contact) {
        if (contact.id == contactID) {
            foundContact = contact;
        }
    });
    return foundContact;
}

function printContact(contactID) {
    var contact = findContact(contactID);
    if (contact !== null) {
        console.log("name: " + contact.fName + "." + contact.lName, "phone number:" + contact.phoneNum, "id:", contact.id);
    }
    else {
        console.log('error in print contact function');
    }
}

function findGroup(groupId) {
    var foundGroup = null;
    groups.forEach(function (group) {
        if (group.id == groupId) {
            foundGroup = group;
            return // exit the function if finds at least one group
        }
    });
    return foundGroup;
}

function findContact(contactId) {
    var foundContact = null;
    contacts.forEach(function (contact) {
        if (contact.id == contactId) {
            foundContact = contact;
            return // exit the function if finds at least one contact
        }
    });
    return foundContact;
}

function printGroup(groupId) {
    if (groupId == 0) {
        ++groupId;
    }
    var cGroup = findGroup(groupId);
    console.log(cGroup.name + "> id:", cGroup.id);
    printSubGroups(groupId);
    printGroupContacts(groupId);
}

function printGroupContents(groupId, indent) {
    var cGroup = findGroup(groupId);
    console.log(indent + cGroup.name + "> id: " + cGroup.id);
    indent = indent + "  ";
    printGroupContacts(groupId, indent);
}

function hasSubGroups(groupId) {
    var hasSubGroup = false;
    for (var i = 0; i < groups.length; i++) {
        if (groupId == groups[i].parentId) {
            hasSubGroup = true;
            break;
        }
    }
    return hasSubGroup;
}

function printSubGroups(groupId, indent) {
    //indent optional
    if (!indent) {
        indent = "";
    }
    //todo refactor i have a function that does this more efficiently
    var hasSubGroups = false;
    groups.forEach(function (group) {
        if (groupId == group.parentId) {
            hasSubGroups = true;
            return //exits the for each if finds at least one sub group
        }
    });
    if (hasSubGroups) {
        console.log(indent + 'sub groups:');
        groups.forEach(function (group) {
            if (groupId == group.parentId) {
                console.log(indent + group.name, 'id:', group.id);
            }
        });
    }
}

function printGroupContacts(groupId, indent) {
    //indent optional
    if (!indent) {
        indent = "";
    }
    //todo sholed be a function that chks for childern by id
    //chck for contacts
    var hasContacts = false;
    contacts.forEach(function (contact) {
        if (groupId == contact.group) {
            hasContacts = true;
            return //exits the for each if finds at least one contact
        }
    });
    if (hasContacts) {
        console.log(indent + 'contacts:')
        indent = indent + "  ";
        contacts.forEach(function (contact) {
            if (groupId == contact.group) {
                console.log(indent + "name: " + contact.fName + ". " + contact.lName, "phone:", contact.phoneNum, 'id:', contact.id);
            }
        });
    }
}

function printCurrentGroupName() {
    if (currentGroupId == 0) {
        console.log('root>');
    }
    else {
        var cGroup = findGroup(currentGroupId);
        console.log(cGroup.name + '>')
    }
}

function deleteContact(contactId) {
    contacts.forEach(function (contact, index) {
        if (contact.id == contactId) {
            contacts.splice(index, 1);
        }
    });
}

function deleteGroup(groupId) {
    groups.forEach(function (group, index) {
        if (group.id == groupId) {
            groups.splice(index, 1);
        }
    })
}

/*
 Classes
 * ------------------------------------------------------------------*/

function Contact(id, fName, lName, phoneNum, group) {
    this.id = id;
    this.fName = fName;
    this.lName = lName;
    this.phoneNum = phoneNum;
    this.group = group;
}

function Group(id, name, parentId) {
    this.id = id;
    this.name = name;
    this.parentId = parentId;
}

/*
 Core functions
 * -------------------------------------------------------------------*/

function addContact(fName, lName, phoneNum) {
    var unikeId = genarateID();
    var newContact = new Contact(unikeId, fName, lName, phoneNum, currentGroupId);
    contacts.push(newContact);
    printContact(newContact.id);
}

function addGroup(name) {
    var unikeId = genarateID();
    var nGroup = new Group(unikeId, name, currentGroupId);
    groups.push(nGroup);
    //console.log('your new group "'+nGroup.name.toUpperCase()+'" was successfully added')
    printGroup(nGroup.id);
}

function changeCurrentGroup(groupName) {
    if (groupName == "..") {
        var cGroup = findGroup(currentGroupId);
        if (cGroup) {
            currentGroupId = cGroup.parentId;
            console.log('success');
        }
    }
    else {
        //finding the group by name
        groups.forEach(
            function (item) {
                if (item.name == groupName && item.parentId == currentGroupId) {
                    currentGroupId = item.id;
                    console.log('success');
                }
                else {
                    //todo create a message for failure
                }
            }
        )
    }
}

function printCurrentGroup() {
    printGroup(currentGroupId);
}

function printAll(groupId, indent) {
    if (!groupId || groupId == 0) {
        groupId = 1;
    }
    if (!indent) {
        var indent = "";
    }

    printGroupContents(groupId, indent);
    indent = indent + "  ";
    //chck for sub groups
    if (hasSubGroups(groupId)) {
        console.log(indent + 'sub groups:')
    }
    indent = indent + "  ";
    groups.forEach(function (group) {
        if (group.parentId == groupId) {
            printAll(group.id, indent);//recurse
        }
    });
}

function find(param) {
    //check for parm
    var foundParam = 0;
    groups.forEach(function (group) {
        if (group.name.toLowerCase() == param.toLowerCase()) {
            foundParam++;
        }
    });
    contacts.forEach(function (person) {
        if (person.fName.toLowerCase() == param.toLowerCase() ||
            person.lName.toLowerCase() == param.toLowerCase()) {
            foundParam++;
        }
    })

    if (foundParam !== 0) {
        console.log('--found "' + param + '" in ' + foundParam + ' places--');
        groups.forEach(function (group) {
            if (group.name.toLowerCase() == param.toLowerCase()) {
                console.log("---group: " + group.name)
            }
        });
        contacts.forEach(function (person) {
            if (person.fName.toLowerCase() == param.toLowerCase() ||
                person.lName.toLowerCase() == param.toLowerCase()) {
                console.log('---contact: ' + person.fName + ' ' + person.lName + ' ' + person.phoneNum);
            }
        });
    }
    else {
        console.log("--sorry your search parameter does not exists in thr phone book--");
    }
}

function deleteItem(itemId) {
//   check if the id exists
    var foundContact = findContact(itemId);
    var foundGroup = findGroup(itemId);
    if (foundContact) {
        deleteContact(itemId);
    }
    else if (foundGroup) {
        contacts.forEach(function (contact) {
            if (contact.group == itemId) {
                deleteContact(contact.id);
            }
        });
        groups.forEach(function (group) {
            if (group.parentId == itemId) {
                deleteItem(group.id);//recurse
            }
        });
        deleteGroup(itemId);
    }
    if (currentGroupId == itemId) {//if you delete the current group the program
        currentGroupId = 1;
    }
}

/*
 UI
 * --------------------------------------------------------------------------*/
var options = [
    'Add new contact',
    'Add new group',
    'Change current group',
    'Print current group',
    'Print all',
    'Find',
    'Delete item',
    'Options',
    'Exit'
];

function phoneBookCLI() {

    var index = 8;//initializing the index to the options menu

    while (options [index - 1] !== 'Exit') {

        switch (options[index - 1]) {
            case 'Options':
                for (var i = 0; i < options.length; i++) {
                    console.log('[' + (i + 1) + ']  ' + options[i]);
                }
                console.log('Please type one of the numbers for the following options:');
                break;

            case 'Add new contact':
                var fName = readlineSync.question('please type contacts first name:');
                var lName = readlineSync.question('please type contacts last name:');
                var phoneNum = readlineSync.question('please type contacts phone number or multi phone numbers separated by ",":');
                var phoneNum = phoneNum.split(',');
                addContact(fName, lName, phoneNum);
                break;

            case 'Add new group':
                var name = readlineSync.question('please type group name:');
                addGroup(name);
                break;

            case 'Change current group':
                var groupName = readlineSync.question('please type a group name under the current group:');
                changeCurrentGroup(groupName);
                break;

            case 'Print current group':
                printCurrentGroup();
                break;

            case 'Print all':
                printAll();
                break;

            case 'Find':
                var param = readlineSync.question('please type a search parameter:');
                find(param);
                break;

            case 'Delete item':
                var itemId = readlineSync.question('please type the id of the contact you wish to delete:');
                deleteItem(itemId);
                break;
        }
        printCurrentGroupName();
        index = readlineSync.question();
    }
}

phoneBookCLI();
