var app = app || {};
app.helloFunction = (function () {
    function hello (){
        console.log('hello service locator');
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            hello:hello
        };
    }
    else{
        return {
            hello:hello
        }
    }

})();

