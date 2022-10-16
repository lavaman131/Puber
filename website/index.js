import { } from "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"
import { } from "https://cdn.jsdelivr.net/npm/chart.js"

var show = false;
const calculateButton = document.querySelector("#calculate");
const originInput = document.querySelector("#origin");
const destinationInput = document.querySelector("#destination");
const predictionChart = document.querySelector("#prediction");

calculateButton.addEventListener("click", () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if (show) {
     $(predictionChart).slideUp();
     get_prediction();
     $(predictionChart).slideDown();
   } else {
      get_prediction();
     show = true;
    $(predictionChart).slideUp();
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
            create_chart(values)})
    .catch(error => console.log('error', error));
}

function create_chart(pred_data_values){
  const labels = ["1 Hour", "2 Hours", "3 Hours", "4 Hours", "5 Hours"];
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
    options: {},
  };

  if (Chart.getChart('chartLine')!=null){
    chartLine = Chart.getChart('chartLine');
    chartLine.remove();
  };

  var chartLine = new Chart(
    document.getElementById("chartLine"),
    configLineChart
  );
}

