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
