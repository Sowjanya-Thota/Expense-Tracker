const categorySelect = document.getElementById('category');
const dateInput = document.getElementById('date');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const addExpenseButton = document.getElementById('add-expense');
const transactionList = document.getElementById('transaction-list');
const clearAllButton = document.getElementById('clear-all');
const totalAmountDiv = document.getElementById('total-amount');

// Retrieve the total amount from local storage
let totalAmount = parseFloat(localStorage.getItem('expenseTotalAmount')) || 0;

// Clear the transaction list and reset the total amount when the page is loaded
window.addEventListener('load', () => {
  updateTotalAmount();

  // Load the transactions from local storage
  const transactions = JSON.parse(localStorage.getItem('expenses')) || [];
  transactions.forEach((transaction) => {
    addTransaction(transaction.category, transaction.date, transaction.description, transaction.amount);
  });
});

// Add an event listener to the add expense button
addExpenseButton.addEventListener('click', () => {
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
  totalAmount -= amount;
  updateTotalAmount();

  // Save the transaction to local storage
  const transactions = JSON.parse(localStorage.getItem('expenses')) || [];
  transactions.push(transaction);
  localStorage.setItem('expenses', JSON.stringify(transactions));

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
    localStorage.removeItem('expenses');
  }
});

// Add a transaction to the transaction list
function addTransaction(category, date, description, amount) {
  const listItem = document.createElement('li');
  listItem.textContent = `₹${amount} spent on ${description} for ${category} on ${date}`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    const isConfirmed = confirm('Are you sure you want to delete this transaction?');
    if (isConfirmed) {
      totalAmount += amount;
      updateTotalAmount();
      listItem.remove();

      // Remove the transaction from local storage
      const transactions = JSON.parse(localStorage.getItem('expenses')) || [];
      const updatedTransactions = transactions.filter((transaction) => transaction.amount !== amount);
      localStorage.setItem('expenses', JSON.stringify(updatedTransactions));
    }
  });

  listItem.appendChild(deleteButton);
  transactionList.appendChild(listItem);
}

// Update the total amount displayed on the page
function updateTotalAmount() {
  totalAmountDiv.textContent = `Total Amount Spent: ₹${totalAmount.toFixed(2)}`;

  // Store the total amount in local storage
  localStorage.setItem('expenseTotalAmount', totalAmount);
}