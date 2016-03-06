var modalLayer = (function(){

    var root = createGroup("~");
    var currentGroup = root;
    var nextId = 0;




    function addNewContact(firstName,lastName,phoneNumbers){

        var contact = createContact(firstName, lastName, phoneNumbers);
        addItem(contact);
    }

    function addNewGroup(name){
        var group = createGroup(name);
        addItem(group);
    }

    function changeCurrentGroup(name) {

        if (name == "..") {
            if (!currentGroup.parent) {
                return;
            }

            currentGroup = currentGroup.parent;
        }
        else {
            var subGroup = findGroup(name);
            if (!subGroup) {
                //console.log("Group with name " + name + " was not found")
            }
            else {
                currentGroup = subGroup;
            }

        }
    }

    function getCurrentGroupContacts() {
        var currentContacts = [];

        currentGroup.items.forEach(function(childItem){
            if (childItem.firstName){
                currentContacts.push(childItem);
            }
        });

        return currentContacts;
    }

    /*
     * gets a search parameter
     * returns every item the string is in
     * */
    function find(searchParam, item) {
        var foundItems = [];
        var sParam = searchParam.toUpperCase();
        if (!item){
            item = root;
        }

        if (item.firstName) {
            if (item.firstName.toUpperCase() == sParam || item.lastName.toUpperCase() == sParam) {
                foundItems.push(item);
            }
        }
        else if (item.name) {
            if (item.name.toUpperCase() == sParam) {
                foundItems.push(item);
            }
            if (item.items.length > 0) {
                item.items.forEach(function (childItem) {
                    find(sParam, childItem);
                });
            }
        }
        return foundItems;
    }

    function findItemById(id ,phonbookItem,foundItem){
        foundItem = foundItem || false;
        var item = phonbookItem || root;

        if (item.id == id){
            foundItem = item;
        }else if(item.items && item.items.length > 0 && !foundItem){
            item.items.forEach(function(childItem){
                foundItem = findItemById(id ,childItem, foundItem);
            });
        }
        return foundItem;
    }

    /*
     * gets id num
     * and delete the item
     * */
    function deleteItem(){
//    todo
        var id = readNonEmptyString('please type the id of the item you wish to delete :');
        if (!isNaN(id)){
            var item = findItemById(id);
            item.parent.items.forEach(function(childItem,index,array){
                if (childItem.id == id){
                    array.splice(index,1);
                }
            })
        }

    }


    function createContact(firstName, lastName, phoneNumbers) {
        return {
            id: generateNextId(),
            firstName: firstName,
            lastName: lastName,
            phoneNumbers: phoneNumbers
        }
    }

    function createGroup(name) {
        return {
            id: generateNextId(),
            name: name,
            items: []
        }
    }

    function addItem (item) {
        if (currentGroup.item) {
            throw Error("Item with id " + item.id + " was already added to group: " + item.currentGroup.id);
        }

        currentGroup.items.push(item);

        item.parent = currentGroup;
    }

    function generateNextId(){
        return nextId++;
    }

    function writeToFile(){
        var phoneBookArrey = getPhoneBookItemsArray();
        var jsonPhonebook = JSON.stringify(phoneBookArrey);
        fs.writeFileSync('phonebook.json',jsonPhonebook,'utf8');
        console.log(jsonPhonebook);//testing purpose
    }

    function findGroup(name){
        var subGroup = false;
        currentGroup.items.forEach(function (item){
            if (item.name == name){
                subGroup = item;
            }
        });
        return subGroup;
    }

    function readFile() {
        var phonebook = fs.readFileSync('phonebook.json', 'utf8');
        //console.log(phonebook);
        phonebook = JSON.parse(phonebook);
        phonebook.forEach(function(item,index,array){
            load(item,index,array);
        })
    }
    function writeToLocal(){
    //    todo
    }

    function readFromLocal(){
    //    todo
    }

    function load (item,index,array){
        if (item.firstName){
            var contact = createContact(item.firstName,item.lastName,item.phoneNumbers);
            addItem(contact);
        }
        else if(item.name && item.name !== "~"){
            var group = createGroup(item.name);
            addItem(group);

            if (item.items > 0){
                currentGroup = group;

                for (var i = ++index; i < index + item.items; i++){ //iterating over his children & inserting them
                    load(array[i],i,array);//recurse
                }
                array.splice(index,item.items);//removing the added items so that the for each loop cold continue properly
                currentGroup = group.parent;
            }
        }
        else if (item.name == "~"){
            if (item.items > 0){

                for (var i = ++index; i < index + item.items; i++){
                    load(array[i],i,array);
                }
                array.splice(index,item.items);
                currentGroup = root;
            }
        }
    }

    return {
        getAllItems:root,//done
        getCurrentGroupContacts:getCurrentGroupContacts,//done
        createContact:createContact,//done
        createGroup:createGroup,//done
        find:find,//done
        currentGroup:currentGroup,
        deleteItem:deleteItem,//done
        deleteGroup:deleteItem,//done
        writeToLocal:writeToLocal,//todo
        readFromLocal:readFromLocal//todo


    }
})();

var viewLayer = (function(){

    function displayDirectory(item){
        var item = item || modalLayer.getAllItems;
        if (item.name){
            //display group name as li link in the directory
            console.log(item);
            if (item.items > 0){
            //    open a ul in the doom
                item.items.forEach(function(childItem){
                    displayDirectory(childItem);
                });
            //    close the ul

            }
        }

    }

    function displayCurrentGroup(){
        var title = document.querySelector("#current-group-title");
        var currentGroup = modalLayer.currentGroup;
        console.log(currentGroup.name);
        if (currentGroup.name == '~'){
            title.innerText = 'Phone Book';
        }
        else{
            title.innerText = currentGroup.name ;
        }

    }

    function displayCurrentGroupContacts(){

    }

    function createGroupForm(){

    }

    function createContactForm (){

    }

    function deleteGroupView(){

    }

    function displaySearchResults(){

    }


    return {
        displayDirectory:displayDirectory,
        displayCurrentGroup:displayCurrentGroup,//done
        displayCurrentGroupContacts:displayCurrentGroupContacts,
        createGroupForm:createGroupForm,
        createContactForm:createContactForm,
        deleteGroupView:deleteGroupView,
        displaySearchResults:displaySearchResults,
    }
})();


