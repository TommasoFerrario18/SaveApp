// TODO: Fix error handling and error modal
const errorModal = document.getElementById("error-modal");

function fillTable(data) {
  let table = document.getElementById("transactions-table");
  for (let transactionId in data) {
    let row = table.insertRow();

    let description = row.insertCell(0);
    let amount = row.insertCell(1);
    let date = row.insertCell(2);
    let category = row.insertCell(3);

    let importoValue = data[transactionId].Importo;

    switch (data[transactionId].Valuta) {
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

    description.innerHTML = data[transactionId].Descrizione;
    amount.innerHTML = importoValue;
    date.innerHTML = data[transactionId].data;
    category.innerHTML = data[transactionId].tag;

    

    let classValues = [
      "bg-white",
      "border-b",
      "dark:bg-gray-800",
      "dark:border-gray-700",
    ];

    classValues.forEach((value) => {
      row.classList.add(value);
    });
  }
}

function createGraph(data) {
  let tags = new Set();
  for (let transactionId in data) {
    tags.add(data[transactionId].tag);
  }
  tags = Array.from(tags);

  console.log(tags);

  const tagAmounts = {};
  for (let tag of tags) {
    tagAmounts[tag] = 0;
  }

  for (let transactionId in data) {
    tagAmounts[data[transactionId].tag] += data[transactionId].Importo;
  }

  let xData = new Array(tags.length);

  for (let i = 0; i < tags.length; i++) {
    xData[i] = tagAmounts[Array.from(tags)[i]];
  }

  console.log(xData);

  const layout = { title: "Expenses by category" };
  const graphData = [{ labels: tags, values: xData, hole: 0.6, type: "pie" }];

  Plotly.newPlot("categoryPlot", graphData, layout);
}

function onLoad() {
  fetch("/api/transactions/", {
    method: "GET",
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((data) => {

      data.forEach((transaction) => {
        transaction.Importo = Number(transaction.Importo);
      });

      fillTable(data);
      createGraph(data);
    })
    .catch((err) => {
      console.log(err);
      console.log("Error fetching transactions");
      // errorModal.classList.remove("hidden");
    });
}
