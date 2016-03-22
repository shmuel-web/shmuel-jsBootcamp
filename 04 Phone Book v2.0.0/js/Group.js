var app = app || {};

app.Group = (function(){
    //Class Group
    function Group(name,currentGroup,id) {

        this.name = name;
        this.parent = currentGroup;
        this.id = id;
        this.childItems = [];
    }

    return Group;
})();