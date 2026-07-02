/* ====================================
   Pixora Pro
   Build 001 - App Core
==================================== */

const Pixora = {

    version: "1.0.0",

    init() {

        console.log("Pixora Pro Started");

        this.start();

    },

    start() {

        const app = document.getElementById("app");

        app.innerHTML = `

            <div class="welcome">

                <h1>Pixora Pro</h1>

                <p>Professional AI Photo Editor</p>

            </div>

        `;

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Pixora.init();

});
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
