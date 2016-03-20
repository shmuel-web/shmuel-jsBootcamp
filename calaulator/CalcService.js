/**
 * Created by shmuel-d on 20.3.2016.
 */
(function(){
    function calcService(){
        this.calcView = "";
    }

    calcService.prototype.calc = function (param) {

        switch(param){
            case "=":
                this.calcView = eval(this.calcView);
                break;
            case "clr":
                this.calcView = "";
                break;
            default:
                this.calcView = this.calcView + param;

        }
        return this.calcView;
    };

    myApp.service('calcService',calcService);
})();