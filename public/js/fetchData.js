function onLoad() {
    fetch('/api/transactions/', {
        method: 'GET',
        credentials: 'same-origin'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let table = document.getElementById('transactions-table');
            for (let i = 0; i < data.length; i++) {
                let row = table.insertRow();
                row.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700";

                let description = row.insertCell(0);
                let amount = row.insertCell(1);
                let date = row.insertCell(2);
                let category = row.insertCell(3);
                date.innerHTML = data[i].data;
                description.innerHTML = data[i].descrizione;
                amount.innerHTML = data[i].importo;
                category.innerHTML = data[i].tag;
            }
        })
        .catch(err => console.log(err));
}
