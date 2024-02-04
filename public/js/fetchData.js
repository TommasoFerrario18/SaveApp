// TODO: Fix error handling and error modal
function onLoad() {
  fetch("/api/transactions/", {
    method: "GET",
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((data) => {
      let table = document.getElementById("transactions-table");
      for (let transactionId in data) {
        let row = table.insertRow();

        let description = row.insertCell(0);
        let amount = row.insertCell(1);
        let date = row.insertCell(2);
        let category = row.insertCell(3);

        description.innerHTML = data[transactionId].Descrizione;
        amount.innerHTML = data[transactionId].Importo;
        date.innerHTML = data[transactionId].data;
        category.innerHTML = data[transactionId].tag;

        row.classList.add(
          "bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        );
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("Error fetching transactions");
      errorModal.classList.remove("hidden");
    });
}

const errorModal = document.getElementById("error-modal");
