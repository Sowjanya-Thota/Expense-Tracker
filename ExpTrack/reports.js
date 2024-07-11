const analysisTable = document.getElementById('analysis-table');
const analysisTbody = document.getElementById('analysis-tbody');
const balance = document.getElementById('balance');
const totalExpenses = document.getElementById('total-expenses');
const totalIncomes = document.getElementById('total-incomes');

// Add an event listener to the window load event
window.addEventListener('load', () => {
  // Clear the table rows
  analysisTbody.innerHTML = '';

  // Get the expenses and incomes data from the two pages
  const expensesData = JSON.parse(localStorage.getItem('expenses')) || [];
  const incomesData = JSON.parse(localStorage.getItem('incomes')) || [];

  // Create an object to store the category-wise data
  const categoryData = {};

  // Loop through the expenses data
  expensesData.forEach((expense) => {
    const category = expense.category;
    if (!categoryData[category]) {
      categoryData[category] = { expenses: 0, incomes: 0 };
    }
    categoryData[category].expenses += expense.amount;
  });

  // Loop through the incomes data
  incomesData.forEach((income) => {
    const category = income.category;
    if (!categoryData[category]) {
      categoryData[category] = { expenses: 0, incomes: 0 };
    }
    categoryData[category].incomes += income.amount;
  });

  // Create the table rows
  Object.keys(categoryData).forEach((category) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${category}</td>
      <td>₹${categoryData[category].expenses.toFixed(2)}</td>
      <td>₹${categoryData[category].incomes.toFixed(2)}</td>
      <td>₹${(categoryData[category].incomes - categoryData[category].expenses).toFixed(2)}</td>
    `;
    analysisTbody.appendChild(row);
  });
    // Calculate the total expenses and incomes
    let totalExpensesValue = 0;
    let totalIncomesValue = 0;
    Object.keys(categoryData).forEach((category) => {
      totalExpensesValue += categoryData[category].expenses;
      totalIncomesValue += categoryData[category].incomes;
    });
  
    // Update the balance
    balance.textContent = `₹${(totalIncomesValue - totalExpensesValue).toFixed(2)}`;
  
    // Update the total expenses
    totalExpenses.textContent = `₹${totalExpensesValue.toFixed(2)}`;
  
    // Update the total incomes
    totalIncomes.textContent = `₹${totalIncomesValue.toFixed(2)}`;
  });



