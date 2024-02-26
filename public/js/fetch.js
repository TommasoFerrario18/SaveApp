// TODO: Fix error handling and error modal
const errorModal = document.getElementById("error-modal");
const divDelete = document.getElementById("div-delete-movement");
const formDelete = document.getElementById("form-delete-movement");
const idMovement = document.getElementById("id-movement");
const yearMovement = document.getElementById("year-movement");

function addStyleToTable(row) {
  let classValues = [
    "bg-white",
    "border-b",
    "dark:bg-gray-800",
    "dark:border-gray-700",
    "hover:bg-gray-50",
    "dark:hover:bg-gray-600",
  ];

  classValues.forEach((value) => {
    row.classList.add(value);
  });
}

function createEditLink(transactionId) {
  let editLink = document.createElement("a");
  editLink.href = "/user/edit/" + transactionId;
  editLink.innerHTML = "Edit";
  editLink.classList.add(
    "font-medium",
    "text-blue-600",
    "dark:text-blue-500",
    "hover:underline"
  );

  return editLink;
}

function createImporto(importo, valuta) {
  let importoValue = importo;

  switch (valuta) {
    case "EUR":
      importoValue = importoValue + "€";
      break;
    case "USD":
      importoValue = importoValue + "$";
      break;
    case "GBP":
      importoValue = importoValue + "£";
      break;
    case "JPY":
      importoValue = importoValue + "¥";
      break;
    default:
      importoValue = importoValue + "€";
  }

  return importoValue;
}

function createDeleteButton(transactionId, year) {
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.classList.add(
    "px-6",
    "py-3",
    "font-medium",
    "text-blue-600",
    "dark:text-blue-500",
    "hover:underline"
  );

  deleteButton.onclick = function () {
    divDelete.classList.toggle("hidden");
    idMovement.value = transactionId;
    yearMovement.value = year;
  };

  return deleteButton;
}

function fillTable(data) {
  let table = document.getElementById("transactions-table");
  for (let transactionId in data) {
    let row = document.createElement("tr");

    let description = document.createElement("td");
    let amount = document.createElement("td");
    let date = document.createElement("td");
    let category = document.createElement("td");
    let edit = document.createElement("td");
    let deleteTable = document.createElement("td");

    description.innerHTML = data[transactionId].Descrizione;
    amount.innerHTML = createImporto(
      data[transactionId].Importo,
      data[transactionId].Valuta
    );
    date.innerHTML = data[transactionId].data;
    category.innerHTML = data[transactionId].tag;

    addStyleToTable(row);

    description.classList.add(
      "px-6",
      "py-3",
      "font-medium",
      "text-gray-900",
      "whitespace-nowrap",
      "dark:text-white"
    );
    amount.classList.add("px-6", "py-3");
    date.classList.add("px-6", "py-3");
    category.classList.add("px-6", "py-3");
    edit.classList.add("px-6", "py-3", "text-right");

    edit.appendChild(createEditLink(transactionId));
    deleteTable.appendChild(
      createDeleteButton(
        transactionId,
        new Date(data[transactionId].data).getFullYear()
      )
    );

    row.appendChild(description);
    row.appendChild(amount);
    row.appendChild(category);
    row.appendChild(date);
    row.appendChild(edit);
    row.appendChild(deleteTable);

    table.appendChild(row);
  }
}

// Sum of expenses by category
function sumByCategory(data) {
  let Categories = new Set();

  for (let transactionId in data) {
    Categories.add(data[transactionId].tag);
  }

  tagsLabels = Array.from(Categories);
  let tagsAmounts = {};

  for (let tag of tagsLabels) {
    tagsAmounts[tag] = 0;
  }

  for (let transactionId in data) {
    tagsAmounts[data[transactionId].tag] += data[transactionId].Importo;
  }

  return tagsAmounts;
}

function getMaxTag(tagsAmounts) {
  let max = 0;
  let maxTag = "";

  for (let tag in tagsAmounts) {
    if (tagsAmounts[tag] > max) {
      max = tagsAmounts[tag];
      maxTag = tag;
    }
  }

  return maxTag;
}

function createGraph(data) {
  const tagAmounts = sumByCategory(data);

  let tags = new Array(Object.keys(tagAmounts));

  let xData = new Array(tags.length);

  for (let i = 0; i < tags.length; i++) {
    xData[i] = tagAmounts[Array.from(tags)[i]];
  }

  const layout = { title: "Expenses by category" };
  const graphData = [{ labels: tags, values: xData, hole: 0.6, type: "pie" }];

  Plotly.newPlot("plot", graphData, layout);
}

function fillCards(data) {
  let tagsAmounts = sumByCategory(data);

  let totalExpenses = 0;
  let totalIncome = 0;
  for (let tag in tagsAmounts) {
    if (tag !== "Entrata") {
      totalExpenses += Number(tagsAmounts[tag]);
    } else {
      totalIncome += Number(tagsAmounts[tag]);
    }
  }

  let totalBalance = totalIncome - totalExpenses;

  document.getElementById("spese-tot").innerHTML = totalBalance + "€";
  document.getElementById("uscite").innerHTML = totalExpenses + "€";
  document.getElementById("entrate").innerHTML = totalIncome + "€";

  let maxTag = getMaxTag(tagsAmounts);
  document.getElementById("max-tag").innerHTML = maxTag;
  document.getElementById("importo-max-tag").innerHTML =
    tagsAmounts[maxTag] + "€";
}

function onLoad() {
  fetch("/api/transactions/", {
    method: "GET",
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((data) => {
      fillTable(data);
      createGraph(data);
      fillCards(data);
    })
    .catch((err) => {
      console.log(err);
      console.log("Error fetching transactions");
      // errorModal.classList.remove("hidden");
    });
}

formDelete.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log(yearMovement.value, idMovement.value);

  fetch(`/api/transactions/${yearMovement.value}/${idMovement.value}`, {
    method: "DELETE",
    credentials: "same-origin",
  })
    .then((res) => {
      if (res.status === 200) {
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("Error deleting transaction");
      // errorModal.classList.remove("hidden");
    });
});
