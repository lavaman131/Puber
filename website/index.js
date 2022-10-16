import { } from "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
import { } from "https://cdn.jsdelivr.net/npm/chart.js"

var show = false;
const calculateButton = document.querySelector("#calculate");
const originInput = document.querySelector("#origin");
const destinationInput = document.querySelector("#destination");
const predictionChart = document.querySelector("#prediction");
var chartLine = null;

calculateButton.addEventListener("click", () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if(!show) {
    get_prediction();
     show = true;

    $(predictionChart).slideToggle();
  } else {
    get_prediction();
    }
});

function get_prediction() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "locations": {
        "origin": originInput.value.toString(),
        "destination": destinationInput.value.toString()
    }
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/api/get_prediction", requestOptions)
    .then(response => response.text())
    .then(result => {
            const preds = JSON.parse(result)
            const keys = Object.keys(preds["prediction data"])
            const values = Object.values(preds["prediction data"])
            const values_pct = values.map(function(element) {
              return (element / values[0]) * 100
            })
            create_chart(values_pct)})
    .catch(error => console.log('error', error));
}

function create_chart(pred_data_values){
  if (chartLine==null){
  const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  console.log(pred_data_values.flat());
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Predicted price multiplier",
        backgroundColor: "hsl(221, 83%, 53%)",
        borderColor: "hsl(221, 83%, 53%)",
        data: pred_data_values.flat(),
      },
    ],
  };

  const configLineChart = {
    type: "line",
    data,
    options: {
      scales: {x: { title: { display: true, text: 'Hours' }},
      y: { title: { display: true, text: 'Percent Fluctuation' }}}
    },
  };

  chartLine = new Chart(
    document.getElementById("chartLine"),
    configLineChart
  );
} else {
	//console.log(chartLine.data.datasets[0].data[0]);
  for (let i = 0; i<pred_data_values.flat().length; i++){
    chartLine.data.datasets[0].data[i] = pred_data_values.flat()[i];
    }
    chartLine.update();
  }

}
