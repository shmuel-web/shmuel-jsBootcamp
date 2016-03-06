/**
 * Created by shmuel-d on 6.3.2016.
 */

function shape (){

}

shape.prototype.move(x,y){
    this.x += x;
    this.y += y;
}

function rect(x,y,a,b){
    this.x = x;
    this.y = y;
    this.a = a;
    this.b = b;

rect.prototype = Object.create(shape.prototype);

rect.prototype.dump = function(){
    console.log(this.x,this.y,this.a,this.b);
};

function circle(x,y,radius){
    this.x= x;
    this.y = y;
    this.radius = radius;
}

circle.prototype = Object.create(shape.prototype);

circle.prototype.dump = function(){
    console.log(this.x,this.y,this.radius);
};




