var app = app || {};

app.Contact = (function(){
    //Class Contact
    function Contact(firstName, lastName, phoneNumbers, currentGroup,id) {

        this.fName = firstName;
        this.lName = lastName;
        this.phoneNum = phoneNumbers;
        this.parent = currentGroup;
        this.id = id;
    }

    Contact.prototype.addPhoneNumber = function(number,callback){
        this.phoneNum.push(number);
        if (callback){
            //activate an optional callback function
            callback();
        }
    };

    Contact.prototype.changeName = function(newName){
        var fullName = newName.split(" ",2);
        this.fName = fullName[0];
        this.lName = fullName[1];
    };

    Contact.prototype.changePhoneNum = function(newNum,index){
        if (newNum == ""){
            //if the user deletes the hole number then we remove that phone number from the contact
            this.phoneNum.splice(index,1);
        }
        else{
            this.phoneNum[index] = newNum;
        }

    };

    return Contact

})();