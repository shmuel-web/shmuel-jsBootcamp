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

    Contact.prototype.addPhoneNumber = function(number){
        this.phoneNum.push(number);
    };

    return Contact

})();