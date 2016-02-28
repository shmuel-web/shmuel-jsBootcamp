/**
 * Created by shmuel-d on 28.2.2016.
 */
var sl = app.serviceLocator;
var myFunc = app.helloFunction.hello;

sl.register('hello',myFunc);

var resolvedHelloFunction = sl.resolve('hello');

resolvedHelloFunction();


