/**
 * Created by shmuel-d on 28.2.2016.
 */
var app = app || {};
app.serviceLocator = (function(){
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
    sl = {
        register:register,
        resolve:resolve
    };
    if (typeof module !== 'undefined' && module.exports){
        module.exports = {
            register:register,
            resolve:resolve
        }
    }
    else{
        return sl;
    }

})();
