$(document).ready(function(){
    //'pic/"+(i+1) +"-6ZzM1GGwaR.jpg'
    var part = "<div class='part'></div>";
    for (var i=0; i<9; i++){
        part = '<div class="part" style="background-image: url(\'pic/'+ (i+1) +'-6ZzM1GGwaR.jpg\')"></div>';
        $('.puzzle').append(part);
    }

    $(".part").mousedown(function(){
        var clone = $('.part');
        $(document).mousemove(function(e) {
            clone.offset({ top: e.pageY, left: e.pageX });
        }).click(function () {
            $(this).unbind("mousemove");
        });
    });
});
