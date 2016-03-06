
/**
 * Created by shmuel-d on 6.3.2016.
 */
function LinkList(){
    var root = {
        prev:null,
        next:null
    };
    function insertLast(data) {
        function getLastNode(node) {
            var node = node || root;
            if (node.next == null) {
                node.next = {
                    data: data,
                    prev: node,
                    next: null
                };
            }
            else {
                getLastNode(node.next);
            }
        }
    }


    function equals(other,comp){

        function iterator(node1,node2){
            node1 = node1 || root;
            node2 = node2 || other.root;

            if (comp(node1,node2)){
                return (iterator(node1.next,node2.next))
            }
        }
    }

    return {
        insertLast:insertLast,
        equals:equals,
        root:root
    }
}

(function() {

    var list1 = LinkList();
    for(var i=0; i<10; i++) {
        list1.insertLast(i);
    }

    var list2 = LinkList();
    for(var i=0; i<10; i++) {
        list2.insertLast(i);
    }

    var res = list1.equals(list2, function(n1, n2) {
        return n1 == n2;
    });

    console.log(res);
})();
