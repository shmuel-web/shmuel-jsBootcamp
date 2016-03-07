var MediaWidget =  MediaWidget || {};

function inherit(derived, base) {
    function Dummy() { }
    Dummy.prototype = base.prototype;
    derived.prototype = new Dummy();
}

MediaWidget.MediaItem = (function(){
    function MediaItem(width,height) {
        this.width = width;
        this.height = height;
    }

    MediaItem.prototype.display = function(){
        console.log('default',this.width,this.height);
    };
    return MediaItem;
})();


MediaWidget.StaticMediaItem = (function(){
    function StaticMediaItem(width,height) {
        MediaWidget.MediaItem.call(this,width,height);
    }

    inherit(StaticMediaItem,MediaWidget.MediaItem);
    return StaticMediaItem;
})();

MediaWidget.Image = (function(){
    function Image(width,height,src){
        MediaWidget.StaticMediaItem.call(this,width,height);

        this.src = src;
    }

    inherit(Image,MediaWidget.StaticMediaItem);

    Image.prototype.display = function(){
//    todo
        console.log('not default',this.width,this.height,this.src);
    };

    return Image
})();


MediaWidget.Video = (function(){
    function Video(width,height,src){
        MediaWidget.StaticMediaItem.call(this,width,height);

        this.src = src;
    }

    inherit(Video,MediaWidget.StaticMediaItem);

    Video.prototype.display = function(){
//    todo
        console.log('default',this.width,this.height,this.src);
    };

    return Video
})();

MediaWidget.Paragraph = (function(){
    function Paragraph(width,height,str){
        MediaWidget.StaticMediaItem.call(this,width,height);

        this.str = str;
    }

    inherit(Paragraph,MediaWidget.StaticMediaItem);

    Paragraph.prototype.display = function(){
//    todo
        console.log('default',this.width,this.height,this.str);
    };

    return Paragraph

})();


MediaWidget.RotatingMediaItem = (function (){
    function RotatingMediaItem(width,height,interval) {
        MediaWidget.MediaItem.call(this,width,height);

        this.interval = interval;
    }

    inherit(RotatingMediaItem,MediaWidget.MediaItem);

    return RotatingMediaItem
})();

MediaWidget.RotatingImage = (function(){
    function RotatingImage(width,height,interval,srcArray) {
        MediaWidget.RotatingMediaItem.call(this,width,height,interval);
        this.srcArray = srcArray;
    }

    inherit(RotatingImage,MediaWidget.RotatingMediaItem);

    RotatingImage.prototype.display = function(){
//    todo
        console.log('default',this.width,this.height,this.interval,this.srcArray);
    };
    return RotatingImage
})();

MediaWidget.NewsTicker = (function(){
    function NewsTicker(width,height,interval,strArray){
        MediaWidget.RotatingMediaItem.call(this,width,height,interval);

        this.strArray = strArray;
    }

    inherit(NewsTicker,MediaWidget.RotatingMediaItem);

    NewsTicker.prototype.display = function(){
//    todo
        console.log('default',this.width,this.height,this.interval,this.strArray);

    };

    return NewsTicker
})();
