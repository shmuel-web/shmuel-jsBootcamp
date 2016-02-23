/**
* Created by shmuel-d on 21.2.2016.
*/


function createTree(comp) {
    tree = {
        root:null,
        comp:comp,
        count:0

    };
    return tree;
}

function add(tree, data){
    var newNode = {
        left:null,
        right:null,
        data:data,
        parent:null
    };
    if (tree.root ==null){
        tree.root = newNode;
        tree.count++;
        console.log('success');
        return;
    }
    else{
        var currentNode = tree.root
        var found = false;
        var added = false;
        while (currentNode && !found && !added){
            var comp = tree.comp(currentNode.data,newNode.data);
            switch (comp) {
                case 0:
                    found = true;
                    console.log('error the data already exists in the tree');
                    break;
                case 1:
                    if (currentNode.right == null) {
                        newNode.parent = currentNode;
                        currentNode.right = newNode;
                        tree.count++;
                        console.log('success');
                        added = true;
                    }
                    else {
                        currentNode = currentNode.right;
                    }
                    break;
                case -1:
                    if (currentNode.left == null) {
                        newNode.parent = currentNode;
                        currentNode.left = newNode;
                        tree.count++;
                        console.log('success');
                        added = true;
                    }
                    else {
                        currentNode = currentNode.left;
                    }
                    break;
            }
        }
    }
}

function remove(tree, data){//todo
    var node = contains(tree, data);
    if (node){
        var parentNode = node.parent;
        if (parentNode.right == node){

        }
    }


}

function contains(tree, data){
    var currentNode = tree.root;
    while (currentNode) {
        var comp = tree.comp(currentNode.data, data);
        switch (comp) {
            case 0:
                return currentNode;
            case 1:
                if (currentNode.right == null) {
                    return false;
                }
                else {
                    currentNode = currentNode.right;
                }
                break;
            case -1:
                if (currentNode.left == null) {
                    return false;
                }
                else {
                    currentNode = currentNode.left;
                }
                break;
        }
    }
}

function scan (tree, print){
    var node = tree.root;
    scanNode(node,print);
}

function scanNode(node,print){
    if(node.right){
        scanNode(node.right,print);
    }
    print(node);
    if(node.left){
        scanNode(node.left,print);
    }
}

function getCcount(tree){
    return tree.count;
}


module.exports = {
    createTree:createTree,
    add:add,
    contains:contains,
    scan:scan
};