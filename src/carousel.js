const carouselDiv = document.querySelector('#carousel');
const weatherInfoDiv = carouselDiv.querySelector('#weather-info');
const weatherIconImg = weatherInfoDiv.querySelector('#weather-icon');
const weatherTemp = weatherInfoDiv.querySelector('#weather-temp');
const weatherText = weatherInfoDiv.querySelector('#weather-text');
const dateText = weatherInfoDiv.querySelector('#date-text');
const quoteBoxDiv = carouselDiv.querySelector('#quote-box');
const quoteText = quoteBoxDiv.querySelector('#quote');
const quoteByText = quoteBoxDiv.querySelector('#quote-by');
const slidesEls = Array.prototype.slice.call(carouselDiv.querySelectorAll('.slides'));

const weatherAPI =
  'https://dataservice.accuweather.com/currentconditions/v1/202190?apikey=yWUtuxJWjXxO7dL9cSTc0PTLoXDdYGYF';
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let slideIndex = 0;
function carousel() {
  slidesEls.forEach((el) => {
    if (el.classList.contains('slides')) return;
    el.classList.add('slides');
  });
  slideIndex++;
  if (slideIndex > slidesEls.length) {
    slideIndex = 1;
  }
  slidesEls[slideIndex - 1].classList.remove('slides');
  setTimeout(carousel, 4000);
}

(async () => {
  carousel();
  loadWeather();
  loadQuote();
})();

async function loadQuote() {
  const { quote, quoteBy } = await fetchQuote();
  if (!quote || !quoteBy) return;
  quoteText.innerText = `"${quote}"`;
  quoteByText.innerText = `— ${quoteBy}`;
}

async function fetchQuote() {
  const quoteOfTheDay = fetchItem('quoteOfTheDay');
  if (quoteOfTheDay && quoteOfTheDay.date === getTodaysDateStr()) return quoteOfTheDay;
  const response = await fetch(`${window.location.href}/assets/quotes.json`);
  const quotes = await response.json();
  const lastQuoteIndex = parseInt(localStorage.getItem('lastQuoteIndex') || '-1');
  const nextQuoteIndex = lastQuoteIndex > quotes.length - 1 ? 0 : lastQuoteIndex + 1;
  const nextQuote = quotes[nextQuoteIndex];
  localStorage.setItem('lastQuoteIndex', nextQuoteIndex);
  storeItem('quoteOfTheDay', nextQuote);
  return nextQuote;
}

async function loadWeather() {
  const weather = await fetchWeather();
  dateText.textContent = weather.date;
  weatherTemp.textContent = weather.temp;
  weatherText.textContent = weather.text;
  weatherIconImg.src = weather.icon;
}

async function fetchWeather() {
  const savedWeather = fetchItem('weatherData');
  if (savedWeather && savedWeather.date === getTodaysDateTxtStr()) return savedWeather;
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

function getTodaysDateTxtStr() {
  const date = new Date();
  const dateNum = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'long' });
  const year = date.getFullYear();
  return `${days[date.getDay()]}, ${dateNum} ${month} ${year}`;
}
