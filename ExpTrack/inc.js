const categorySelect = document.getElementById('category');
const dateInput = document.getElementById('date');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const addIncomeButton = document.getElementById('add-income');
const transactionList = document.getElementById('transaction-list');
const clearAllButton = document.getElementById('clear-all');
const totalAmountDiv = document.getElementById('total-amount');

// Retrieve the total amount from local storage
let totalAmount = parseFloat(localStorage.getItem('incomeTotalAmount')) || 0;

// Clear the transaction list and reset the total amount when the page is loaded
window.addEventListener('load', () => {
  updateTotalAmount();

  // Load the transactions from local storage
  const transactions = JSON.parse(localStorage.getItem('incomes')) || [];
  transactions.forEach((transaction) => {
    addTransaction(transaction.category, transaction.date, transaction.description, transaction.amount);
  });
});

// Add an event listener to the add income button
addIncomeButton.addEventListener('click', () => {
  const category = categorySelect.value;
  const date = dateInput.value;
  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);

  if (!category || !date || !description || !amount) {
    alert('Please fill in all fields.');
    return;
  }

  // Create a new transaction object
  const transaction = {
    category,
    date,
    description,
    amount
  };

  // Add the transaction to the transaction list
  addTransaction(category, date, description, amount);

    // Update the total amount
    totalAmount += amount;
    updateTotalAmount();
  
  // Add the transaction to local storage
  const transactions = JSON.parse(localStorage.getItem('incomes')) || [];
  transactions.push(transaction);
  localStorage.setItem('incomes', JSON.stringify(transactions));

  // Clear the input fields
  categorySelect.value = '';
  dateInput.value = '';
  descriptionInput.value = '';
  amountInput.value = '';
});

// Add an event listener to the clear all button
clearAllButton.addEventListener('click', () => {
  const isConfirmed = confirm('Are you sure you want to clear all transactions?');
  if (isConfirmed) {
    while (transactionList.firstChild) {
      transactionList.firstChild.remove();
    }
    totalAmount = 0;
    updateTotalAmount();
    localStorage.removeItem('incomes');
  }
});

// Add a transaction to the transaction list
function addTransaction(category, date, description, amount) {
  const listItem = document.createElement('li');
  listItem.textContent = `₹${amount} received from ${description} from ${category} on ${date}`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    const isConfirmed = confirm('Are you sure you want to delete this transaction?');
    if (isConfirmed) {
      totalAmount -= amount;
      updateTotalAmount();
      listItem.remove();

      // Remove the transaction from local storage
      const transactions = JSON.parse(localStorage.getItem('incomes')) || [];
      const updatedTransactions = transactions.filter((transaction) => transaction.amount !== amount);
      localStorage.setItem('incomes', JSON.stringify(updatedTransactions));
    }
  });

  listItem.appendChild(deleteButton);
  transactionList.appendChild(listItem);
}

// Update the total amount displayed on the page
function updateTotalAmount() {
  totalAmountDiv.textContent = `Total Amount Received: ₹${totalAmount.toFixed(2)}`;

  // Store the total amount in local storage
  localStorage.setItem('incomeTotalAmount', totalAmount);
}