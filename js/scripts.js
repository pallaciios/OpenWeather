const apiKey ="";
const apiCountryURL ="https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#wather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind");

const weatherContainer = document.querySelector("#weather-data")

const errorMessageContainer = document.querySelector("#error-message");
const errorGeoLoca = document.querySelector("error-geo");
const loader = document.querySelector("#loader");

// Loader
const toggleLoader = () => {
    loader.classList.toggle("hide");
};

//Geolocalização
if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
else{errorGeoLoca.classList.remove("hide");}
function showPosition(position)
{
  var lat = (position.coords.latitude)
  var lon = (position.coords.longitude) 
  getWeatherDataGeo(lat, lon)
}

//Funções
const getWeatherDataGeo = async(lat, lon) =>{
    toggleLoader();
    
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherUrl);
    const data = await res.json();
    showWeatherData(data)
    toggleLoader();

    return data
}
const getWeatherData = async(city) =>{
    toggleLoader();
    
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherUrl);
    const data = await res.json();
    showWeatherData(data)
    toggleLoader();
    
    return data
    
}

const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
    document.body.style.backgroundImage = "";
  };
  
  const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");

};

const showWeatherData = async (data) => {
    hideInformation();

    // const data = await getWeatherData(city);

    if (data.cod === "404") {
        showErrorMessage();
        return;
      }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp)
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`

    document.body.style.backgroundImage = `url("Imagens/${data.weather[0].icon}.jpg")`;

    weatherContainer.classList.remove("hide");

}

//eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
        
    const city = cityInput.value; 
    getWeatherData(city)
    // showWeatherData(city)
    cityInput.value = '';
})

cityInput.addEventListener("keypress", (e) => {

    if (e.which == 13) {
        const city = e.target.value;
        getWeatherData(city)
        // showWeatherData(city)
        cityInput.value = '';
    }
}
)