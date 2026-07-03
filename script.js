/* ===================================
   Pixora Pro
   Foundation Script
=================================== */

// ===================================
// Pixora Pro Main Controllers
// ===================================

// ===================================
// SCREEN CONTROLLER
// ===================================

/* ===================================
   Build 002 - Part 5
   Screen Controller
=================================== */

const splashScreen = document.getElementById("splashScreen");
const loginScreen = document.getElementById("loginScreen");
const homeScreen = document.getElementById("homeScreen");
const editorScreen = document.getElementById("editorScreen");

function hideAllScreens(){

    splashScreen.style.display = "none";
    loginScreen.style.display = "none";
    homeScreen.style.display = "none";
    editorScreen.style.display = "none";

}

function openScreen(screen){

    hideAllScreens();

    screen.style.display = "flex";

   }
// ===================================
// SPLASH CONTROLLER
// ===================================

/*====================================
 Build 003 - Splash Controller
====================================*/

function startSplash(){

    const splash =
    document.getElementById("splashScreen");

    const login =
    document.getElementById("loginScreen");

    setTimeout(()=>{

        splash.style.opacity="0";

        splash.style.transition=
        "0.6s";

        setTimeout(()=>{

            splash.style.display="none";

            login.style.display="flex";

        },600);

    },2500);

}

window.addEventListener("load",startSplash);
// ===================================
// LOGIN CONTROLLER
// ===================================

/*====================================
 Build 004 - Login Buttons
====================================*/

const googleBtn = document.getElementById("googleLoginBtn");
const guestBtn = document.getElementById("guestLoginBtn");

if (googleBtn) {

    googleBtn.addEventListener("click", () => {

        alert("Google Login will be connected in Build 005");

    });

}

if (guestBtn) {

    guestBtn.addEventListener("click", () => {

        document.getElementById("loginScreen").style.display = "none";

        document.getElementById("homeScreen").style.display = "flex";

    });

}
