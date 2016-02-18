/**
 * Created by shmuel-d on 9.2.2016.
 */

//REFACTORING THE REST

//helpers



//Core functions



//enter each group serch for sub group then print all contacts in that group
function printAll(groupID, indent){
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





/*testing core functionality
* ----------------------------------------------*/






