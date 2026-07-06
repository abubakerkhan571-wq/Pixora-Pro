/* ===================================
Pixora Pro v2
Build 001
Foundation
=================================== */

// Screens

const splashScreen=document.getElementById("splashScreen");
const loginScreen=document.getElementById("loginScreen");
const homeScreen=document.getElementById("homeScreen");
const editorScreen=document.getElementById("editorScreen");

// Buttons

const guestLoginBtn=document.getElementById("guestLoginBtn");
const photoEditorCard=document.getElementById("photoEditorCard");
const backBtn=document.getElementById("backBtn");

// Editor

const imagePicker=document.getElementById("imagePicker");
const editorImage=document.getElementById("editorImage");

const toolGallery=document.getElementById("toolGallery");

// ================================
// Screen Manager
// ================================

function hideAllScreens(){

splashScreen.style.display="none";
loginScreen.style.display="none";
homeScreen.style.display="none";
editorScreen.style.display="none";

}

function openScreen(screen){

hideAllScreens();

screen.style.display="flex";

}

// ================================
// Splash
// ================================

window.addEventListener("load",()=>{

openScreen(splashScreen);

setTimeout(()=>{

openScreen(loginScreen);

},2000);

});

// ================================
// Login
// ================================

guestLoginBtn.addEventListener("click",()=>{

openScreen(homeScreen);

});

// ================================
// Home
// ================================

photoEditorCard.addEventListener("click",()=>{

openScreen(editorScreen);

});

// ================================
// Back
// ================================

backBtn.addEventListener("click",()=>{

openScreen(homeScreen);

});

// ================================
// Gallery
// ================================

toolGallery.addEventListener("click",()=>{

imagePicker.click();

});

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
/* ===================================
Pixora Pro v2
Build 002
Transform Engine
=================================== */

// Transform State

const imageState = {

x:0,

y:0,

scale:1,

rotation:0

};

// Apply Transform

function applyImageTransform(){

editorImage.style.transform=
`translate(${imageState.x}px,${imageState.y}px)
scale(${imageState.scale})
rotate(${imageState.rotation}deg)`;

}

// Reset Transform

function resetImageTransform(){

imageState.x=0;
imageState.y=0;
imageState.scale=1;
imageState.rotation=0;

applyImageTransform();

}

// Auto Reset When New Image Loads

imagePicker.addEventListener("change",()=>{

setTimeout(()=>{

resetImageTransform();

},50);

});
/* ===================================
Pixora Pro v2
Build 002
Image Drag
=================================== */

let imageX=0;
let imageY=0;

let startX=0;
let startY=0;

let isDragging=false;

function updateImagePosition(){

editorImage.style.transform=
`translate(${imageX}px,${imageY}px)`;

}

editorImage.addEventListener("touchstart",(e)=>{

if(editorImage.style.display==="none") return;

if(e.touches.length!==1) return;

isDragging=true;

startX=e.touches[0].clientX-imageX;
startY=e.touches[0].clientY-imageY;

});

editorImage.addEventListener("touchmove",(e)=>{

if(!isDragging) return;

if(e.touches.length!==1) return;

e.preventDefault();

imageX=e.touches[0].clientX-startX;
imageY=e.touches[0].clientY-startY;

updateImagePosition();

},{passive:false});

editorImage.addEventListener("touchend",()=>{

isDragging=false;

});
/* ===================================
Pixora Pro v2
Build 003
One Finger Drag
=================================== */

let isDragging=false;

let dragStartX=0;
let dragStartY=0;

editorImage.addEventListener("touchstart",(e)=>{

if(editorImage.style.display==="none") return;

if(e.touches.length!==1) return;

isDragging=true;

dragStartX=e.touches[0].clientX-imageState.x;
dragStartY=e.touches[0].clientY-imageState.y;

});

editorImage.addEventListener("touchmove",(e)=>{

if(!isDragging) return;

if(e.touches.length!==1) return;

e.preventDefault();

imageState.x=e.touches[0].clientX-dragStartX;
imageState.y=e.touches[0].clientY-dragStartY;

applyImageTransform();

},{passive:false});

editorImage.addEventListener("touchend",()=>{

isDragging=false;

});

editorImage.addEventListener("touchcancel",()=>{

isDragging=false;

});
