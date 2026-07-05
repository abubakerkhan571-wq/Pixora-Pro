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

editorImage.style.transform=
`translate(${imageX}px,${imageY}px)
scale(1)
rotate(0deg)`;

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
