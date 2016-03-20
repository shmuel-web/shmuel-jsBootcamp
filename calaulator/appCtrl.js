(function(){
    function AppCtrl(calcService){
        this.calcService = calcService;
        this.btnz = [1,2,3,4,5,6,7,8,9,0,'+','-',"=","clr"];
    }

    AppCtrl.prototype.calc = function(btn){
        this.result = this.calcService.calc(btn);
        console.log(this.result);

    };

    myApp.controller('AppCtrl',AppCtrl);
})();
