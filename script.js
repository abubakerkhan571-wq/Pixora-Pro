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
            setupHomeEvents();
        });

    }

});
// ===================================
// HOME EVENTS
// ===================================

function setupHomeEvents(){

    const photoEditorCard = document.getElementById("photoEditorCard");

    if(photoEditorCard){

        photoEditorCard.onclick = function(){

    openScreen(editorScreen);

    setTimeout(() => {

        imagePicker.click();

    }, 200);

};

    }

}
// ===================================
// Build 016 - Image Drag System
// ===================================

let currentX = 0;
let currentY = 0;

let startX = 0;
let startY = 0;

let dragging = false;

editorImage.addEventListener("pointerdown",(e)=>{

dragging = true;

startX = e.clientX-currentX;
startY = e.clientY-currentY;

editorImage.style.cursor="grabbing";

});

window.addEventListener("pointermove",(e)=>{

if(!dragging) return;

currentX = e.clientX-startX;
currentY = e.clientY-startY;

editorImage.style.transform =
`translate(${currentX}px,${currentY}px)`;

});

window.addEventListener("pointerup",()=>{

dragging = false;

editorImage.style.cursor="grab";

});
// ===================================
// Build 017 - Pinch Zoom System
// ===================================

let currentScale = 1;

editorImage.addEventListener("wheel",(e)=>{

e.preventDefault();

if(e.deltaY<0){

currentScale +=0.05;

}else{

currentScale -=0.05;

}

if(currentScale<0.3) currentScale=0.3;

if(currentScale>5) currentScale=5;

editorImage.style.transform =
`translate(${currentX}px,${currentY}px) scale(${currentScale})`;

});
