var app = app || {};

app.Item = (function () {
//Class Item
    function Item() {
        //    todo make sure to add the item to his parent
        //    sets item id , sets item parent, sets inserts the item in current group child items list
        var nextId = 0;

        function generateNextId() {
            return nextId++;
        }

        this.id = generateNextId();
        this.parent = PhoneBook.currentGroup;
    }

    Item.prototype.print = function () {
        throw error('print was not defined properly');
    };

    return {
        Item:Item,
    }
})();

app.Contact = (function(){
    //Class Contact
    function Contact(firstName, lastName, phoneNumbers) {
        Item.call(this);
        this.fName = firstName;
        this.lName = lastName;
        this.phoneNum = phoneNumbers;
    }

    Contact.prototype = Object.create(item);
    Contact.prototype.print = function () {
//    todo print the phone contact to the DOM
        console.log("test",this.fName,this.lName,this.phoneNum);
    };

    return {
        Contact:Contact,
    }

})();

app.Group = (function(){
    //Class Group
    function Group(name) {
        Item.call(this);
        this.name = name;
    }

    Group.prototype = Object.create(Item);
    Group.prototype.print = function () {
//    todo print the GROUP to the DOM
        console.log("test",this.name);
    };

    return {
        Group:Group,
    }
})();