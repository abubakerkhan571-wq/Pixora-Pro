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
// ===================================
// HOME CONTROLLER
// ===================================

/* ===================================
   Build 005 - Home Controller
=================================== */
// ===================================
// EDITOR CONTROLLER
// ===================================

/* ===================================
   Build 006 - Editor Controller
=================================== */
// ===================================
// AI CONTROLLER
// ===================================

/* ===================================
   Build 007 - AI Controller
=================================== */
// ===================================
// IMAGE IMPORT CONTROLLER
// ===================================

const imagePicker = document.getElementById("imagePicker");
const editorImage = document.getElementById("editorImage");
const toolImage = document.getElementById("toolImage");

if (toolImage && imagePicker && editorImage) {

    toolImage.addEventListener("click", () => {

        imagePicker.click();

    });

    imagePicker.addEventListener("change", (event) => {

        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function(e){

            editorImage.src = e.target.result;

            editorImage.style.display = "block";

        };

        reader.readAsDataURL(file);

    });

}
// ===================================
// Build 008 - Photo Editor Navigation
// ===================================

window.addEventListener("load", () => {

    const photoEditorCard = document.getElementById("photoEditorCard");

    if (photoEditorCard) {

        photoEditorCard.addEventListener("click", () => {

            openScreen(editorScreen);

        });

    }

});
