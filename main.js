var form = document.forms.cityForm;
form.search.onclick = sendRequest;
form.cityName.addEventListener('keydown', function(event) {
    if (event.keyCode == 13) {
      sendRequest();
      event.preventDefault();
    }
});

function sendRequest() {
    var requestURL =
        'https://api.openweathermap.org/data/2.5/weather?q='
        + form.cityName.value
        + '&appid=1db6595f9c91d5ae5dfea01207734e1a';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var cityweather = request.response;
        displayResult(cityweather);
    }
}

function displayResult(weatherInfo) {
    var container = document.createElement('div');
    container.setAttribute("name", weatherInfo.name)
   
    var header1 = document.createElement('h1');
    header1.textContent = weatherInfo.name;
    container.appendChild(header1);
    var NameCity = document.createElement('h2');
    NameCity.textContent = form.cityName.value
    container.appendChild(NameCity);

    var header2 = document.createElement('h1');
    header2.textContent = "Довгота: " + weatherInfo.coord.lon + " Широта: " + weatherInfo.coord.lat;
    container.appendChild(header2);

    var header3 = document.createElement('h1');
    header3.textContent = new Date().toDateString(new Date());
    container.appendChild(header3);

    var p1 = document.createElement('p');
    var p2 = document.createElement('p');
    var p3 = document.createElement('p');

    var temperatureReal = Math.round(weatherInfo.main.temp - 273.16);
    var temteratureFeels = Math.round(weatherInfo.main.feels_like - 273.16);
    p1.textContent = 'Температура повітря: ' + temperatureReal + " °C";
    p2.textContent = 'Відчувається як: ' + temteratureFeels + " °C";
    p3.textContent = 'Швидкість вітру: ' + weatherInfo.wind.speed + " м/с";

    container.appendChild(p1);
    container.appendChild(p2);
    container.appendChild(p3);

    document.body.appendChild(container);
}
