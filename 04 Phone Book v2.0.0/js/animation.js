var app = app || {};

app.animation = (function(){
    var main = $('main');

    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    function outInAnimation (callback){
        var outAnimationName = "animated bounceOutLeft";
        var inAnimationName = "animated bounceInRight";

        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        main.addClass(outAnimationName).one(animationEnd,function(){
            callback();
            main.removeClass(outAnimationName);
            main.addClass(inAnimationName).one(animationEnd,function(){
                main.removeClass(inAnimationName);
            })
        });
    }

    function RightOutLeftInAnimation(callback){
        var outAnimationName = "animated bounceOutRight";
        var inAnimationName = "animated bounceInLeft";

        main.addClass(outAnimationName).one(animationEnd,function(){
            callback();
            main.removeClass(outAnimationName);
            main.addClass(inAnimationName).one(animationEnd,function(){
                main.removeClass(inAnimationName);
            })
        });
    }

    function popInAnimation (element){
        element.addClass('animated slideInUp').one(animationEnd,function(){
           element.removeClass('animated slideInUp');
        });
    }

    function popOutAnimation(element){
        element.addClass('animated slideOutDown').one(animationEnd,function(){
            element.removeClass('animated slideOutDown');
        });
    }

    return {
        leftOutRightInAnimation:outInAnimation,
        RightOutLeftInAnimation:RightOutLeftInAnimation,
        popInAnimation:popInAnimation,
        popOutAnimation:popOutAnimation,
    }
})();
