const balance = document.getElementById('balance');
const add_income = document.getElementById('add-income');
const add_expense = document.getElementById('add-expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let sample = [
	// {id: 1, text: 'Warteg', amount: -20000}
	// {id: 2, text: 'Duit Jajan', amount: 300000},
	// {id: 3, text: 'Boba', amount: -14000},
	// {id: 4, text: 'Bioskop', amount: -45000}
];


// let transactions = sample;

// Add DOM list for history transaction
function addTransaction(transaction) {
	//ambil positif ato minus
	list.innerHTML = ''

	for(let i = 0; i < transaction.length; i++) {
		const sign = transaction[i].amount < 0 ? '-' : '+';
		
		const item = document.createElement('li');
		
		let ids = transaction[i].id

		item.classList.add(transaction[i].amount < 0 ? 'expense' : 'income');
		
			item.innerHTML = `
			${transaction[i].text} <span>${sign}${(new Intl.NumberFormat('id').format(Math.abs(transaction[i].amount)))}
			</span> <button onclick="deleteTransaction(${ids})" id="${ids}" class="delete-btn">x</button>
			`;
		
		list.appendChild(item);
	}
	updateValues(transaction)
	//Add class based on value
	// alert('Transactions added');
}



// Update balance n expense
function updateValues(transactions) {
	const amounts  = transactions.map(transaction => transaction.amount);
	
	const total = amounts.reduce((acc, item) => (acc += item), 0)

	const income = amounts
						.filter(item => item > 0)
						.reduce((acc, item) => (acc += item), 0)

	// const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1);
	const expense = total - income
	
	
	balance.innerText = `Rp${(new Intl.NumberFormat('id').format(total))}`;
	add_income.innerText = `Rp${(new Intl.NumberFormat('id').format(income))}`;
	add_expense.innerText = `Rp${(new Intl.NumberFormat('id').format(expense))}`;
}

// Add transaction
function submitTransaction() {
	const texts = document.getElementById('text').value
	const amount = document.getElementById('amount').value

	let id = 1
	if (sample.length >= 1) {
		id = sample[sample.length - 1].id + 1
	}

	let transaksi = {id, text:texts, amount:Number(amount)}

	sample.push(transaksi)
	addTransaction(sample)
}

// delete
function deleteTransaction(id1) {
	let posisi = -1
	for (let i = 0; i < sample.length; i++) {
		if (sample[i].id === id1) {
			posisi = i
			break
		}
	}
	if (posisi !== -1) {
		sample.splice(posisi, 1)
	}
	addTransaction(sample)


}

//Init app
function init() {
	// list.innerHTML = '';
	
	// transactions.forEach(addTransaction);
	// addTransaction(sample)

}

init();

document.getElementById('submit').addEventListener("click", submitTransaction)
