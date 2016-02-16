/**
 * Created by shmuel-d on 15.2.2016.
 */

var counter = 0;

$('#counter').click(function(e) {
    e.preventDefault();
    ++counter;
    $('#counter').append('<span class="new badge">' + counter + '</span>');

})
