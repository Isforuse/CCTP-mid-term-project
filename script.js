const API_KEY = "4deabfaaccb654939946f7dfde24d852"

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



async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=zh_tw`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("查無此城市或服務錯誤")
  }
  const data = await res.json()
  return data
}

function setLoading(isLoading) {
  if (isLoading) {
    button.disabled = true
    button.textContent = "查詢中..."
  } else {
    button.disabled = false
    button.textContent = "查詢天氣"
  }
}

async function handleSearch() {
  const city = input.value.trim()
  message.textContent = ""
  result.classList.add("hidden")
  detailsCard.classList.add("hidden")

  if (!city) {
    message.textContent = "請先輸入城市名稱"
    return
  }

  setLoading(true)

  try {
    const data = await fetchWeather(city)

    const name = `${data.name}, ${data.sys.country}`
    const temp = Math.round(data.main.temp)
    const desc = data.weather[0].description
    const humidity = data.main.humidity
    const iconCode = data.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    cityNameEl.textContent = name
    tempEl.textContent = `${temp}°C`
    descEl.textContent = desc
    humidityEl.textContent = `濕度 ${humidity}%`
    iconEl.src = iconUrl
    iconEl.alt = desc

    result.classList.remove("hidden")

    const feels = Math.round(data.main.feels_like)
    const tempMin = Math.round(data.main.temp_min)
    const tempMax = Math.round(data.main.temp_max)
    const pressure = data.main.pressure
    const visibility = data.visibility
    const wind = data.wind.speed

    feelsEl.textContent = `體感溫度：${feels}°C`
    minmaxEl.textContent = `最高 / 最低：${tempMax}°C / ${tempMin}°C`
    pressureEl.textContent = `氣壓：${pressure} hPa`
    visibilityEl.textContent = `能見度：${visibility} m`
    windEl.textContent = `風速：${wind} m/s`

    detailsCard.classList.remove("hidden")
    const forecastData = await fetchForecast(city)
    forecastList.innerHTML = ""

    for (let i = 0; i < 4; i++) {
      const item = forecastData.list[i]
      const time = item.dt_txt.split(" ")[1].slice(0, 5)
      const temp = Math.round(item.main.temp)
      const iconCode = item.weather[0].icon
      const desc = item.weather[0].description
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

      const div = document.createElement("div")
      div.className = "forecast-item"

      div.innerHTML = `
        <div class="forecast-time">${time}</div>
        <img src="${iconUrl}" width="42">
        <div class="forecast-temp">${temp}°C</div>
        <div class="forecast-desc">${desc}</div>
      `

      forecastList.appendChild(div)
    }

    forecastContainer.classList.remove("hidden")


    async function fetchForecast(city) {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=zh_tw`
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error("預報資料取得失敗")
      }
      return await res.json()

      
  }


  } catch (err) {
    message.textContent = err.message || "查詢失敗，請稍後再試"
  } finally {
    setLoading(false)
  }
}

button.addEventListener("click", handleSearch)

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    handleSearch()
  }
})
