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

    currentX = 0;
    currentY = 0;

    currentScale = 1;

    currentRotation = 0;

    updateTransform();
    updateFilters();
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

updateTransform();

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

updateTransform();

});
// ===================================
// Build 018 - Rotate System
// ===================================

let currentRotation = 0;

const toolEffects = document.getElementById("toolEffects");

if(toolEffects){

    toolEffects.addEventListener("click",()=>{

        currentRotation += 90;

        updateTransform();

    });

}
// ===================================
// Build 019 - Update Transform Engine
// ===================================

function updateTransform(){

    editorImage.style.transform =
    `translate(${currentX}px,${currentY}px)
     scale(${currentScale})
     rotate(${currentRotation}deg)`;

}
// ===================================
// Build 021 - Filter Engine
// ===================================

let brightness = 100;
let contrast = 100;
let saturate = 100;

function updateFilters(){

    editorImage.style.filter =
    `brightness(${brightness}%)
     contrast(${contrast}%)
     saturate(${saturate}%)`;

}
// ===================================
// Build 022 - Brightness Slider
// ===================================

const toolFilter =
document.getElementById("toolFilter");

const filterPanel =
document.getElementById("filterPanel");

const brightnessSlider =
document.getElementById("brightnessSlider");

if(toolFilter){

toolFilter.onclick=()=>{

filterPanel.style.display="block";

};

}

if(brightnessSlider){

brightnessSlider.oninput=(e)=>{

brightness=parseInt(e.target.value);

updateFilters();

};

}
// ===================================
// Build 028 - Filter Panel Toggle
// ===================================

const filterButton = document.getElementById("toolFilter");
const filterPanel = document.getElementById("filterPanel");

if (filterButton && filterPanel) {

    filterButton.addEventListener("click", () => {

        if (filterPanel.style.display === "block") {

            filterPanel.style.display = "none";

        } else {

            filterPanel.style.display = "block";

        }

    });

}
// ===================================
// Build 029 - Contrast & Saturation
// ===================================

const contrastSlider =
document.getElementById("contrastSlider");

const saturationSlider =
document.getElementById("saturationSlider");

if(contrastSlider){

contrastSlider.oninput=(e)=>{

contrast=parseInt(e.target.value);

updateFilters();

};

}

if(saturationSlider){

saturationSlider.oninput=(e)=>{

saturate=parseInt(e.target.value);

updateFilters();

};

}
// ===================================
// Build 032 - Filter Engine
// ===================================

let brightness = 100;
let contrast = 100;
let saturate = 100;

function updateFilters(){

    editorImage.style.filter =
    `brightness(${brightness}%)
     contrast(${contrast}%)
     saturate(${saturate}%)`;

}
// ===================================
// Build 032 - Brightness Slider
// ===================================

const brightnessSlider =
document.getElementById("brightnessSlider");

if(brightnessSlider){

    brightnessSlider.addEventListener("input",(e)=>{

        brightness = parseInt(e.target.value);

        updateFilters();

    });

}
// ===================================
// Build 033 - Filter Panel Controller
// ===================================

const toolFilter =
document.getElementById("toolFilter");

const filterPanel =
document.getElementById("filterPanel");

if(toolFilter && filterPanel){

    toolFilter.addEventListener("click",()=>{

        if(filterPanel.style.display==="block"){

            filterPanel.style.display="none";

        }else{

            filterPanel.style.display="block";

        }

    });

}
// ===================================
// Build 034 - Contrast Slider
// ===================================

const contrastSlider =
document.getElementById("contrastSlider");

if(contrastSlider){

    contrastSlider.addEventListener("input",(e)=>{

        contrast = parseInt(e.target.value);

        updateFilters();

    });

}
// ===================================
// Build 035 - Saturation Slider
// ===================================

const saturationSlider =
document.getElementById("saturationSlider");

if(saturationSlider){

    saturationSlider.addEventListener("input",(e)=>{

        saturate = parseInt(e.target.value);

        updateFilters();

    });

}
// ===================================
// Build 036 - Effects Panel
// ===================================

const toolEffects =
document.getElementById("toolEffects");

const effectsPanel =
document.getElementById("effectsPanel");

if(toolEffects && effectsPanel){

toolEffects.addEventListener("click",()=>{

if(effectsPanel.style.display==="block"){

effectsPanel.style.display="none";

}else{

effectsPanel.style.display="block";

}

});

}
// ===================================
// Build 037 - Working Effects
// ===================================

const effectOriginal =
document.getElementById("effectOriginal");

const effectBW =
document.getElementById("effectBW");

const effectSepia =
document.getElementById("effectSepia");

const effectVintage =
document.getElementById("effectVintage");

const effectBlur =
document.getElementById("effectBlur");

if(effectOriginal){

effectOriginal.onclick=()=>{

editorImage.style.filter=
`brightness(${brightness}%)
contrast(${contrast}%)
saturate(${saturate}%)`;

};

}

if(effectBW){

effectBW.onclick=()=>{

editorImage.style.filter=
`grayscale(100%)`;

};

}

if(effectSepia){

effectSepia.onclick=()=>{

editorImage.style.filter=
`sepia(100%)`;

};

}

if(effectVintage){

effectVintage.onclick=()=>{

editorImage.style.filter=
`sepia(60%) contrast(120%) brightness(110%)`;

};

}

if(effectBlur){

effectBlur.onclick=()=>{

editorImage.style.filter=
`blur(3px)`;

};

}
// ===================================
// Build 038 - Text Panel
// ===================================

const toolText =
document.getElementById("toolText");

const textPanel =
document.getElementById("textPanel");

if(toolText && textPanel){

toolText.addEventListener("click",()=>{

if(textPanel.style.display==="block"){

textPanel.style.display="none";

}else{

textPanel.style.display="block";

}

});

}
// ===================================
// Build 039 - Add Text
// ===================================

const addTextBtn =
document.getElementById("addTextBtn");

const textInput =
document.getElementById("textInput");

const editorCanvas =
document.getElementById("editorCanvas");

if(addTextBtn){

addTextBtn.addEventListener("click",()=>{

if(textInput.value.trim()==="") return;

const text=document.createElement("div");

text.className="editorText";

text.innerText=textInput.value;

editorCanvas.appendChild(text);

textInput.value="";

});

}
// ===================================
// Build 040 - Move Text
// ===================================

let activeText = null;

let textOffsetX = 0;

let textOffsetY = 0;

editorCanvas.addEventListener("pointerdown",(e)=>{

if(!e.target.classList.contains("editorText")) return;

activeText = e.target;

const rect = activeText.getBoundingClientRect();

textOffsetX = e.clientX - rect.left;

textOffsetY = e.clientY - rect.top;

});

window.addEventListener("pointermove",(e)=>{

if(!activeText) return;

const canvasRect = editorCanvas.getBoundingClientRect();

activeText.style.left =
(e.clientX - canvasRect.left - textOffsetX)+"px";

activeText.style.top =
(e.clientY - canvasRect.top - textOffsetY)+"px";

activeText.style.transform="none";

});

window.addEventListener("pointerup",()=>{

activeText = null;

});
// ===================================
// Build 041 - Text Color
// ===================================

const textColor =
document.getElementById("textColor");

if(textColor){

textColor.addEventListener("input",()=>{

if(activeText){

activeText.style.color =
textColor.value;

}

});

}
// ===================================
// Build 042 - Text Size
// ===================================

const textSize =
document.getElementById("textSize");

if(textSize){

textSize.addEventListener("input",()=>{

if(activeText){

activeText.style.fontSize =
textSize.value+"px";

}

});

}
