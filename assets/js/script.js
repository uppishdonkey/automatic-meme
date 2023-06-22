var apiKey = '7ab439372a6b7834b1058543aced3bee';
var searchBtnEl = document.querySelector('#searchBtn');
var searchInput = document.querySelector('input');

searchBtnEl.addEventListener('click', handleSearch)
function handleSearch () {
    if (!searchInput)
    return;

    var city = searchInput.value;
    fetchWeather(city);
}

function fetchWeather (city) {
    var apiUrlWeather = 'https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial';
    fetch(apiUrlWeather).then(response => response.json()).then(data => {
        console.log(data);
        displayWeather(data);
        fetchForecast(data);
    })
}

function fetchForecast (data) {
    var apiUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}';
    fetch(apiUrlForecast).then(response => response.json()).then(data => {
        console.log(data)
    })
}

function displayWeather (data) {
    document.getElementById('city').textContent = data.name;
    document.getElementById('date').textContent = data.dt;
    document.getElementById('icon').src ='https://openweathermap.org/img/w/${data.weather[0].icon}.png';
    
}