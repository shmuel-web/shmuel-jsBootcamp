/**
 * Created by shmuel-d on 21.2.2016.
 */
var bTree = require('./bTree.js');

//==================tests=======================
function comp (parent,node){
    if (node > parent){
        return 1;
    }
    else if(node < parent){
        return -1;
    }
    else{
        return 0;
    }
}

function printNode(node){
    console.log(node.data);
}

var tree = bTree.createTree(comp);

bTree.add(tree, 1);

bTree.add(tree, 30);

bTree.add(tree, -30);

bTree.add(tree, 150);


if (bTree.contains(tree,-30)){
    console.log("sweet");
}

console.log(tree.root.data,tree.root.right.data,tree.root.left.data);

bTree.scan(tree,printNode);
