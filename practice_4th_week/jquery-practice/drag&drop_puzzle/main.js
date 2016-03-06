$(document).ready(function(){

    function initPuzzle(){

        function shuffle(array) {
            var i = array.length,
                j = 0,
                temp;

            while (i--) {

                j = Math.floor(Math.random() * (i+1));

                // swap randomly chosen element with current element
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }

        for (var i=0; i<9; i++){
            var tile = '<div class="tile bc-img-'+(i+1)+'"></div>';
            $('.puzzle').append(tile);
        }

        function shufflePuzzle(){
            var randomNums = shuffle([1,2,3,4,5,6,7,8,9]);
            randomNums.forEach(function(num,index){

            })

        }
    }
    initPuzzle();
});
