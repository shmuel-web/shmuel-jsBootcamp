/**
 * Created by shmuel-d on 24.2.2016.
 */
//todo create a lib in global scope like jQuery!!!
/*todo API:
*   hide--delay
*   show--delay
*   find
*   delete
*   {delay as arguments}
*   */

//initiate the lib
var args = {
    name:'$',
    delay:1000
};

(function(args){
    var name = args.name || 'shmuelQuery';
    var defaultDelay = args.delay || 0;

    function hide (identifier,delay){
        var delayHide = delay || defaultDelay;
        var element = document.querySelector(identifier);
        setTimeout(function(){
            element.style.visibility = "hidden";
        },delayHide);
    }

    function find (identifier){
        return document.querySelector(identifier);

    }

    function show (identifier,delay){
        var delayShow = delay || defaultDelay;
        var element = document.querySelector(identifier);
        setTimeout(function(){
            element.style.visibility = "visible";
        },delayShow);

    }

    function remove (identifier){
        var element = document.querySelector(identifier);
        element.remove();
    }

    window[name] = {
        hide:hide,
        find:find,
        show:show,
        remove:remove
    }
})(args);



