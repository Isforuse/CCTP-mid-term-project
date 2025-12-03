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
