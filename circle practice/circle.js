/**
 * Created by shmuel-d on 21.2.2016.
 */
var dad ={
    son:son,
    id:1
}

var son = {
    son:grandson,
    id:2
}

var grandson = {
    son:dad,
    id:3
}

res = JSON.stringify(dad);
console.log(res);