// Confirms the script is connected and running in the browser console
console.log("Status Manager Started");

// Stores the interval ID globally so stopFlashing() can reference and cancel it later
let intervalId = null;

// Grab all the elements we need from the DOM upfront
const mainTitle = document.querySelector("#main-title");
const toggleButton = document.getElementById("toggle-button");
const statusOutput = document.querySelector("#status-output");
const timerButton = document.getElementById("timer-button");
const controlPanel = document.getElementById("control-panel");
const flashTarget = document.getElementById("flash-target");
const itemList = document.getElementById("item-list");

// Uses innerHTML to directly overwrite the text inside the h1 element.
// This runs immediately when the script loads, so the title updates right away.
mainTitle.innerHTML = "DOM Project: Ready!";

// setAttribute() lets us attach any custom attribute to an existing element.
// We pass the attribute name as the first argument and its value as the second.
toggleButton.setAttribute("data-action", "status-toggle");

// querySelectorAll returns a NodeList of every <li> on the page.
// We loop through each one and set its color using the inline style property.
// This is called immediately below so it runs on page load.
function highlightListItems() {
    const listItems = document.querySelectorAll("li");
    listItems.forEach(function(item) {
        item.style.color = "#5b8dee";
    });
}

highlightListItems();

// createElement makes a brand new <span> that doesn't exist in the HTML yet.
// We set its innerHTML to the current time, then appendChild attaches it inside statusOutput.
function createTimestamp() {
    const timeSpan = document.createElement("span");
    timeSpan.innerHTML = " Last updated: " + new Date().toLocaleTimeString();
    timeSpan.className = "timestamp";
    statusOutput.appendChild(timeSpan);
}

// e.preventDefault() stops the anchor tag from jumping to the top of the page on click.
// classList.toggle("hidden") adds the class if it's missing, removes it if it's already there.
// After toggling, we check if the box is now visible by seeing if .hidden is absent.
// If visible, the title background turns yellow and a new timestamp is appended to the box.
function toggleStatus(e) {
    e.preventDefault();
    statusOutput.classList.toggle("hidden");

    if (!statusOutput.classList.contains("hidden")) {
        mainTitle.style.backgroundColor = "#fff9c4";
        createTimestamp();
    } else {
        mainTitle.style.backgroundColor = "";
    }
}

toggleButton.addEventListener("click", toggleStatus);

// setInterval runs a function every 500ms and returns an ID we store in intervalId.
// We clear any existing interval first so clicks don't stack up and become unstoppable.
// stopFlashing uses that same ID with clearInterval to cancel it, then restores visibility.
function startFlashing() {
    clearInterval(intervalId);
    intervalId = setInterval(function() {
        flashTarget.classList.toggle("hidden");
    }, 500);
}

function stopFlashing() {
    clearInterval(intervalId);
    intervalId = null;
    flashTarget.classList.remove("hidden");
}

timerButton.addEventListener("click", function() {
    startFlashing();
});

timerButton.addEventListener("dblclick", function() {
    stopFlashing();
});