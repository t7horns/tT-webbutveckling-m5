"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: DITT NAMN
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {
    // Töm errors listan innan ny validering
    errors = [];
    // Kontrollera formulärets obligatoriska fält
    for (let inputField of [fullnameInput, emailInput, phoneInput]) {
        if (inputField.value.trim() === "") {
            errors.push(`Fältet ${inputField.labels[0].textContent} är obligatoriskt.`);
        };
    };
    // Validera för korrekt inmatning av telefonnummer
    // Definiera tillåtet mönster först (enbart siffror, bindesstreck och mellanslag)
    const allowedNumberPattern = /^[0-9\s-]+$/;
    // Om värdet inte matchar mönstret, skapa felmeddelande
    if (!phoneInput.value.trim() == "" && !allowedNumberPattern.test(phoneInput.value)) {
        errors.push("Telefonnummer får enbart bestå av siffror, mellanslag eller bindestreck.");
    }

    // Om valideringsfel finns, presentera och returnera false
    if (errors.length !== 0) {
        displayErrors();
        return false;
    }
    // Annars returnera true
    else {
        return true;
    }
};


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.innerHTML = "";
    // Skriv ut aktuella felmeddelanden till DOM
    for (let error of errors) {
        let errorListObject = document.createElement("li");
        let errorText = document.createTextNode(error);
        errorListObject.appendChild(errorText);

        errorList.appendChild(errorListObject);
    }

};

/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret

    // Uppdatera studentkortet

    // Lägg till studentkortet i historiken

    // Spara och uppdatera historiken
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik

    // Uppdatera history
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik

    // Skriv ut innehållet i history till DOM
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort

    // Rensa eventuella felmeddelanden
    errorList.innerHTML = "";
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let validInput = validateForm();
    if (validInput === true ){
        clearForm();
        console.log("INGA VALIDERINGSFEL - SKAPA STUDENTKORT")
        // kör createStudentCard()
    }

});




// När användaren klickar på "Rensa"


// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik