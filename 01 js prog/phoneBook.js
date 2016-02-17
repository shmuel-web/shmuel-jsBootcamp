/**
 * Created by shmuel-d on 9.2.2016.
 */

//    TODO recreate the delete function using splice& recursiv
//    TODO create a DB system using a json file & FS node module that saves the phone book to a file and reads the file on startup
//    TODO create a unike id for groups and contacts
//    TODO create a function that listen to the user key press and return a message if not one of the options

//    TODO devide the file to 3, helper functions, core functions, UI

var readlineSync = require('readline-sync');
var contacts = [];
var groups = [];
var currentGroup = 0;
var root = {
    id: 1,
    name: 'root',
    parentId: 0
    }
groups.push(root);



/*Helper functions
* -------------------------------------*/
var idPointer = 1;
function genarateID (){
    idPointer++;
    return idPointer;
}

function findContact (contactID){
    var foundContact = null;
    contacts.forEach(function(contact){
        if (contact.id == contactID) {
            foundContact = contact;
        }
    });
    return foundContact;
}

function printContact (contactID){
//TODO print multipule phone numbers from arrey
    var contact = findContact(contactID);
    if (contact !== null){
        console.log(contact.fName,contact.lName,contact.phoneNum);
    }
    else{
        console.log('error in print contact function');
    }
}

function findGroup(groupId){
    var foundGroup = null;
    groups.forEach(function(group){
        if (group.id == groupId){
            foundGroup =  group;
        }
    });
    return foundGroup;
}

function printGroup(groupId){
    if (groupId == 0){
        ++groupId;
    }
    cGroup = findGroup(groupId);
    console.log(cGroup.name+">");
    printSubGroups(groupId);
    printGroupContacts(groupId);
}

function printSubGroups (groupId){
    //TODO check for sub groups
    var hasSubGroups = false;
    groups.forEach(function(group){
        if (groupId == group.parentId){
            hasSubGroups = true;
        }
    });
    if (hasSubGroups) {
        console.log('sub groups:');
        groups.forEach(function(group){
            console.log(group.name,'id:',group.id);
        })
    }
}

function printGroupContacts (groupId){
    //chck for contacts
    var hasContacts = false;
    contacts.forEach(function(contact){
        if (groupId == contact.group){
            //console.log("   name: "+contact.fName + ". " + contact.lName,"phone:", contact.phoneNum,'id:',contact.id);
            hasContacts =true;
        }
    });
    if (hasContacts) {
        console.log('contacts:')
        contacts.forEach(function(contact){
            if (groupId == contact.group){
                console.log("   name: "+contact.fName + ". " + contact.lName,"phone:", contact.phoneNum,'id:',contact.id);
            }
        });
    }
}

/*Classes
* -------------------------------------*/
function Contact (id, fName, lName, phoneNum, group){
    this.id = id;
    this.fName = fName;
    this.lName = lName;
    this.phoneNum = phoneNum;
    this.group = group;
}

function Group (id, name, parentId){
    this.id = id;
    this.name = name;
    this.parentId = parentId;
}

/*Core functions
* -------------------------------------*/
function addNewContact (fName, lName, phoneNum){
    //todo phoneNum shold by an arrey
    var unikeId = genarateID();
    var newContact = new Contact(unikeId, fName, lName, phoneNum, currentGroup);
    contacts.push(newContact);
    printContact(newContact.id);
}

function addNewGroup (name){
    var unikeId = genarateID();
    var nGroup = new Group(unikeId, name, currentGroup);
    groups.push(nGroup);
    //console.log('your new group "'+nGroup.name.toUpperCase()+'" was successfully added')
    printGroup(nGroup.id);

}

function changeCurrentGroup (groupName){

    if (groupName == "..") {
        var cGroup = findGroup(currentGroup);
        if (cGroup) {
            currentGroup = cGroup.parentId;
            console.log('success');
        }
    }
    else {
        //finding the group by name
        groups.forEach(
            function (group) {
                if (group.name == groupName && group.parentId == currentGroup) {
                    currentGroup = group.id;
                    console.log('success');
                }
                else {
                    //todo create a message for failure
                }
            }
        )
    }
    printCurrentGroupName();

}



function printCurrentGroup (){

}

function printAll (){

}

