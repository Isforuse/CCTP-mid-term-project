import { fetchWeather, fetchForecast } from "./weather-api.js";
import { applyWeatherBackground } from "./weather-background.js";
import { fetchAirQuality, getAQILevel, getAQIColor } from "./weather-aqi.js";
import { applyWeatherPhoto } from "./weather-background.js";

const input = document.getElementById("city-input");
const button = document.getElementById("search-btn");
const message = document.getElementById("message");

const cityNameEl = document.getElementById("city-name");
const tempEl = document.getElementById("temp");
const iconEl = document.getElementById("icon");
const descEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const detailsCard = document.getElementById("details-card");
const result = document.getElementById("result");

const feelsEl = document.getElementById("feels");
const minmaxEl = document.getElementById("minmax");
const pressureEl = document.getElementById("pressure");
const visibilityEl = document.getElementById("visibility");
const windEl = document.getElementById("wind");

const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");

const aqiEl = document.getElementById("aqi");
const pm25El = document.getElementById("pm25");
const pm10El = document.getElementById("pm10");

const windArrow = document.getElementById("wind-arrow");

const forecastContainer = document.getElementById("forecast-container");
const forecastList = document.getElementById("forecast-list");

let forecastChart = null;

// loading
function setLoading(isLoading) {
  button.disabled = isLoading;
  button.textContent = isLoading ? "查詢中..." : "查詢天氣";
}

async function handleSearch() {
  const city = input.value.trim();
  if (!city) {
    message.textContent = "請輸入城市名稱";
    return;
  }

  setLoading(true);
  message.textContent = "";
  result.classList.add("hidden");
  detailsCard.classList.add("hidden");
  forecastContainer.classList.add("hidden");

  try {
    const data = await fetchWeather(city);
    const forecastData = await fetchForecast(city);
    const { lat, lon } = data.coord;
    const air = await fetchAirQuality(lat, lon);

    const iconCode = data.weather[0].icon;
    const condition = data.weather[0].description;

    applyWeatherBackground(iconCode);
    applyWeatherPhoto(city, condition);

    cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
    tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    descEl.textContent = condition;
    humidityEl.textContent = `濕度 ${data.main.humidity}%`;
    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // feels like
    const feels = Math.round(data.main.feels_like);
    feelsEl.textContent = `體感溫度：${feels}°C`;

    // min/max
    minmaxEl.textContent =
      `最高 / 最低：${Math.round(data.main.temp_max)}°C / ${Math.round(data.main.temp_min)}°C`;

    pressureEl.textContent = `氣壓：${data.main.pressure} hPa`;
    visibilityEl.textContent = `能見度：${data.visibility} m`;
    windEl.textContent = `風速：${data.wind.speed} m/s`;

    // sunrise / sunset
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);

    sunriseEl.textContent = `日出：${sunrise.toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" })}`;
    sunsetEl.textContent = `日落：${sunset.toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" })}`;

    // wind direction
    windArrow.style.transform = `rotate(${data.wind.deg}deg)`;

    // AQI
    const aqiLevel = getAQILevel(air.main.aqi);
    const aqiColor = getAQIColor(air.main.aqi);

    aqiEl.textContent = `AQI：${aqiLevel}`;
    aqiEl.style.color = aqiColor;

    pm25El.textContent = `PM2.5：${air.components.pm2_5}`;
    pm10El.textContent = `PM10：${air.components.pm10}`;

    result.classList.remove("hidden");
    detailsCard.classList.remove("hidden");

    // forecast blocks
    forecastList.innerHTML = "";
    const sliced = forecastData.list.slice(0, 4);

    sliced.forEach(item => {
      const div = document.createElement("div");
      div.className = "forecast-item";
      div.innerHTML = `
        <div>${item.dt_txt.split(" ")[1].slice(0, 5)}</div>
        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">
        <div>${Math.round(item.main.temp)}°C</div>
        <div>${item.weather[0].description}</div>
      `;
      forecastList.appendChild(div);
    });

    forecastContainer.classList.remove("hidden");

    // ===== 折線圖 Chart.js =====
    drawForecastChart(forecastData.list);

  } catch (err) {
    message.textContent = err.message;
  } finally {
    setLoading(false);
  }
}

// ----------------------------
// 折線圖 function
// ----------------------------
function drawForecastChart(list) {
  const canvas = document.getElementById("forecastChart");
  if (!canvas) return;

  const nextHours = list.slice(0, 6);

  const labels = nextHours.map(i => i.dt_txt.split(" ")[1].slice(0, 5));
  const temps = nextHours.map(i => Math.round(i.main.temp));

  if (forecastChart) forecastChart.destroy();

  const ctx = canvas.getContext("2d");

  forecastChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "未來 12 小時氣溫 (°C)",
          data: temps,
          borderColor: "#4fc3f7",
          backgroundColor: "rgba(79,195,247,0.25)",
          tension: 0.35,
          fill: true,
          borderWidth: 3
        }
      ]
    },
    options: {
      plugins: {
        legend: { labels: { color: "#fff" } }
      },
      scales: {
        x: { ticks: { color: "#fff" } },
        y: { ticks: { color: "#fff" } }
      }
    }
  });
}

button.addEventListener("click", handleSearch);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});
