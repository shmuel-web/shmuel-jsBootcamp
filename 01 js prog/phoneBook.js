/**
 * Created by shmuel-d on 9.2.2016.
 */

//    TODO recreate the delete function using splice& recursiv
//    TODO create a DB system using a json file & FS node module that saves the phone book to a file and reads the file on startup
//    TODO create a unike id for groups and contacts
//    TODO create a function that listen to the user key press and return a message if not one of the options

var readlineSync = require('readline-sync');

var persons = [];
var groups = [];
groups.push({
    id:1,
    name:'root',
    parentId:0
})

var currentGroup = 0;

//helpers
var idPointer = 1;
function genarateID(){
    idPointer++;
    return idPointer;
}

function printGroup(groupId){
    cGroup = findGroup(groupId);
    console.log(cGroup.name+' sub groups:');
    groups.forEach(function(group){
        if (groupId == group.parentId){
            console.log("name: "+group.name,'id:',group.id);
        }
    });

    console.log('contacts names:');
    persons.forEach(function(person){
        if (groupId == person.group){
            console.log("name: "+person.fName + ". " + person.lName,"phone:", person.phoneNum,'id:',person.id);
        }
    })
}

function printCurrentGroupName (){
    if (currentGroup == 0){
        console.log('root>');
    }
    else{
        var cGroup = findGroup(currentGroup);
        console.log(cGroup.name+'>')
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

//Core functions
function Person (id, fName, lName, phoneNum, group){
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

function addNewPerson(fName, lName, phoneNum) {
    var unikeId = genarateID();
    var nPerson = new Person(unikeId, fName, lName, phoneNum, currentGroup);
    persons.push(nPerson);
    console.log('your new contact "'+nPerson.fName.toUpperCase()+'" was successfully added')
}

function addNewGroup (name){
    var unikeId = genarateID();
    var nGroup = new Group(unikeId, name, currentGroup);
    groups.push(nGroup);
    console.log('your new group "'+nGroup.name.toUpperCase()+'" was successfully added')
}

function switchCurrentGroup (groupName) {
    //todo create a meesage for failure

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

                }
            }
        )
    }
    //printCurrentGroupName();
}

//print all pepole that have this group id as group
//print groups that have this group id as parent id
function printCurrentGroup (){
    //refactored
    printGroup(currentGroup);
    //console.log('groups:')
    //groups.map(function(group){
    //    if (currentGroup == group.parentId){
    //        console.log("   "+group.name);
    //    }
    //})
    //
    //console.log('contacts names:')
    //persons.map(function(person){
    //    if (currentGroup == person.group){
    //        console.log("   "+person.fName + " " + person.lName);
    //    }
    //})
}

//enter each group serch for sub group then print all contacts in that group

function printAll(groupId, indent){
    if(groupId!=null){
        if (!indent){
            var indent = "";
        }
        //if (!groupId){
        //    groupId = 0;
        //}

        persons.map(function(person){
            if(person.group == groupId){
                console.log(indent +"  "+ person.fName + " " + person.lName);
            }
        });

        groups.map(function(group){
            if(group.parentId == groupId){
                console.log(indent +"  "+ group.name);
                indent = indent + "  ";
                printAll(group.id, indent);
            }

        });
    }
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

//testing core functionalty
/*addNewGroup('friends');
addNewGroup('family');
addNewPerson('a','b','c');
addNewPerson('d','e','f');
addNewPerson('g','h','i');
addNewPerson('j','k','l');
addNewPerson('m','n','o');
changeCurrentGroup('family');
changeCurrentGroup('..');*/

//console UI

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

            case 'Print all':
                printAll(0);
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

phoneBookCLI();


