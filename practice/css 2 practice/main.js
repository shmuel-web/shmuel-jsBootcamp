/**
 * Created by shmuel-d on 22.2.2016.
 */
var sideMenu = document.querySelector(".side-menu");

//var sideMenuBtn = document.querySelector(".menu-btn");

function sideMenuSlide(){
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

//sideMenuBtn.addEventListener("click", sideMenuSlide);
