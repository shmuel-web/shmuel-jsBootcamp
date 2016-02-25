/**
 * Created by shmuel-d on 23.2.2016.
 */
//todo create the panel functionality
/*
* function sideMenuSlide(){
 console.log(sideMenu.className);
 if (sideMenu.className.match(/(?:^|\s)opened(?!\S)/)){
 //    close
 sideMenu.className += " closed";
 sideMenu.className = sideMenu.className.replace
 ( /(?:^|\s)opened(?!\S)/g , '' );
 }
 else {
 if (sideMenu.className.match(/(?:^|\s)closed(?!\S)/)){
 //    open

 sideMenu.className += " opened";
 sideMenu.className = sideMenu.className.replace
 ( /(?:^|\s)closed(?!\S)/g , '' );
 }
 }
 }
* */
//var navBtn = document.querySelector(".nav-btn")
// ;



var allPanels = document.querySelector('.panel');
function changePanel(panelNum){
    console.log(panelNum);

    allPanels.className = allPanels.className.replace( /(?:^|\s)active(?!\S)/g , '' );

    var panel = document.getElementById(panelNum);
    console.log(panel);
    panel.className += ' active';

}

//navBtn.addEventListener("click", changePanel);