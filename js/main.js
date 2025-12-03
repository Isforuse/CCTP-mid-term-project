import { fetchWeather, fetchForecast } from "./weather-api.js";
import { applyWeatherBackground } from "./weather-background.js";

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

const forecastContainer = document.getElementById("forecast-container");
const forecastList = document.getElementById("forecast-list");

// 🌅 新增：日出、日落
const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");

function setLoading(isLoading) {
  button.disabled = isLoading;
  button.textContent = isLoading ? "查詢中..." : "查詢天氣";
}

function formatTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

async function handleSearch() {
  const city = input.value.trim();

  if (!city) {
    message.textContent = "請輸入城市名稱";
    return;
  }

  setLoading(true);
  message.textContent = "";

  // 重置顯示
  result.classList.add("hidden");
  detailsCard.classList.add("hidden");
  forecastContainer.classList.add("hidden");

  try {
    // ⭐ 先取得天氣資料
    const data = await fetchWeather(city);

    const iconCode = data.weather[0].icon;
    applyWeatherBackground(iconCode);

    // 📍主要資訊
    cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
    tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    descEl.textContent = data.weather[0].description;
    humidityEl.textContent = `濕度 ${data.main.humidity}%`;

    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // ⭐ 細節
    const feels = Math.round(data.main.feels_like);
    feelsEl.textContent = `體感溫度：${feels}°C`;

    // 清除之前的溫度 class 樣式
    feelsEl.className = "detail-item";
    if (feels < 12) feelsEl.classList.add("temp-cold");
    else if (feels > 28) feelsEl.classList.add("temp-hot");
    else feelsEl.classList.add("temp-warm");

    minmaxEl.textContent = `最高 / 最低：${Math.round(data.main.temp_max)}°C / ${Math.round(data.main.temp_min)}°C`;
    pressureEl.textContent = `氣壓：${data.main.pressure} hPa`;
    visibilityEl.textContent = `能見度：${data.visibility} m`;
    windEl.textContent = `風速：${data.wind.speed} m/s`;

    // 🌅 日出日落
    sunriseEl.textContent = `日出：${formatTime(data.sys.sunrise)}`;
    sunsetEl.textContent = `日落：${formatTime(data.sys.sunset)}`;

    // 顯示卡片
    result.classList.remove("hidden");
    detailsCard.classList.remove("hidden");

    // ⭐ 預報
    const forecastData = await fetchForecast(city);
    forecastList.innerHTML = "";

    for (let i = 0; i < 4; i++) {
      const item = forecastData.list[i];
      const time = item.dt_txt.split(" ")[1].slice(0, 5);

      const div = document.createElement("div");
      div.className = "forecast-item";

      div.innerHTML = `
        <div>${time}</div>
        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" width="40">
        <div>${Math.round(item.main.temp)}°C</div>
        <div>${item.weather[0].description}</div>
      `;

      forecastList.appendChild(div);
    }

    forecastContainer.classList.remove("hidden");

  } catch (err) {
    message.textContent = err.message;
  } finally {
    setLoading(false);
  }
}

button.addEventListener("click", handleSearch);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") handleSearch();
});
