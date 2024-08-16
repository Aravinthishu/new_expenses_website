const renderIncomeChart = (data, labels) => {
  var ctx = document.getElementById("incomeChart").getContext("2d");
  var incomeChart = new Chart(ctx, {
      type: "doughnut",
      data: {
          labels: labels,
          datasets: [{
              label: "Income per source",
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
          }],
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

const getIncomeChartData = () => {
  console.log("Fetching income data");
  fetch("/income/income_summary")
      .then((res) => res.json())
      .then((results) => {
          console.log("Results:", results);
          const income_data = results.income_source_data;
          const [labels, data] = [
              Object.keys(income_data),
              Object.values(income_data),
          ];
          
          // Calculate total income
          const totalIncome = data.reduce((acc, value) => acc + value, 0);

          // Render the chart
          renderIncomeChart(data, labels);

          // Display total income
          document.getElementById('total-income').innerText = `Total Income: ${totalIncome.toFixed(2)}`;
      })
      .catch(error => console.error("Error fetching income data:", error));
};

// Use `DOMContentLoaded` to ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', getIncomeChartData);
