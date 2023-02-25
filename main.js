//import "https://cdn.jsdelivr.net/npm/chart.js";
//@ts-ignore
//const myChart = window.Chart;
import myChart from './chart.js';

async function getData() {
	const response = await fetch('temps.csv');
	const data = await response.text();
	const rows = data.split('\n').slice(1);

	const /** @type {string[]} */ years = [];
	const /** @type {number[]} */ temps = [];

	rows.forEach(row => {
		const cols = row.split(',');
	  	years.push(cols[0]);
	  	temps.push(14 + parseFloat(cols[1]));
	});
	return { years, temps };
}

async function doChart() {
	const ctx = document.getElementById('chart');
  const values = await getData();
  new myChart(ctx, {
    type: 'line',
    data: {
      labels: values.years,
      datasets: [{
        label: '# of Votes',
        data: values.temps,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  }); 
}

doChart();

