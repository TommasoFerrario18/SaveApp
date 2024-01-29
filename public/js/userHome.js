const checkbox = document.getElementById('abbonamento');
const frequenzaDiv = document.getElementById('frequenzaDiv');

checkbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        frequenzaDiv.style.visibility = 'visible';
    } else {
        frequenzaDiv.style.visibility = 'hidden';
    }
});

const fabAddMovement = document.getElementById('fab-add-movement');
const formMovement = document.getElementById('form-movement');

fabAddMovement.addEventListener('click', (event) => {
    const formMovement = document.getElementById('form-movement');
    if (formMovement.style.visibility === 'hidden') {
        formMovement.style.visibility = 'visible';
    }
});

const buttonBack = document.getElementById('button-back');
buttonBack.addEventListener('click', (event) => {
    const formMovement = document.getElementById('form-movement');
    if (formMovement.style.visibility === 'visible') {
        formMovement.style.visibility = 'hidden';
        frequenzaDiv.style.visibility = 'hidden';
    }
});

// TODO: prendere i vari campi dal database e fare refactoring del codice

let type_currency = ["EUR", "USD", "AUD", "CAD", "GBP", "CHF", "JPY", "CNY"];
const selectValuta = document.getElementById("Valuta");

for (let i = 0; i < type_currency.length; i++) {
    let opt = type_currency[i];
    let el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectValuta.appendChild(el);
}

const selectBudget = document.getElementById("Budget");
// TODO: prendere i budget dal db e inserirli nell'array

const selectTag = document.getElementById("tag");
let type_tag = ["Entrata", "Scommesse", "Abbigliamento", "Cultura", "Intrattenimento", "Cibo", "Regali", "Vacanze", "Cura della persona", "Trasporti", "Altro", "Sport", "Tech"];

for (let i = 0; i < type_tag.length; i++){
    let opt = type_tag[i];
    let el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectTag.appendChild(el);
}

const selectFrequenza = document.getElementById("frequenza");
let type_frequenza = ["Giornaliero", "Settimanale", "Mensile", "Bimestrale", "Trimestrale", "Semestrale", "Annuale"];

for (let i = 0; i < type_frequenza.length; i++){
    let opt = type_frequenza[i];
    let el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectFrequenza.appendChild(el);
}

const movementForm = document.getElementById('movement-form');

movementForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(movementForm);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    fetch('/api/{id}/movements', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then((error) => {
                throw new Error(JSON.stringify(error));
            });
        }
    }).then((json) => {
        console.log(json);
        window.location.reload();
    }).catch((error) => {
        console.log(error);
    });
});