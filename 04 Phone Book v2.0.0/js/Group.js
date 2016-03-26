var app = app || {};

app.Group = (function(){
    //Class Group
    function Group(name,currentGroup,id) {

        this.name = name;
        this.parent = currentGroup;
        this.id = id;
        this.childItems = [];
    }

    Group.prototype.addSubGroup = function (name,callback) {
        var newSubGroup = new app.Group(name,this,app.helpers.genarateId());
        this.childItems.push(newSubGroup);
        if(callback){
            callback();
        }
    };

    Group.prototype.addContact = function (firstName,lastName,phoneNumbers,callback){
        var newContact = new app.Contact(firstName,lastName,phoneNumbers,this,app.helpers.genarateId());
        this.childItems.push(newContact);
        if (callback){
            callback();
        }
    };


    return Group;
})();