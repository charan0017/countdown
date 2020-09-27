const weatherInfoDiv = document.querySelector('#weather-info');
const weatherIconImg = weatherInfoDiv.querySelector('#weather-icon');
const weatherTemp = weatherInfoDiv.querySelector('#weather-temp');
const weatherText = weatherInfoDiv.querySelector('#weather-text');
const dateText = weatherInfoDiv.querySelector('#date-text');

const weatherAPI =
  'https://dataservice.accuweather.com/currentconditions/v1/202190?apikey=yWUtuxJWjXxO7dL9cSTc0PTLoXDdYGYF';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function getTodaysDateTxtStr() {
  const date = new Date();
  const dateNum = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${days[date.getDay()]}, ${dateNum} ${month} ${year}`;
}

async function fetchWeather() {
  const savedWeather = fetchItem('weatherData');
  if (savedWeather && savedWeather === getTodaysDateStr()) savedWeather;
  const response = await fetch(weatherAPI);
  const responseData = await response.json();
  const [todaysForecast] = responseData;
  const weather = {
    date: getTodaysDateTxtStr(),
    temp: `${todaysForecast.Temperature.Metric.Value} °${todaysForecast.Temperature.Metric.Unit}`,
    text: todaysForecast.WeatherText,
    icon: `https://www.accuweather.com/images/weathericons/${todaysForecast.WeatherIcon}.svg`,
  };
  storeItem('weatherData', weather);
  return weather;
}

(async () => {
  const weather = await fetchWeather();
  dateText.textContent = weather.date;
  weatherTemp.textContent = weather.temp;
  weatherText.textContent = weather.text;
  weatherIconImg.src = weather.icon;
})();
