function LinkList() {

    this.head = null;
    this.tail = null;
}

LinkList.prototype.insertLast = function(data){
    var node = this.createNode(data);

    if(this.tail) {
        this.tail.next = node;
        this.tail = node;
    }
    else {
        this.head = this.tail = node;
    }
};

LinkList.prototype.equals = function(other, comp) {
    var arr1 = other.toArray();
    var arr2 = this.toArray();

    if(arr1.length != arr2.length) {
        return false;
    }

    for(var i=0; i<arr1.length; i++) {
        if(arr1[i] != arr2[i]) {
            return false;
        }
    }

    return true;
};

LinkList.prototype.toArray = function() {
    var arr = [];

    var node = this.head;
    while(node!=null) {
        arr.push(node.data);

        node = node.next;
    }

    return arr;
};

LinkList.prototype.createNode = function(data) {
    return {
        data: data,
        next: null,
    };
};


