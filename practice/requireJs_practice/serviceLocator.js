define([],function(){
    var services = [];

    function register(name,service){
        var service = {
            name:name,
            service:service
        };
        services.push(service);
    }

    function resolve(name){
        var found =false;
        services.forEach(function(service){
            if (service.name == name){
                found = service.service;
            }
        });
        return found;
    }

    if (typeof module !== 'undefined' && module.exports){
        module.exports = {
            register:register,
            resolve:resolve
        }
    }
    else{
        return {
            register:register,
            resolve:resolve
        };
    }
});
