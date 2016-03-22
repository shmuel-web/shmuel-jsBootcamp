var app = app || {};

app.helpers = (function(){
    var nextId = 1;

    function genarateId(){
        return nextId++;
    }

    return {
        genarateId:genarateId,
    }
})();