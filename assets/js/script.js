var apiKey = '7ab439372a6b7834b1058543aced3bee';
var searchBtnEl = document.querySelector('#searchBtn');
var searchInput = document.querySelector('input');
var citySearch = [];

searchBtnEl.addEventListener('click', handleSearch)
function handleSearch () {
    if (!searchInput)
    return;

    var city = searchInput.value;
    fetchWeather(city);
    addToHistory(city);
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
        displayForecast(data.list)
    })
}

function displayWeather (data) {
    var changeDate = dayjs.unix(data.dt).format('MMM D, YYYY');
    document.getElementById('city').textContent = data.name;
    document.getElementById('date').textContent = changeDate;
    document.getElementById('icon').src ='https://openweathermap.org/img/w/${data.weather[0].icon}.png';
    document.getElementById('temp').textContent = data.main.temp + ' F'
    document.getElementById('humid').textContent = data.main.humidity + ' %'
    document.getElementById('wind').textContent = data.wind.speed + ' mph'
}

function displayForecast (data) {
    document.getElementById("forecast-weather").innerHTML = '';
    for (let i = 3; i < data.length; i+=8)
    {
        let card = document.createElement("div");
        var changeDate = dayjs.unix(data[i].dt).format('MMM D, YYYY');
        let date = document.createElement("h3");
        date.textContent = changeDate;
        let temp = document.createElement("p");
        temp.textContent = data[i].main.temp;
        let humid = document.createElement("p");
        humid.textContent = data[i].main.humidity;
        let wind = document.createElement("p");
        wind.textContent = data[i].wind.speed;
        let icon = document.createElement("img");
        icon.src = `https://openweathermap.org/img/w/${data[i].weather[0].icon}.png`
        card.append(date, icon, temp, humid, wind);
        card.classList.add("forecast-card");
        card.classList.add("day-" + i);
        document.getElementById("forecast-weather").append(card);
    }
}

function addToHistory (city) {
    if (citySearch.indexOf(city)!==-1)
    {return}
    citySearch.push(city)
    localStorage.setItem("searchHistory", JSON.stringify(citySearch))
    renderHistory();
}

function renderHistory () {
    document.getElementById("history").innerHTML = "";
    for (i=citySearch.length-1; i>=0; i--)
    {
        let historyButton = document.createElement("button");
        historyButton.textContent = citySearch[i]
        document.getElementById("history").append(historyButton);
    }
}

document.getElementById("history").addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        var city = event.target.textContent;
        fetchWeather(city);
    }
});

window.addEventListener('load', function() {
    var savedSearches = localStorage.getItem("searchHistory");
    if (savedSearches) {
        citySearch = JSON.parse(savedSearches);
        renderHistory();
    }
})
    