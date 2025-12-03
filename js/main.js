const input = document.getElementById("city-input")
const button = document.getElementById("search-btn")
const message = document.getElementById("message")
const result = document.getElementById("result")

const cityNameEl = document.getElementById("city-name")
const tempEl = document.getElementById("temp")
const iconEl = document.getElementById("icon")
const descEl = document.getElementById("description")
const humidityEl = document.getElementById("humidity")

const feelsEl = document.getElementById("feels")
const minmaxEl = document.getElementById("minmax")
const pressureEl = document.getElementById("pressure")
const visibilityEl = document.getElementById("visibility")
const windEl = document.getElementById("wind")
const detailsCard = document.getElementById("details-card")

const forecastContainer = document.getElementById("forecast-container")
const forecastList = document.getElementById("forecast-list")


// 加載動畫按鈕狀態
function setLoading(isLoading) {
  if (isLoading) {
    button.disabled = true
    button.textContent = "查詢中..."
  } else {
    button.disabled = false
    button.textContent = "查詢天氣"
  }
}


// 主查詢流程
async function handleSearch() {
  const city = input.value.trim()

  message.textContent = ""
  result.classList.add("hidden")
  detailsCard.classList.add("hidden")
  forecastContainer.classList.add("hidden")

  if (!city) {
    message.textContent = "請先輸入城市名稱"
    return
  }

  setLoading(true)

  try {
    // 取得即時天氣
    const data = await fetchWeather(city)
    const iconCode = data.weather[0].icon

    applyWeatherBackground(iconCode)

    cityNameEl.textContent = `${data.name}, ${data.sys.country}`
    tempEl.textContent = `${Math.round(data.main.temp)}°C`
    descEl.textContent = data.weather[0].description
    humidityEl.textContent = `濕度 ${data.main.humidity}%`

    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    result.classList.remove("hidden")

    feelsEl.textContent = `體感溫度：${Math.round(data.main.feels_like)}°C`
    minmaxEl.textContent = `最高 / 最低：${Math.round(data.main.temp_max)}°C / ${Math.round(data.main.temp_min)}°C`
    pressureEl.textContent = `氣壓：${data.main.pressure} hPa`
    visibilityEl.textContent = `能見度：${data.visibility} m`
    windEl.textContent = `風速：${data.wind.speed} m/s`

    detailsCard.classList.remove("hidden")

    // 取得預報資料
    const forecastData = await fetchForecast(city)
    forecastList.innerHTML = ""

    for (let i = 0; i < 4; i++) {
      const item = forecastData.list[i]
      const time = item.dt_txt.split(" ")[1].slice(0, 5)
      const icon = item.weather[0].icon
      const tempF = Math.round(item.main.temp)

      const div = document.createElement("div")
      div.className = "forecast-item"

      div.innerHTML = `
        <div class="forecast-time">${time}</div>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" width="42">
        <div class="forecast-temp">${tempF}°C</div>
        <div class="forecast-desc">${item.weather[0].description}</div>
      `

      forecastList.appendChild(div)
    }

    forecastContainer.classList.remove("hidden")

  } catch (err) {
    message.textContent = err.message || "查詢失敗"
  }

  setLoading(false)
}


// 事件綁定
button.addEventListener("click", handleSearch)
input.addEventListener("keydown", e => { if (e.key === "Enter") handleSearch() })
