const btnDropDown = document.getElementById("dropdown-btn");
const body = document.getElementById("body");

btnDropDown.addEventListener("click", () => {
  const dropdownDivider = document.getElementById("dropdown");
  dropdownDivider.classList.toggle("hidden");
});

// TODO: prendere i vari campi dal database e fare refactoring del codice

let type_currency = ["EUR", "USD", "AUD", "CAD", "GBP", "CHF", "JPY", "CNY"];
const selectValuta = document.getElementById("Valuta");

type_currency.forEach((valuta) => {
  let option = document.createElement("option");
  option.text = valuta;
  selectValuta.add(option);
});

const selectBudget = document.getElementById("Budget");
// TODO: prendere i budget dal db e inserirli nell'array

const selectTag = document.getElementById("tag");
let type_tag = [
  "Entrata",
  "Scommesse",
  "Abbigliamento",
  "Cultura",
  "Intrattenimento",
  "Cibo",
  "Regali",
  "Vacanze",
  "Cura della persona",
  "Trasporti",
  "Altro",
  "Sport",
  "Tech",
];

type_tag.forEach((tag) => {
  let option = document.createElement("option");
  option.text = tag;
  selectTag.add(option);
});

const selectFrequenza = document.getElementById("frequenza");
let type_frequenza = [
  "Mai",
  "Giornaliero",
  "Settimanale",
  "Mensile",
  "Bimestrale",
  "Trimestrale",
  "Semestrale",
  "Annuale",
];

type_frequenza.forEach((frequenza) => {
  let option = document.createElement("option");
  option.text = frequenza;
  selectFrequenza.add(option);
});

const divAddMovement = document.getElementById("div-form-movement");
const btnAddMovement = document.getElementById("btn-add-movement");
const closeBtn = document.getElementById("close-btn-movement");
const backBtn = document.getElementById("button-back");

btnAddMovement.addEventListener("click", () => {
  divAddMovement.classList.toggle("hidden");
  body.classList.add(
    "opacity-50",
    "pointer-events-none",
    "backdrop-blur-lg"
  );
});

closeBtn.addEventListener("click", () => {
  closeBtnFunction();
});

backBtn.addEventListener("click", () => {
  closeBtnFunction();
});

function closeBtnFunction() {
  divAddMovement.classList.toggle("hidden");
  body.classList.remove(
    "opacity-50",
    "pointer-events-none",
    "backdrop-blur-lg"
  );
}

const checkbox = document.getElementById("abbonamento");
const frequenzaDiv = document.getElementById("frequenzaDiv");

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    frequenzaDiv.classList.remove("hidden");
  } else {
    frequenzaDiv.classList.add("hidden");
  }
});

let month = new Date().toLocaleString('default', { month: 'long' });
month = month.charAt(0).toUpperCase() + month.slice(1);

let year = new Date().getFullYear();

document.getElementById("current-month-btn-spese").innerHTML = month;
document.getElementById("current-year-btn-spese").innerHTML = year;

document.getElementById("current-month-btn-grafici").innerHTML = month;
document.getElementById("current-year-btn-grafici").innerHTML = year;