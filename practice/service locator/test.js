/**
 * Created by shmuel-d on 28.2.2016.
 */
var sl = require('./serviceLocator.js');
var hello = require('./hello.js');

sl.register('hello',hello.hello);
var resolved = sl.resolve('hello');

if (typeof resolved === "function"){
    console.log('test worked yesh!!');

}
else{
    console.log('failed badly');
}