/*
 * this layer is all about data manipulation
 * */

// todo create a class phone book


function PhoneBook (){

    this.currentGroup = {};

    //this property encapsulates all the logic & data
    this.model = model(this);

    //this property encapsulates all the dom manipulations
    this.view = view(this);

    //this property encapsulates all the event handlers
    this.controller = controller(this);
}

//test

