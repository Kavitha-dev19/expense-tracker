let transactions = 
JSON.parse(localStorage.getItem('transactions')) 
|| [];

function addTransaction() {
  const desc = document.getElementById('desc').value;
  const amount = document.getElementById('amount').value;
  const type = document.getElementById('type').value;

  if (!desc || !amount) {
    alert('Please fill all fields!');
    return;
  }

  const transaction = {
    id: Date.now(),
    desc: desc,
    amount: parseFloat(amount),
    type: type
  };

  transactions.push(transaction);
  localStorage.setItem('transactions', 
  JSON.stringify(transactions));

  document.getElementById('desc').value = '';
  document.getElementById('amount').value = '';

  displayTransactions();
  updateBalance();
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem('transactions', 
  JSON.stringify(transactions));
  displayTransactions();
  updateBalance();
}

function displayTransactions() {
  const list = 
  document.getElementById('transaction-list');
  list.innerHTML = '';

  transactions.forEach(t => {
    const li = document.createElement('li');
    li.classList.add(t.type);
    li.innerHTML = `
      <span>${t.desc}</span>
      <span>₹${t.amount.toFixed(2)}</span>
      <button class="delete-btn" 
      onclick="deleteTransaction(${t.id})">✕</button>
    `;
    list.appendChild(li);
  });
}

function updateBalance() {
  let balance = 0;
  transactions.forEach(t => {
    if (t.type === 'income') 
      balance += t.amount;
    else 
      balance -= t.amount;
  });

  const balanceEl = 
  document.getElementById('balance');
  balanceEl.textContent = `₹${balance.toFixed(2)}`;
  balanceEl.style.color = 
  balance >= 0 ? '#2ecc71' : '#e74c3c';
}

displayTransactions();
updateBalance();
