const expenseChartCanvas = document.getElementById('expense-chart-container');
const incomeChartCanvas = document.getElementById('income-chart-container');

// Add an event listener to the window load event
window.addEventListener('load', () => {
  // Get the expenses and incomes data from the two pages
  const expensesData = JSON.parse(localStorage.getItem('expenses')) || [];
  const incomesData = JSON.parse(localStorage.getItem('incomes')) || [];

  // Create an object to store the category-wise data for expenses
  const expenseCategoryData = {};

  // Loop through the expenses data
  expensesData.forEach((expense) => {
    const category = expense.category;
    if (!expenseCategoryData[category]) {
      expenseCategoryData[category] = 0;
    }
    expenseCategoryData[category] += expense.amount;
  });

  // Create an object to store the category-wise data for incomes
  const incomeCategoryData = {};

  // Loop through the incomes data
  incomesData.forEach((income) => {
    const category = income.category;
    if (!incomeCategoryData[category]) {
      incomeCategoryData[category] = 0;
    }
    incomeCategoryData[category] += income.amount;
  });

  // Create the expense category-wise pie chart
  const expenseChart = new Chart(expenseChartCanvas, {
    type: 'pie',
    data: {
      labels: Object.keys(expenseCategoryData),
      datasets: [{
        label: 'Expenses by Category',
        data: Object.values(expenseCategoryData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(245, 84, 34, 0.6)',
          'rgba(121, 194, 208, 0.6)',
          'rgba(175, 197, 255, 0.6)',
          'rgba(172, 220, 238, 0.6)',
          'rgba(232, 154, 89, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(245 ,84 ,34 ,1)',
          'rgba(121, 194, 208, 1)',
          'rgba(175, 197, 255, 1)',
          'rgba(172, 220, 238, 1)',
          'rgba(232, 154, 89, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Expenses by Category'
      }
    }
  });

  // Create the income category-wise pie chart
  const incomeChart = new Chart(incomeChartCanvas, {
    type: 'pie',
    data: {
      labels: Object.keys(incomeCategoryData),
      datasets: [{
        label: 'Incomes by Category',
        data: Object.values(incomeCategoryData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(245, 84, 34, 0.6)',
          'rgba(121, 194, 208, 0.6)',
          'rgba(175, 197, 255, 0.6)',
          'rgba(172, 220, 238, 0.6)',
          'rgba(232, 154, 89, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(245 ,84 ,34 ,1)',
          'rgba(121, 194, 208, 1)',
          'rgba(175, 197, 255, 1)',
          'rgba(172, 220, 238, 1)',
          'rgba(232, 154, 89, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Incomes by Category'
      }
    }
  });
});