function find (){

}

function deleteItem (){

}

/*UI
* -------------------------------------*/
var options = [
    'Add new contact',
    'Add new group',
    'Change current group',
    'Print current group',
    'Print all',
    'Find',
    'Delete contact',
    'Delete group',
    'Options',
    'Exit'
];

function phoneBookCLI (){

    var index = 9;

    while ( options [index -1] !== 'Exit' ) {

        switch (options[index -1]) {
            case 'Options':
                for (var i = 0; i<options.length; i++){
                    console.log('['+(i+1)+']  '+options[i]);
                }
                //TODO print the current group here
                console.log('Please type one of the numbers for the following options:');
                break;

            case 'Add new contact':
                var fName = readlineSync.question('please type contacts first name:');
                var lName = readlineSync.question('please type contacts last name:');
                var phoneNum = readlineSync.question('please type contacts phone number:');
                addNewPerson(fName, lName, phoneNum);
                break;

            case 'Add new group':
                var name = readlineSync.question('please type group name:');
                addNewGroup(name);
                break;

            case 'Change current group':
                var groupName = readlineSync.question('please type a group name under the current group:');
                switchCurrentGroup(groupName);
                break;

            case 'Print current group':
                printCurrentGroup();
                break;

            case 'Print all'://todo refactoring to printALL
                printALL();
                break;

            case 'Find':
                var param = readlineSync.question('please type a search parameter:');
                find(param);
                break;

            case 'Delete contact':
                var contactId = readlineSync.question('please type the id of the contact you wish to delete:');
                deleteContact(contactId);
                break;

            case 'Delete group':
                var groupId = readlineSync.question('please type the id of the group you wish to delete:');
                deleteGroup(groupId);
                break;
        }
        printCurrentGroupName();
        index = readlineSync.question();
    }
}

//REFACTORING THE REST

//helpers

function printCurrentGroupName (){
    if (currentGroup == 0){
        console.log('root>');
    }
    else{
        var cGroup = findGroup(currentGroup);
        console.log(cGroup.name+'>')
    }
}


//Core functions

function printCurrentGroup (){
    //refactored
    printGroup(currentGroup);
}

//enter each group serch for sub group then print all contacts in that group
function printAll(groupID, indent){
    //todo refactoring to printALL
    if(groupID!=null){
        if (!indent){
            var indent = "";
        }
        //if (!groupID){
        //    groupId = 0;
        //}

        persons.map(function(person){
            if(person.group == groupID){
                console.log(indent +"  "+ person.fName + " " + person.lName);
            }
        });

        groups.map(function(group){
            if(group.parentId == groupID){
                console.log(indent +"  "+ group.name);
                indent = indent + "  ";
                printAll(group.id, indent);
            }

        });
    }
}

function printALL(groupID, indent){
    //todo initialaize the groupID var
    if (!groupID || groupID == 0){
        groupID =1;
    }
    if (!indent){
        var indent = "";
    }
    printGroupContents(groupID,indent);//TODO create this function

    indent = indent+"    ";

    groups.forEach(function(group){
        if (group.parentId == groupID){
            printALL(groupID, indent);
        }
    });
}

function printGroupContents(groupID,indent){
    var cGroup = findGroup(groupID);

    console.log(indent+cGroup.name,'contacts:');
    indent = indent+"  ";

    persons.forEach(function(contact){
        if (contact.group == groupID){
            console.log(indent+contact.fName,contact.lName,"phone:",contact.phoneNum);
        }
    })
}

function find(param){
    groups.map(function(group){
        if (group.name == param){
            console.log(group.name)
        }
    });
    persons.map(function(person){
        if (person.fName == param || person.lName == param){
            console.log(person.fName + ' ' + person.lName + " " +person.phoneNum);
        }
    })
}

function deleteContact(contactId) {
    delete persons[contactId];
}

function deleteGroup(groupId){
    delete groups[groupId];
}

/*testing core functionality
* ----------------------------------------------*/
addNewContact('Avi','Cohen',123);
addNewContact('haim','michael',234);
addNewGroup('friends');
changeCurrentGroup('friends');
addNewContact('eyal','yakov',456);
addNewGroup('bestFriends');
changeCurrentGroup('bestFriends');
addNewContact('doron','natan',678);






