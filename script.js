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
