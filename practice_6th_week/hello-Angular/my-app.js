var app = angular.module("myApp",[]);
(function(){
    function ContactsCtrl(){
        this.list = [
            {'name':'ori'},
            {'name':'roni'}
        ];
    }

    ContactsCtrl.prototype.add = function(){
        this.list.push({'name':this.newContact});
    };

    ContactsCtrl.prototype.remove = function(index){
        this.list.splice(index,1);
    };

    ContactsCtrl.prototype.up = function(index,contact){
        if(index > 0){
            var temp = this.list[index-1];
            this.list[index-1] = contact;
            this.list[index] = temp;
        }
    };

    ContactsCtrl.prototype.down = function(index,contact){
        if (index < this.list.length - 1 ){
            var temp = this.list[index+1];
            this.list[index+1] = contact;
            this.list[index] = temp;
        }

    };


    app.controller('ContactsCtrl',ContactsCtrl);
})();
