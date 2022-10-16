const calculateButton = document.querySelector("#calculate");
const originInput = document.querySelector("#origin");
const destinationInput = document.querySelector("#destination");

calculateButton.addEventListener("click", () => {
    console.log(originInput.value);
});

function test() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "locations": {
        "origin": "South Station, Boston",
        "destination": "SMFA, Boston"
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
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
    