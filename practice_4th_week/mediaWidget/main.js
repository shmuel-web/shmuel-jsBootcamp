MediaWidget = MediaWidget || {};

var items = [];

var news = new MediaWidget.NewsTicker(300,300,4000,["bla bla bla","yada yada yada"]);
var video = new MediaWidget.Video(500,600,"src=http://bla bla.com");
var image = new MediaWidget.Image(300,400,"src=http://bla bla bla.co.il");

var rImage = new MediaWidget.RotatingImage(120,120,5000,["src1","src2","src3"]);
var paragraph = new MediaWidget.Paragraph(130,130,"ha ha nelson");


items.push(news,video,image,rImage,paragraph);


items.forEach(function(item){
    item.display();//polymorphizem
});