var app = app || {};

app.PhoneBook = function PhoneBook () {

    this.currentGroup = {};

    //this property encapsulates all the logic & data
    this.model = app.model(this);

};


