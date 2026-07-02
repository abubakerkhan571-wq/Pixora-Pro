/* ===================================
   PIXORA PRO
   BUILD 003 - PART 3
   APP CORE
=================================== */

const App = {

    version: "0.0.3",

    start() {

        console.log("Pixora Pro Started");

        setTimeout(() => {

            document.getElementById("splash").style.display = "none";

            document.getElementById("app").style.display = "block";

        },2000);

    }

};

document.addEventListener("DOMContentLoaded",()=>{

    App.start();

});
