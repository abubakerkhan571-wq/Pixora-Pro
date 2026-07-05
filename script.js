/* ===================================
   Pixora Pro v2
   Clean Core
   Build 001
===================================*/

// ===================================
// DOM Elements
// ===================================

const splashScreen = document.getElementById("splashScreen");
const loginScreen = document.getElementById("loginScreen");
const homeScreen = document.getElementById("homeScreen");
const editorScreen = document.getElementById("editorScreen");

const googleLoginBtn = document.getElementById("googleLoginBtn");
const guestLoginBtn = document.getElementById("guestLoginBtn");

const photoEditorCard = document.getElementById("photoEditorCard");

const imagePicker = document.getElementById("imagePicker");
const editorImage = document.getElementById("editorImage");

const backToHomeBtn = document.getElementById("backToHomeBtn");

// ===================================
// Screen Controller
// ===================================

function hideAllScreens(){

if(splashScreen) splashScreen.style.display="none";
if(loginScreen) loginScreen.style.display="none";
if(homeScreen) homeScreen.style.display="none";
if(editorScreen) editorScreen.style.display="none";

}

function openScreen(screen){

hideAllScreens();

screen.style.display="flex";

}

// ===================================
// Splash
// ===================================

window.addEventListener("load",()=>{

setTimeout(()=>{

openScreen(loginScreen);

},2500);

});

// ===================================
// Login
// ===================================

if(guestLoginBtn){

guestLoginBtn.addEventListener("click",()=>{

openScreen(homeScreen);

});

}

if(googleLoginBtn){

googleLoginBtn.addEventListener("click",()=>{

alert("Google Login Coming Soon");

});

}

// ===================================
// Home
// ===================================

if(photoEditorCard){

photoEditorCard.addEventListener("click",()=>{

openScreen(editorScreen);

setTimeout(()=>{

imagePicker.click();

},200);

});

}

// ===================================
// Back
// ===================================

if(backToHomeBtn){

backToHomeBtn.addEventListener("click",()=>{

openScreen(homeScreen);

});

}

// ===================================
// Import Image
// ===================================

if(imagePicker){

imagePicker.addEventListener("change",(event)=>{

const file=event.target.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=(e)=>{

editorImage.src=e.target.result;

editorImage.style.display="block";

};

reader.readAsDataURL(file);

});

}
/* ===================================
   Build 002
   Image Drag System
===================================*/

let imageX = 0;
let imageY = 0;

let dragStartX = 0;
let dragStartY = 0;

let imageDragging = false;

function updateImageTransform(){

function updateImageTransform(){

editorImage.style.transform=
`translate(${imageX}px,${imageY}px)
scale(${imageScale})
rotate(${imageRotation}deg)`;

}

if(editorImage){

editorImage.addEventListener("pointerdown",(e)=>{

if(editorImage.style.display==="none") return;

imageDragging=true;

dragStartX=e.clientX-imageX;
dragStartY=e.clientY-imageY;

editorImage.style.cursor="grabbing";

});

}

window.addEventListener("pointermove",(e)=>{

if(!imageDragging) return;

imageX=e.clientX-dragStartX;
imageY=e.clientY-dragStartY;

updateImageTransform();

});

window.addEventListener("pointerup",()=>{

imageDragging=false;

if(editorImage){

editorImage.style.cursor="grab";

}

});
/* ===================================
   Build 003
   Mobile Pinch Zoom
===================================*/

let imageScale = 1;
let imageRotation = 0;

let startDistance = 0;

function getDistance(t1,t2){

const dx=t2.clientX-t1.clientX;
const dy=t2.clientY-t1.clientY;

return Math.sqrt(dx*dx+dy*dy);

}

editorImage.addEventListener("touchstart",(e)=>{

if(e.touches.length===2){

startDistance=
getDistance(e.touches[0],e.touches[1]);

}

},{passive:false});

editorImage.addEventListener("touchmove",(e)=>{

if(e.touches.length!==2) return;

e.preventDefault();

const newDistance=
getDistance(e.touches[0],e.touches[1]);

imageScale*=newDistance/startDistance;

if(imageScale<0.2) imageScale=0.2;
if(imageScale>5) imageScale=5;

startDistance=newDistance;

updateImageTransform();

},{passive:false});
/* ===================================
Build 004
Rotate Controller
===================================*/

const toolEffects =
document.getElementById("toolEffects");

const transformPanel =
document.getElementById("transformPanel");

const rotateSlider =
document.getElementById("rotateSlider");

if(toolEffects){

toolEffects.addEventListener("click",()=>{

transformPanel.style.display=
transformPanel.style.display==="block"
?"none"
:"block";

});

}

if(rotateSlider){

rotateSlider.addEventListener("input",()=>{

imageRotation=
parseInt(rotateSlider.value);

updateImageTransform();

});

}
/* ===================================
Build 004
Rotate Tool
===================================*/

const transformPanel =
document.getElementById("transformPanel");

const rotateSlider =
document.getElementById("rotateSlider");

const toolEffects =
document.getElementById("toolEffects");

if(toolEffects){

toolEffects.addEventListener("click",()=>{

if(transformPanel.style.display==="block"){

transformPanel.style.display="none";

}else{

transformPanel.style.display="block";

}

});

}

if(rotateSlider){

rotateSlider.addEventListener("input",()=>{

imageRotation=parseInt(rotateSlider.value);

updateImageTransform();

});

}
