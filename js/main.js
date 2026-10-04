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

const previewCard = document.querySelector("#preview .card"); // Store path to card class
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
    // Hämta information från formuläret och spara i ett objekt
    const studentProfile = {
        fullname: fullnameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        font: fontSelect.value
    };
    

    // Uppdatera studentkortet
     
    previewFullname.textContent = studentProfile.fullname;
    previewEmail.textContent = studentProfile.email;
    previewPhone.textContent = studentProfile.phone;

    previewCard.style.fontFamily = studentProfile.font;
    
    // Lägg till studentkortet i historiken
    history.push(studentProfile);
    // TEMP check
    for (let profile of history){ console.log(profile)}
    // Spara och uppdatera historiken
    saveHistory();
    renderHistory()
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    localStorage.setItem("historyStorage", JSON.stringify(history));
}


/**
 * Läser in tidigare historik från localStorage om alla valideringar avklarats. 
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    const unparsedLoadedHistory = localStorage.getItem("historyStorage");

    // Om localstorage saknar historik, avrbyt
    if (!unparsedLoadedHistory) {
        console.log("Tried updating history from localstorage, but it was empty")
        return;
    }

    const loadedHistory = JSON.parse(unparsedLoadedHistory);

    // Om innehållet är samma som i aktiv variabel, avbryt
    if (JSON.stringify(history) === JSON.stringify(loadedHistory)) {
        console.log("Loaded history same as active session history");
        return;
    }

    // Localstorage har ny data, ladda in den:
    history = loadedHistory;
    console.log("History updated from storage");
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";
    // Skriv ut innehållet i history till DOM

    for (let profil of history) {
        // Varje nytt history-kort blir ett nytt p-element via DOM
        let newHistoryCard = document.createElement("p");

        // Stil via DOM för att skapa boxar till varje history-kort
        newHistoryCard.style.width = "50%";
        newHistoryCard.style.padding = "1em 1em";
        newHistoryCard.style.maxWidth = "350px";
        newHistoryCard.style.overflowWrap = "break-word";
        newHistoryCard.style.border = "2px solid #ddd";

        for (let [profileKey, value] of Object.entries(profil)) {
            // Loopa genom varje key-value par i sparade profiler
            // Skapa textnod med bl.a. fullname med värdet för fullname
            let textNode = document.createTextNode(profileKey + ": " + value);
            
            // Läggs till i history-kortet
            newHistoryCard.appendChild(textNode);
            newHistoryCard.appendChild(document.createElement("br"));
        }
        // History-kortet läggs till i historySection
        historySection.appendChild(newHistoryCard);
    }

}



/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    console.log("CLEAR BUTTON TRIGGERED")
    // Återställ formulär och studentkort
    form.reset();
    console.log("form has been reset using fucntion clearForm")
    // Rensa eventuella felmeddelanden
    errorList.innerHTML = "";
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    console.log("CLEAR HISTORY TRIGGERED")
    // Radera sparad historik i localstorage och i lokal array
    localStorage.setItem("historyStorage", "");
    history.length = 0;

    // Uppdatera visningen på sidan
    renderHistory();
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let validInput = validateForm();
    if (validInput === true ){
        console.log("INGA VALIDERINGSFEL - SKAPA STUDENTKORT")
        createStudentCard();
        clearForm();
    }
});




// När användaren klickar på "Rensa"
clearButton.addEventListener("click", function(event) {
    event.preventDefault();
    clearForm();
});

// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", function(event) {
    event.preventDefault();
    deleteHistory()
});


// När sidan laddas:
// - läs in och visa eventuell tidigare historik
loadHistory()
renderHistory()