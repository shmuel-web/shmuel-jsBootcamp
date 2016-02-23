/**
 * Created by shmuel-d on 14.2.2016.
 */
/*
API:
    insertLast(data)
    insertFirst
    insertBefore

* */

function ListItem(prePos, data){
    this.prePos = prePos;
    this.pos = ++LINKEDLIST.last;//the new id shold by unike
    this.data = data;
    this.nextPos =null;
}

function LinkedList(){
    this.first = 0;
    this.last = 0;
}
var LINKEDLIST = new LinkedList();

var DB = [];

function findItem(pos){
    DB.forEach(function(element){
        if (element.pos == pos){
            return element;
        }
    });
}


//1
function listInsertLast(data){

    if (!LINKEDLIST.last == 0){
        //    find his prePos an add his pos as next pos
        var item = new ListItem(LINKEDLIST.last, data);
        var preItem = findItem(item.prePos);
        preItem.nextPos = item.pos;
        DB.push(item);
    }
    else{
        var item = new ListItem(LINKEDLIST.last, data);
        DB.push(item);
    }
    return item.pos;
}

//2
function listInsertBefore(pos, data){
    var pushedItem = findItem(pos);
    var prePushed = findItem(pushedItem.prePos);
    var item = new ListItem(prePushed.position,data);
    DB.push(item);
    pushedItem.prePos = item.pos;
    prePushed.nextPos = item.pos;

}

//3
function listGetFirst(){
    return LINKEDLIST.first;
}

//4
function listGetNext(pos){
    var item = findItem(pos);
    return item.nextPos;
}

//5
function listGetData(pos){
    var item = findItem(pos);
    return item.data;
}

var ori = {id: 1, name: "Ori"};
var roni = {id:2, name: "Roni"};
var udi = {id:3, name: "Udi"};
var beni = {id:4, name: "Beni"};

listInsertLast(ori);
var pos = listInsertLast(roni);
listInsertLast(udi);
listInsertBefore(pos, beni);

var pos = listGetFirst();
while (pos) {
    var data = listGetData(pos);
    console.log(data.id + ": " + data.name);

    pos = listGetNext(pos);
}