
(function tabz(){
    var navList = document.querySelectorAll('nav li'); //gets a node list
    var navArray = Array.prototype.slice.call(navList); // converts NodeList to Array

    var panelList = document.querySelectorAll('.panel');
    var panelzArray = Array.prototype.slice.call(panelList);


    navArray.forEach(function(panel){
        console.log(panel);
        panel.addEventListener('click',showPanel);
    });

    function showPanel(event){
        var data = event.target.getAttribute("data-val");
        var panel = document.getElementById(data);

        //removing each of the panelz from screen
        panelzArray.forEach(function(panel){
            panel.setAttribute('style',' display: none') ;
        });
        //making the clicked on tab visible
        panel.setAttribute('style',' display: block');
    }
})();



