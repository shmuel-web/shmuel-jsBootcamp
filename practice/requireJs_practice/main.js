define(["./serviceLocator","./hello"],function (serviceLocator, hello){
    var myFunc = hello.hello;
    serviceLocator.register('hello',myFunc);
    var resolvedHelloFunction = serviceLocator.resolve('hello');
    resolvedHelloFunction();
});









