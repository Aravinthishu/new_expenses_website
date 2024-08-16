const renderChart = (data, labels) => {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
          labels: labels,
          datasets: [
              {
                  label: "Last 6 months expenses",
                  data: data,
                  backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
              },
          ],
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  display: true,
                  position: 'top',
              },
              tooltip: {
                  callbacks: {
                      label: function(tooltipItem) {
                          return `${tooltipItem.label}: ${tooltipItem.raw}`;
                      }
                  }
              }
          }
      }
  });
};

const getChartData = () => {
  console.log("Fetching data");
  fetch("/expense_category_summary")
      .then((res) => res.json())
      .then((results) => {
          console.log("Results:", results);
          const category_data = results.expense_category_data;
          const [labels, data] = [
              Object.keys(category_data),
              Object.values(category_data),
          ];

          // Calculate total amount and balance
          const totalAmount = results.total_amount;
          const balanceAmount = results.balance_amount;

          // Render the chart
          renderChart(data, labels);

          // Display total amount and balance amount
          document.getElementById('total-expenses').innerText = `Total Expenses: ${totalAmount.toFixed(2)}`;
          document.getElementById('balance-amount').innerText = `Balance Amount: ${balanceAmount.toFixed(2)}`;
      })
      .catch(error => console.error("Error fetching data:", error));
};

// Use `DOMContentLoaded` to ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', getChartData);
